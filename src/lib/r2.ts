import { getCloudflareContext } from "@opennextjs/cloudflare";

export type R2ObjectLike = {
  body: ReadableStream | null;
  httpMetadata?: { contentType?: string };
  size?: number;
  uploaded?: Date;
};

type R2BucketLike = {
  get(key: string): Promise<R2ObjectLike | null>;
  head(key: string): Promise<R2ObjectLike | null>;
  put(
    key: string,
    value: ArrayBuffer | Uint8Array | ReadableStream,
    options?: Record<string, unknown>
  ): Promise<unknown>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; cursor?: string }): Promise<{
    objects: Array<{ key: string; size: number; uploaded?: Date }>;
    truncated: boolean;
    cursor?: string;
  }>;
};

/**
 * Cloudflare R2 bucket used by the Worker.
 * This project intentionally uses the native R2 binding instead of the
 * AWS S3 SDK so the OpenNext Worker stays within Cloudflare's size limit.
 */
export async function getR2Bucket(): Promise<R2BucketLike> {
  const { env } = await getCloudflareContext({ async: true });
  const bucket = (env as unknown as { PAST_PAPERS_BUCKET?: R2BucketLike })
    .PAST_PAPERS_BUCKET;

  if (!bucket) {
    throw new Error("PAST_PAPERS_BUCKET R2 binding is not configured.");
  }

  return bucket;
}
