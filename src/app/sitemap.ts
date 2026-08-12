import type { MetadataRoute } from "next";
import { getR2Bucket, getR2BucketName, getR2S3Client } from "@/lib/r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import subjects from "@/messages/en.json";

const baseUrl = "https://pastpaperzone.lk";

function parsePaperKey(key: string) {
  const match = key.match(/^papers\/(ol|al)-([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\.pdf$/i);
  if (!match) return null;
  return {
    subjectId: match[1] + "-" + match[2],
    level: match[1],
    year: match[3],
    medium: match[4],
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    ...["en", "si", "ta"].map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    })),
  ];

  try {
    const keys: { key: string; uploaded?: Date }[] = [];
    const bucket = await getR2Bucket();

    if (bucket) {
      let cursor: string | undefined;
      do {
        const page = await bucket.list({ prefix: "papers/", cursor });
        keys.push(...page.objects);
        cursor = page.truncated ? page.cursor : undefined;
      } while (cursor);
    } else {
      let token: string | undefined;
      do {
        const page = await getR2S3Client().send(
          new ListObjectsV2Command({
            Bucket: getR2BucketName(),
            Prefix: "papers/",
            ContinuationToken: token,
          })
        );
        for (const item of page.Contents ?? []) {
          if (item.Key) keys.push({ key: item.Key, uploaded: item.LastModified });
        }
        token = page.IsTruncated ? page.NextContinuationToken : undefined;
      } while (token);
    }

    const seen = new Set<string>();
    for (const item of keys) {
      const paper = parsePaperKey(item.key);
      if (!paper) continue;

      for (const locale of ["en", "si", "ta"]) {
        const url = `${baseUrl}/${locale}/papers/${paper.level}/${paper.subjectId}/${paper.year}/${paper.medium}`;
        if (seen.has(url)) continue;
        seen.add(url);
        entries.push({
          url,
          lastModified: item.uploaded || new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error("Sitemap paper listing error:", error);
  }

  // Keep the subject-level pages discoverable even if R2 is temporarily unavailable.
  const subjectIds = Object.keys(subjects.SubjectCard.subjects);
  for (const locale of ["en", "si", "ta"]) {
    for (const subjectId of subjectIds) {
      entries.push({
        url: `${baseUrl}/${locale}/subject/${subjectId}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
