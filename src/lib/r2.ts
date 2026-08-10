import { S3Client } from "@aws-sdk/client-s3";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Cloudflare Worker R2 binding is the primary storage path in production.
// The S3 client remains as a local-development fallback when the binding is
// not available.
export type R2ObjectLike = {
  body: ReadableStream | null;
  httpMetadata?: { contentType?: string };
  size?: number;
  uploaded?: Date;
};

type R2BucketLike = {
  get(key: string): Promise<R2ObjectLike | null>;
  put(key: string, value: ArrayBuffer | Uint8Array | ReadableStream, options?: Record<string, unknown>): Promise<unknown>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; cursor?: string }): Promise<{
    objects: Array<{ key: string; size: number; uploaded?: Date }>;
    truncated: boolean;
    cursor?: string;
  }>;
};

export async function getR2Bucket(): Promise<R2BucketLike | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as unknown as { PAST_PAPERS_BUCKET?: R2BucketLike }).PAST_PAPERS_BUCKET ?? null;
  } catch {
    return null;
  }
}

export function getR2S3Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 S3 credentials are not configured.");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    maxAttempts: 3,
  });
}

export function getR2BucketName() {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("R2_BUCKET_NAME is not configured.");
  return bucket;
}
