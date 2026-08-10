import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2, getR2BucketName } from "@/lib/r2";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bucket = getR2BucketName();
    const uniqueSubjects = new Set<string>();
    let totalPapers = 0;
    let continuationToken: string | undefined;

    // R2/S3 ListObjectsV2 returns at most 1000 objects per request.
    // Keep requesting pages so the hero count stays correct as the site grows.
    do {
      const data = await r2.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: "papers/",
          ContinuationToken: continuationToken,
        })
      );

      for (const item of data.Contents || []) {
        if (!item.Key || item.Key.endsWith("/")) continue;

        const parts = item.Key.split("/");
        // Expected: papers/<subjectId>/<year>/<medium>/<type>.pdf
        if (parts.length >= 2 && parts[1]) {
          uniqueSubjects.add(parts[1]);
        }

        // Count actual paper objects, not folder markers.
        totalPapers += 1;
      }

      continuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
    } while (continuationToken);

    return NextResponse.json(
      {
        success: true,
        papersCount: totalPapers,
        subjectsCount: uniqueSubjects.size,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Stats API Error:", error);

    return NextResponse.json(
      {
        success: false,
        papersCount: 0,
        subjectsCount: 0,
        error: error instanceof Error ? error.message : "Unable to read R2 statistics",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
