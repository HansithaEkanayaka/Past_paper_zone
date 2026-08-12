import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function startOfDay(daysAgo = 0) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const d = new Date(`${values.year}-${values.month}-${values.day}T00:00:00+05:30`);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString();
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const admin = createAdminClient();
    const today = startOfDay();
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const [visits, views, downloads, signups, topDownloads, topViews, reports, requests, contributions] =
      await Promise.all([
        admin.from("paper_activity").select("id", { count: "exact", head: true })
          .eq("action", "visit").gte("created_at", today).lt("created_at", tomorrow.toISOString()),
        admin.from("paper_activity").select("id", { count: "exact", head: true })
          .eq("action", "view").gte("created_at", today).lt("created_at", tomorrow.toISOString()),
        admin.from("paper_activity").select("id", { count: "exact", head: true })
          .eq("action", "download").gte("created_at", today).lt("created_at", tomorrow.toISOString()),
        admin.from("paper_activity").select("id", { count: "exact", head: true })
          .eq("action", "signup").gte("created_at", today).lt("created_at", tomorrow.toISOString()),
        admin.from("paper_activity").select("subject_id,year,medium,doc_type")
          .eq("action", "download").gte("created_at", today),
        admin.from("paper_activity").select("subject_id,year,medium,doc_type")
          .eq("action", "view").gte("created_at", today),
        admin.from("paper_reports").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
        admin.from("paper_requests").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
        admin.from("contributions").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
      ]);

    const countRows = (rows: any[] | null) => {
      const map = new Map<string, number>();
      for (const row of rows || []) {
        const key = [row.subject_id, row.year, row.medium, row.doc_type].join("|");
        map.set(key, (map.get(key) || 0) + 1);
      }
      return [...map.entries()].map(([key, count]) => {
        const [subjectId, year, medium, docType] = key.split("|");
        return { subjectId, year, medium, docType, count };
      }).sort((a, b) => b.count - a.count).slice(0, 10);
    };

    const errors = [visits, views, downloads, signups, topDownloads, topViews, reports, requests, contributions]
      .filter((r) => r.error);
    if (errors.length) {
      console.error("Analytics query error:", errors.map((r) => r.error));
      return NextResponse.json(
        { error: "Analytics data could not be loaded. Check the Supabase tables and service-role key." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stats: {
        visitors: visits.count || 0,
        views: views.count || 0,
        downloads: downloads.count || 0,
        newUsers: signups.count || 0,
      },
      mostDownloaded: countRows(topDownloads.data),
      mostViewed: countRows(topViews.data),
      reports: reports.data || [],
      requests: requests.data || [],
      contributions: contributions.data || [],
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Unable to load analytics" }, { status: 500 });
  }
}
