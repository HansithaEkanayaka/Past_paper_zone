import { NextResponse } from "next/server";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { r2, getR2BucketName } from "@/lib/r2";

// Serves the O/L / A/L exam timetable PDF from Cloudflare R2.
//
// The R2 bucket itself is named "past-papers" (see R2_BUCKET_NAME), so
// object keys inside it must NOT repeat that name - the same way
// /api/paper/route.ts uses keys like `papers/<subject>/...` with no
// "past-papers/" prefix. The dashboard path
// past-papers/timetables/al/<file>.pdf you see in the Cloudflare R2 UI
// includes the bucket name as the first breadcrumb segment; the actual
// object key underneath it is just:
//   timetables/al/<any-filename>.pdf
//   timetables/ol/<any-filename>.pdf
//
// We still try the old "past-papers/timetables/<level>/" prefix as a
// fallback in case a file was ever uploaded with that literal key, so
// this keeps working either way.
//
// We list the prefix instead of hardcoding a filename so this keeps working
// whatever the uploaded file is named. If nothing has been uploaded for a
// level yet (e.g. O/L timetable isn't out), this returns 404 with a
// "not released" message instead of a broken download - the ExamTimetable
// component shows that message inline rather than downloading a file.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");

  if (level !== "ol" && level !== "al") {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const candidatePrefixes = [
    `timetables/${level}/`,
    `past-papers/timetables/${level}/`,
  ];

  try {
    let target: { Key?: string } | undefined;

    for (const prefix of candidatePrefixes) {
      let continuationToken: string | undefined;
      const files: Array<{ Key?: string; Size?: number; LastModified?: Date }> = [];

      // A prefix can contain more than 1000 objects, so paginate here too.
      do {
        const listing = await r2.send(
          new ListObjectsV2Command({
            Bucket: getR2BucketName(),
            Prefix: prefix,
            ContinuationToken: continuationToken,
          })
        );

        files.push(
          ...(listing.Contents || []).filter(
            (item) => item.Key && !item.Key.endsWith("/") && (item.Size ?? 0) > 0
          )
        );

        continuationToken = listing.IsTruncated ? listing.NextContinuationToken : undefined;
      } while (continuationToken);

      // Skip folder markers and pick the most recently uploaded real file.
      files.sort(
        (a, b) => (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0)
      );

      if (files[0]?.Key) {
        target = files[0];
        break;
      }
    }

    if (!target?.Key) {
      return NextResponse.json(
        { error: "not_released", message: `${level.toUpperCase()} timetable hasn't been released yet.` },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await r2.send(
      new GetObjectCommand({
        Bucket: getR2BucketName(),
        Key: target.Key,
      })
    );

    if (!data.Body) {
      return NextResponse.json(
        { error: "not_released", message: "File not found." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const bytes = await data.Body.transformToByteArray();
    const originalName = target.Key.split("/").pop() || `${level}-timetable.pdf`;

    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${originalName}"`,
        "Cache-Control": "private, max-age=0, no-store",
      },
    });
  } catch (error) {
    console.error(`Timetable fetch error for level "${level}":`, error);
    return NextResponse.json(
      {
        error: "storage_error",
        message: "Unable to read the timetable from storage.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
