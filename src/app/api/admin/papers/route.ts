import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getR2Bucket, getR2BucketName, getR2S3Client } from "@/lib/r2";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Paper = {
  key: string;
  subjectId: string;
  year: string;
  medium: string;
  docType: string;
  size: number;
  lastModified: string | null;
};

function parseKey(key: string): Paper | null {
  const match = key.match(/^papers\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\.pdf$/i);
  if (!match) return null;

  return {
    key,
    subjectId: match[1],
    year: match[2],
    medium: match[3],
    docType: match[4],
    size: 0,
    lastModified: null,
  };
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const papers: Paper[] = [];
    const bucket = await getR2Bucket();

    if (bucket) {
      let cursor: string | undefined;
      do {
        const page = await bucket.list({ prefix: "papers/", cursor });
        for (const item of page.objects) {
          const paper = parseKey(item.key);
          if (paper) {
            paper.size = item.size || 0;
            paper.lastModified = item.uploaded?.toISOString?.() || null;
            papers.push(paper);
          }
        }
        cursor = page.truncated ? page.cursor : undefined;
      } while (cursor);
    } else {
      let token: string | undefined;
      do {
        const page = await getR2S3Client().send(new ListObjectsV2Command({
          Bucket: getR2BucketName(),
          Prefix: "papers/",
          ContinuationToken: token,
        }));

        for (const item of page.Contents ?? []) {
          if (!item.Key) continue;
          const paper = parseKey(item.Key);
          if (paper) {
            paper.size = Number(item.Size || 0);
            paper.lastModified = item.LastModified?.toISOString() || null;
            papers.push(paper);
          }
        }
        token = page.IsTruncated ? page.NextContinuationToken : undefined;
      } while (token);
    }

    papers.sort((a, b) => (b.lastModified || "").localeCompare(a.lastModified || ""));
    return NextResponse.json({ success: true, papers });
  } catch (error) {
    console.error("Admin papers error:", error);
    return NextResponse.json({ error: "Unable to list papers" }, { status: 500 });
  }
}
