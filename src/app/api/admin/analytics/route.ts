import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Sri Lanka has no daylight saving, so a fixed +05:30 offset is always correct.
const TZ_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_RANGE_DAYS = 366;
const PAGE_SIZE = 1000;
// Cloudflare Workers limit the number of subrequests per request, so the
// amount of raw rows we page through is capped. Totals stay exact for normal
// traffic; `truncated` tells the UI if a very busy range hit the cap.
const MAX_ACTIVITY_PAGES = 25;
const MAX_TELEGRAM_PAGES = 5;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** "YYYY-MM-DD" for the current day in Sri Lanka. */
function colomboToday(): string {
  return new Date(Date.now() + TZ_OFFSET_MS).toISOString().slice(0, 10);
}

/** UTC timestamp (ms) of 00:00 Sri Lanka time on the given date. */
function dayStartMs(dateStr: string): number {
  return Date.parse(`${dateStr}T00:00:00Z`) - TZ_OFFSET_MS;
}

function addDays(dateStr: string, days: number): string {
  return new Date(Date.parse(`${dateStr}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

function parseRange(searchParams: URLSearchParams) {
  const today = colomboToday();
  let from = searchParams.get("from") || today;
  let to = searchParams.get("to") || from;

  if (!DATE_RE.test(from) || Number.isNaN(Date.parse(`${from}T00:00:00Z`))) from = today;
  if (!DATE_RE.test(to) || Number.isNaN(Date.parse(`${to}T00:00:00Z`))) to = from;

  if (to > today) to = today;
  if (from > to) from = to;

  const spanDays = Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS) + 1;
  if (spanDays > MAX_RANGE_DAYS) {
    from = addDays(to, -(MAX_RANGE_DAYS - 1));
  }

  const days = Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS) + 1;
  return { from, to, days };
}

type ActivityRow = {
  action: string;
  subject_id: string | null;
  year: string | null;
  medium: string | null;
  doc_type: string | null;
  visitor_id: string | null;
  created_at: string;
};

type TelegramRow = {
  subject_id: string | null;
  year: string | null;
  medium: string | null;
  doc_type: string | null;
  created_at: string;
};

async function fetchAllRows<T>(
  build: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
  maxPages: number
): Promise<{ rows: T[]; error: unknown; truncated: boolean }> {
  const rows: T[] = [];
  for (let page = 0; page < maxPages; page++) {
    const { data, error } = await build(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
    if (error) return { rows, error, truncated: false };
    const batch = data || [];
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) return { rows, error: null, truncated: false };
  }
  return { rows, error: null, truncated: true };
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null; // null = "new" (no baseline)
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const { from, to, days } = parseRange(searchParams);

    const startMs = dayStartMs(from);
    const endMs = dayStartMs(addDays(to, 1)); // exclusive
    const startIso = new Date(startMs).toISOString();
    const endIso = new Date(endMs).toISOString();

    // Previous period of identical length, used for "vs previous" comparisons.
    const prevStartIso = new Date(startMs - days * DAY_MS).toISOString();

    const admin = createAdminClient();

    const countActivity = (action: string, gte: string, lt: string) =>
      admin
        .from("paper_activity")
        .select("id", { count: "exact", head: true })
        .eq("action", action)
        .gte("created_at", gte)
        .lt("created_at", lt);

    const [
      activity,
      telegram,
      prevVisits,
      prevViews,
      prevDownloads,
      prevSignups,
      prevTelegram,
      reports,
      requests,
      contributions,
    ] = await Promise.all([
      fetchAllRows<ActivityRow>(
        (a, b) =>
          admin
            .from("paper_activity")
            .select("action,subject_id,year,medium,doc_type,visitor_id,created_at")
            .gte("created_at", startIso)
            .lt("created_at", endIso)
            .order("created_at", { ascending: false })
            .order("id", { ascending: false })
            .range(a, b),
        MAX_ACTIVITY_PAGES
      ),
      fetchAllRows<TelegramRow>(
        (a, b) =>
          admin
            .from("telegram_link_deliveries")
            .select("subject_id,year,medium,doc_type,created_at")
            .gte("created_at", startIso)
            .lt("created_at", endIso)
            .order("created_at", { ascending: false })
            .order("id", { ascending: false })
            .range(a, b),
        MAX_TELEGRAM_PAGES
      ),
      countActivity("visit", prevStartIso, startIso),
      countActivity("view", prevStartIso, startIso),
      countActivity("download", prevStartIso, startIso),
      countActivity("signup", prevStartIso, startIso),
      admin
        .from("telegram_link_deliveries")
        .select("id", { count: "exact", head: true })
        .gte("created_at", prevStartIso)
        .lt("created_at", startIso),
      admin.from("paper_reports").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
      admin.from("paper_requests").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
      admin.from("contributions").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
    ]);

    const errors = [
      activity.error && { error: activity.error },
      telegram.error && { error: telegram.error },
      prevVisits,
      prevViews,
      prevDownloads,
      prevSignups,
      prevTelegram,
      reports,
      requests,
      contributions,
    ].filter((r): r is { error: unknown } => Boolean(r && (r as { error?: unknown }).error));

    if (errors.length) {
      console.error("Analytics query error:", errors.map((r) => r.error));
      return NextResponse.json(
        { error: "Analytics data could not be loaded. Check the Supabase tables and service-role key." },
        { status: 500 }
      );
    }

    // ---- Bucketing (hourly for a single day, daily otherwise) -------------
    const hourlyMode = days === 1;
    const bucketCount = hourlyMode ? 24 : days;

    const emptyBucket = () => ({ visits: 0, views: 0, downloads: 0, signups: 0, telegram: 0 });
    const buckets = Array.from({ length: bucketCount }, emptyBucket);
    const hourOfDay = Array.from({ length: 24 }, () => 0); // visits+views+downloads by hour

    const bucketIndex = (iso: string): number => {
      const t = Date.parse(iso);
      if (hourlyMode) return Math.floor((t - startMs) / (60 * 60 * 1000));
      return Math.floor((t - startMs) / DAY_MS);
    };
    const hourIndex = (iso: string): number =>
      new Date(Date.parse(iso) + TZ_OFFSET_MS).getUTCHours();

    const totals = { visits: 0, views: 0, downloads: 0, signups: 0 };
    const uniqueVisitors = new Set<string>();

    const paperCounts = { view: new Map<string, number>(), download: new Map<string, number>() };
    const subjectCounts = new Map<string, { views: number; downloads: number }>();
    const mediumCounts: Record<string, number> = {};
    const levelCounts = { ol: 0, al: 0 };

    for (const row of activity.rows) {
      const idx = bucketIndex(row.created_at);
      const bucket = buckets[idx];
      if (!bucket) continue;

      if (row.action === "visit") {
        bucket.visits++;
        totals.visits++;
        if (row.visitor_id) uniqueVisitors.add(row.visitor_id);
        hourOfDay[hourIndex(row.created_at)]++;
      } else if (row.action === "view" || row.action === "download") {
        const isDownload = row.action === "download";
        if (isDownload) {
          bucket.downloads++;
          totals.downloads++;
        } else {
          bucket.views++;
          totals.views++;
        }
        hourOfDay[hourIndex(row.created_at)]++;

        const key = [row.subject_id, row.year, row.medium, row.doc_type].join("|");
        const map = isDownload ? paperCounts.download : paperCounts.view;
        map.set(key, (map.get(key) || 0) + 1);

        if (row.subject_id) {
          const s = subjectCounts.get(row.subject_id) || { views: 0, downloads: 0 };
          if (isDownload) s.downloads++;
          else s.views++;
          subjectCounts.set(row.subject_id, s);

          if (row.subject_id.startsWith("al-")) levelCounts.al++;
          else levelCounts.ol++;
        }
        if (row.medium) mediumCounts[row.medium] = (mediumCounts[row.medium] || 0) + 1;
      } else if (row.action === "signup") {
        bucket.signups++;
        totals.signups++;
      }
    }

    const telegramTopMap: Record<string, number> = {};
    for (const row of telegram.rows) {
      const bucket = buckets[bucketIndex(row.created_at)];
      if (!bucket) continue;
      bucket.telegram++;
      const key = [row.subject_id, row.year, row.medium, row.doc_type].join("|");
      telegramTopMap[key] = (telegramTopMap[key] || 0) + 1;
    }
    const telegramTotal = telegram.rows.length;

    const topFromMap = (map: Map<string, number>, limit = 10) =>
      [...map.entries()]
        .map(([key, count]) => {
          const [subjectId, year, medium, docType] = key.split("|");
          return { subjectId, year, medium, docType, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);

    const series = buckets.map((b, i) => {
      let label: string;
      if (hourlyMode) {
        label = `${String(i).padStart(2, "0")}:00`;
      } else {
        label = addDays(from, i);
      }
      return { label, ...b };
    });

    return NextResponse.json({
      success: true,
      range: { from, to, days, granularity: hourlyMode ? "hour" : "day", timezone: "Asia/Colombo" },
      truncated: activity.truncated || telegram.truncated,
      stats: {
        visitors: totals.visits,
        uniqueVisitors: uniqueVisitors.size,
        views: totals.views,
        downloads: totals.downloads,
        newUsers: totals.signups,
      },
      previous: {
        visitors: prevVisits.count || 0,
        views: prevViews.count || 0,
        downloads: prevDownloads.count || 0,
        newUsers: prevSignups.count || 0,
        telegram: prevTelegram.count || 0,
      },
      change: {
        visitors: pctChange(totals.visits, prevVisits.count || 0),
        views: pctChange(totals.views, prevViews.count || 0),
        downloads: pctChange(totals.downloads, prevDownloads.count || 0),
        newUsers: pctChange(totals.signups, prevSignups.count || 0),
        telegram: pctChange(telegramTotal, prevTelegram.count || 0),
      },
      series,
      hourOfDay,
      topSubjects: [...subjectCounts.entries()]
        .map(([subjectId, v]) => ({ subjectId, views: v.views, downloads: v.downloads, total: v.views + v.downloads }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 8),
      levelSplit: levelCounts,
      mediumSplit: mediumCounts,
      mostDownloaded: topFromMap(paperCounts.download),
      mostViewed: topFromMap(paperCounts.view),
      telegramLinksDelivered: telegramTotal,
      telegramTopLinks: telegramTopMap,
      reports: reports.data || [],
      requests: requests.data || [],
      contributions: contributions.data || [],
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Unable to load analytics" }, { status: 500 });
  }
}
