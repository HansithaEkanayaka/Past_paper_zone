import type { MetadataRoute } from "next";
import { getR2Bucket } from "@/lib/r2";
import subjects from "@/messages/en.json";

const baseUrl = "https://pastpaperzone.lk";

const locales = ["en", "si", "ta"] as const;

function parsePaperKey(key: string) {
  const match = key.match(
    /^papers\/(ol|al)-([^/]+)\/([^/]+)\/([^/]+)\.pdf$/i
  );

  if (!match) {
    return null;
  }

  return {
    subjectId: `${match[1]}-${match[2]}`,
    level: match[1],
    year: match[3],
    medium: match[4],
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  /*
  |--------------------------------------------------------------------------
  | Homepage
  |--------------------------------------------------------------------------
  */

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: locale === "en" ? 1 : 0.9,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Subject pages
  |--------------------------------------------------------------------------
  */

  const subjectIds = Object.keys(
    subjects.SubjectCard.subjects
  );

  for (const locale of locales) {
    for (const subjectId of subjectIds) {
      entries.push({
        url: `${baseUrl}/${locale}/subject/${subjectId}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Paper pages
  |--------------------------------------------------------------------------
  */

  try {
    const bucket = await getR2Bucket();

    let cursor: string | undefined;

    do {
      const page = await bucket.list({
        prefix: "papers/",
        cursor,
      });

      for (const object of page.objects) {
        const paper = parsePaperKey(object.key);

        if (!paper) {
          continue;
        }

        for (const locale of locales) {
          entries.push({
            url:
              `${baseUrl}/${locale}` +
              `/papers/${paper.level}` +
              `/${paper.subjectId}` +
              `/${paper.year}` +
              `/${paper.medium}`,

            lastModified:
              object.uploaded || new Date(),

            changeFrequency: "monthly",

            priority: 0.7,
          });
        }
      }

      cursor = page.truncated
        ? page.cursor
        : undefined;
    } while (cursor);
  } catch (error) {
    console.error(
      "Sitemap paper listing error:",
      error
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Remove duplicates
  |--------------------------------------------------------------------------
  */

  const unique = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const entry of entries) {
    unique.set(entry.url, entry);
  }

  return Array.from(unique.values());
}