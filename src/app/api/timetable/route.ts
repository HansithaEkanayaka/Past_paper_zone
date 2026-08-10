import { NextResponse } from "next/server";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getR2Bucket, getR2BucketName, getR2S3Client } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const level = new URL(request.url).searchParams.get("level");
  if (level !== "ol" && level !== "al") {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const prefixes = [`timetables/${level}/`, `past-papers/timetables/${level}/`];

  try {
    const bucket = await getR2Bucket();
    let targetKey: string | undefined;

    if (bucket) {
      for (const prefix of prefixes) {
        let cursor: string | undefined;
        let newest: { key: string; uploaded?: Date } | undefined;
        do {
          const page = await bucket.list({ prefix, cursor });
          for (const item of page.objects) {
            if (item.key.endsWith("/") || item.size <= 0) continue;
            if (!newest || (item.uploaded?.getTime() ?? 0) > (newest.uploaded?.getTime() ?? 0)) {
              newest = item;
            }
          }
          cursor = page.truncated ? page.cursor : undefined;
        } while (cursor);
        if (newest) {
          targetKey = newest.key;
          break;
        }
      }
    } else {
      const client = getR2S3Client();
      for (const prefix of prefixes) {
        let token: string | undefined;
        let newest: { Key?: string; LastModified?: Date; Size?: number } | undefined;
        do {
          const page = await client.send(new ListObjectsV2Command({
            Bucket: getR2BucketName(), Prefix: prefix, ContinuationToken: token,
          }));
          for (const item of page.Contents ?? []) {
            if (!item.Key || item.Key.endsWith("/") || (item.Size ?? 0) <= 0) continue;
            if (!newest || (item.LastModified?.getTime() ?? 0) > (newest.LastModified?.getTime() ?? 0)) newest = item;
          }
          token = page.IsTruncated ? page.NextContinuationToken : undefined;
        } while (token);
        if (newest?.Key) {
          targetKey = newest.Key;
          break;
        }
      }
    }

    if (!targetKey) {
      return NextResponse.json(
        { error: "not_released", message: `${level.toUpperCase()} timetable hasn't been released yet.` },
        { status: 404 }
      );
    }

    const filename = targetKey.split("/").pop() || `${level}-timetable.pdf`;
    const responseHeaders = {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    };

    if (bucket) {
      const object = await bucket.get(targetKey);
      if (!object?.body) return NextResponse.json({ error: "not_released" }, { status: 404 });
      return new Response(object.body, { status: 200, headers: responseHeaders });
    }

    const data = await getR2S3Client().send(new GetObjectCommand({ Bucket: getR2BucketName(), Key: targetKey }));
    if (!data.Body) return NextResponse.json({ error: "not_released" }, { status: 404 });
    return new Response(data.Body.transformToWebStream(), { status: 200, headers: responseHeaders });
  } catch (error) {
    console.error(`Timetable fetch error for level "${level}":`, error);
    return NextResponse.json(
      { error: "not_released", message: `${level.toUpperCase()} timetable hasn't been released yet.` },
      { status: 404 }
    );
  }
}
