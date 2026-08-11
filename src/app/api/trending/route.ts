import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Public endpoint (no auth) - powers the "Trending Papers" section on the
// homepage. Reuses the same paper_activity table the admin analytics page
// already reads, just aggregated over the last 7 days instead of "today"
// and restricted to view/download actions (visits/signups aren't paper-specific).
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const admin = createAdminClient();

    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 7);

    const { data, error } = await admin
      .from("paper_activity")
      .select("subject_id,year,medium,doc_type")
      .in("action", ["view", "download"])
      .gte("created_at", since.toISOString())
      .limit(2000);

    if (error) {
      console.error("Trending API query error:", error);
      return NextResponse.json({ success: true, trending: [] });
    }

    const map = new Map<string, { subjectId: string; year: string; medium: string; count: number }>();
    for (const row of data || []) {
      // Collapse question-paper / marking-scheme views of the same paper
      // into one trending entry so the list shows distinct papers.
      const key = [row.subject_id, row.year, row.medium].join("|");
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(key, {
          subjectId: row.subject_id,
          year: row.year,
          medium: row.medium,
          count: 1,
        });
      }
    }

    const trending = [...map.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return NextResponse.json({ success: true, trending });
  } catch (error) {
    console.error("Trending API error:", error);
    return NextResponse.json({ success: true, trending: [] });
  }
}
