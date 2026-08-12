import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await createAdminClient()
      .from("paper_activity")
      .select("subject_id, year, medium, doc_type, action")
      .in("action", ["view", "download"])
      .gte("created_at", since);

    if (error) {
      console.error("Trending papers query error:", error);
      return NextResponse.json({ error: "Unable to load trending papers" }, { status: 500 });
    }

    const map = new Map<string, {
      subjectId: string;
      year: string;
      medium: string;
      docType: string;
      views: number;
      downloads: number;
    }>();

    for (const row of data || []) {
      if (!row.subject_id || !row.year || !row.medium || !row.doc_type) continue;

      const key = [row.subject_id, row.year, row.medium, row.doc_type].join("|");
      const current = map.get(key) || {
        subjectId: row.subject_id,
        year: String(row.year),
        medium: row.medium,
        docType: row.doc_type,
        views: 0,
        downloads: 0,
      };

      if (row.action === "download") current.downloads += 1;
      else current.views += 1;

      map.set(key, current);
    }

    const papers = [...map.values()]
      .map((paper) => ({ ...paper, score: paper.downloads * 3 + paper.views }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    return NextResponse.json({ success: true, papers });
  } catch (error) {
    console.error("Trending papers API error:", error);
    return NextResponse.json({ error: "Unable to load trending papers" }, { status: 500 });
  }
}
