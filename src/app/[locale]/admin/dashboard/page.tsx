"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  FileEdit,
  Flag,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquarePlus,
  Moon,
  RefreshCw,
  Search,
  Send,
  Sun,
  Trash2,
  UserCheck,
  Users,
  X,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MousePointerClick,
} from "lucide-react";
import { useLocale } from "next-intl";
import styles from "./page.module.css";
import { OL_SUBJECTS, AL_SUBJECTS } from "@/lib/subjects";
import { createTelegramGraphic } from "@/lib/clientTelegramGraphic";
import {
  ChartLegend,
  Donut,
  HourBars,
  TrendChart,
  type TrendSeries,
} from "@/components/admin/AdminCharts";

type Paper = {
  key: string;
  subjectId: string;
  year: string;
  medium: string;
  docType: string;
  size: number;
  lastModified: string | null;
};

type Report = {
  id: number;
  subject_id: string;
  year: string;
  medium: string;
  doc_type: string;
  reason: string;
  details: string | null;
  status: string;
  created_at: string;
};

type TopPaper = {
  subjectId: string;
  year: string;
  medium: string;
  docType: string;
  count: number;
};

type TelegramTopLink = TopPaper;

type TrafficPoint = {
  label: string;
  visits: number;
  views: number;
  downloads: number;
  signups: number;
  telegram: number;
};

type Traffic = {
  range: { from: string; to: string; days: number; granularity: "hour" | "day" };
  truncated: boolean;
  stats: { visitors: number; uniqueVisitors: number; views: number; downloads: number; newUsers: number };
  change: {
    visitors: number | null;
    views: number | null;
    downloads: number | null;
    newUsers: number | null;
    telegram: number | null;
  };
  series: TrafficPoint[];
  hourOfDay: number[];
  topSubjects: { subjectId: string; views: number; downloads: number; total: number }[];
  levelSplit: { ol: number; al: number };
  mediumSplit: Record<string, number>;
};

const EMPTY_TRAFFIC: Traffic = {
  range: { from: "", to: "", days: 1, granularity: "hour" },
  truncated: false,
  stats: { visitors: 0, uniqueVisitors: 0, views: 0, downloads: 0, newUsers: 0 },
  change: { visitors: 0, views: 0, downloads: 0, newUsers: 0, telegram: 0 },
  series: [],
  hourOfDay: Array.from({ length: 24 }, () => 0),
  topSubjects: [],
  levelSplit: { ol: 0, al: 0 },
  mediumSplit: {},
};

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "papers", label: "Papers", icon: BookOpen },
  { id: "reports", label: "Reports", icon: Flag },
  { id: "users", label: "Users", icon: Users },
  { id: "requests", label: "Requests", icon: MessageSquarePlus },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
] as const;

type Section = typeof nav[number]["id"];

const SECTION_SUBTITLE: Record<Section, string> = {
  overview: "Traffic, downloads and what needs your attention.",
  papers: "Upload, replace and manage the papers stored in R2.",
  reports: "Problems users have reported with papers.",
  users: "Sign-ups for the selected period.",
  requests: "Paper requests and user contributions.",
  analytics: "Deep dive into traffic and demand for any date range.",
};

const SUBJECT_LABELS: Record<string, string> = {
  "ol-maths": "Mathematics",
  "ol-science": "Science",
  "ol-sinhala": "Sinhala Language",
  "ol-english": "English Language",
  "ol-history": "History",
  "ol-buddhism": "Buddhism",
  "ol-tamil": "Tamil Language",
  "ol-geography": "Geography",
  "ol-civic": "Civic Education",
  "ol-music": "Music",
  "ol-art": "Art",
  "ol-dancing": "Dancing",
  "ol-drama": "Drama & Theatre",
  "ol-ict": "ICT",
  "ol-agriculture": "Agriculture",
  "ol-health": "Health & Physical Education",
  "al-combined-maths": "Combined Mathematics",
  "al-physics": "Physics",
  "al-chemistry": "Chemistry",
  "al-biology": "Biology",
  "al-ict": "ICT",
  "al-accounting": "Accounting",
  "al-business": "Business Studies",
  "al-econ": "Economics",
  "al-agro": "Agricultural Technology",
  "al-et": "Engineering Technology",
  "al-bst": "Bio Systems Technology",
  "al-sft": "Science for Technology",
};

function subjectLabel(id: string) {
  return SUBJECT_LABELS[id] || id;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 2014 }, (_, i) =>
  String(CURRENT_YEAR - i)
);

/* ---------- date helpers (Sri Lanka time, UTC+05:30, no DST) ---------- */
const COLOMBO_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function colomboToday() {
  return new Date(Date.now() + COLOMBO_OFFSET_MS).toISOString().slice(0, 10);
}
function shiftDate(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

type PresetId = "today" | "yesterday" | "7d" | "30d" | "month";
const PRESETS: { id: PresetId; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "month", label: "This month" },
];

function presetRange(id: PresetId) {
  const today = colomboToday();
  switch (id) {
    case "today":
      return { from: today, to: today };
    case "yesterday": {
      const y = shiftDate(today, -1);
      return { from: y, to: y };
    }
    case "7d":
      return { from: shiftDate(today, -6), to: today };
    case "30d":
      return { from: shiftDate(today, -29), to: today };
    case "month":
      return { from: `${today.slice(0, 8)}01`, to: today };
  }
}

function formatDay(date: string, withYear = true) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

function rangeLabel(from: string, to: string) {
  if (!from) return "";
  if (from === to) {
    return new Date(`${from}T00:00:00Z`).toLocaleDateString("en-GB", {
      timeZone: "UTC",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return `${formatDay(from, from.slice(0, 4) !== to.slice(0, 4))} – ${formatDay(to)}`;
}

/* ---------- paper label helpers ---------- */
const MEDIUM_LABELS: Record<string, string> = { sinhala: "Sinhala", english: "English", tamil: "Tamil" };

function docLabel(docType: string) {
  const m = docType.match(/^(paper|marking)(?:-(part1|part2))?$/);
  if (!m) return docType;
  const base = m[1] === "marking" ? "Marking Scheme" : "Question Paper";
  return m[2] ? `${base} (${m[2] === "part1" ? "Part 1" : "Part 2"})` : base;
}

function paperTitle(item: TopPaper) {
  return `${subjectLabel(item.subjectId)} ${item.year}`;
}
function paperSub(item: TopPaper) {
  return `${MEDIUM_LABELS[item.medium] || item.medium} · ${docLabel(item.docType)}`;
}

const SERIES: TrendSeries[] = [
  { key: "visits", label: "Visits", color: "#6366f1" },
  { key: "views", label: "Paper views", color: "#0ea5e9" },
  { key: "downloads", label: "Downloads", color: "#f97316" },
];
const SIGNUP_SERIES: TrendSeries[] = [{ key: "signups", label: "New users", color: "#22c55e" }];
const TELEGRAM_SERIES: TrendSeries[] = [{ key: "telegram", label: "Telegram links sent", color: "#229ed9" }];

export default function AdminDashboard() {
  const locale = useLocale();
  const [section, setSection] = useState<Section>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [papers, setPapers] = useState<Paper[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [traffic, setTraffic] = useState<Traffic>(EMPTY_TRAFFIC);
  const [mostDownloaded, setMostDownloaded] = useState<TopPaper[]>([]);
  const [mostViewed, setMostViewed] = useState<TopPaper[]>([]);
  const [telegramLinksDelivered, setTelegramLinksDelivered] = useState(0);
  const [telegramTopLinks, setTelegramTopLinks] = useState<TelegramTopLink[]>([]);

  // Selected reporting period (Sri Lanka dates, inclusive). Single day = from === to.
  const [range, setRange] = useState(() => presetRange("today"));
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState("ol-maths");
  const [year, setYear] = useState("2024");
  const [medium, setMedium] = useState("sinhala");
  const [docType, setDocType] = useState("paper");
  const [part, setPart] = useState<"part1" | "part2" | "full">("part1");
  const [search, setSearch] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const fetchPapers = async () => {
    const papersRes = await fetch("/api/admin/papers", { cache: "no-store" });
    if (papersRes.status === 401) {
      window.location.href = `/${locale}/admin/login`;
      return;
    }
    const papersData = await papersRes.json();
    if (papersData.success) setPapers(papersData.papers || []);
  };

  const fetchAnalytics = async (from: string, to: string) => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(
        `/api/admin/analytics?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
        { cache: "no-store" }
      );
      if (res.status === 401) {
        window.location.href = `/${locale}/admin/login`;
        return;
      }
      const data = await res.json();
      if (data.success) {
        setTraffic({
          range: data.range,
          truncated: Boolean(data.truncated),
          stats: data.stats,
          change: data.change,
          series: data.series || [],
          hourOfDay: data.hourOfDay || EMPTY_TRAFFIC.hourOfDay,
          topSubjects: data.topSubjects || [],
          levelSplit: data.levelSplit || EMPTY_TRAFFIC.levelSplit,
          mediumSplit: data.mediumSplit || {},
        });
        setMostDownloaded(data.mostDownloaded || []);
        setMostViewed(data.mostViewed || []);
        setTelegramLinksDelivered(data.telegramLinksDelivered || 0);
        setTelegramTopLinks(
          Object.entries(data.telegramTopLinks || {})
            .map(([key, count]) => {
              const [subjectId, year, medium, docType] = key.split("|");
              return { subjectId, year, medium, docType, count: count as number };
            })
            .sort((a, b) => b.count - a.count)
        );
        setReports(data.reports || []);
        setRequests(data.requests || []);
        setContributions(data.contributions || []);
      } else {
        setMessage({ text: data.error || "Unable to load analytics.", type: "error" });
      }
    } catch {
      setMessage({ text: "Unable to load dashboard data.", type: "error" });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Reloads everything (used after uploads/deletes/report actions and by the refresh button).
  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchPapers(), fetchAnalytics(range.from, range.to)]);
    } catch {
      setMessage({ text: "Unable to load dashboard data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers()
      .catch(() => setMessage({ text: "Unable to load dashboard data.", type: "error" }))
      .finally(() => setLoading(false));
  }, []);

  // Re-query traffic whenever the selected dates change.
  useEffect(() => {
    fetchAnalytics(range.from, range.to);
  }, [range.from, range.to]);

  // Remember the light/dark choice for the admin panel.
  useEffect(() => {
    const saved = window.localStorage.getItem("ppz_admin_theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      window.localStorage.setItem("ppz_admin_theme", next);
    } catch {}
  };

  const filteredPapers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return papers;
    return papers.filter((paper) =>
      `${paper.subjectId} ${paper.year} ${paper.medium} ${paper.docType}`.toLowerCase().includes(q)
    );
  }, [papers, search]);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    window.setTimeout(() => setMessage(null), 3500);
  };

  const resetForm = () => {
    setFile(null);
    setSubjectId("ol-maths");
    setYear("2024");
    setMedium("sinhala");
    setDocType("paper");
    setPart("part1");
    setEditingKey(null);
  };

  const startEdit = (paper: Paper) => {
    setSubjectId(paper.subjectId);
    setYear(paper.year);
    setMedium(paper.medium);

    // paper.docType is the raw R2 key segment, e.g. "paper", "marking",
    // "paper-part1" or "paper-part2" — split it into the base docType
    // (used by the "Document type" select) and the part (used by the
    // Part 1 / Part 2 / Full Paper select).
    const partMatch = paper.docType.match(/^(paper|marking)-(part1|part2)$/);
    if (partMatch) {
      setDocType(partMatch[1]);
      setPart(partMatch[2] as "part1" | "part2");
    } else {
      setDocType(paper.docType);
      setPart("full");
    }

    setEditingKey(paper.key);
    setFile(null);
    setSection("papers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return showMessage("Select a PDF file first.", "error");

    setUploading(true);
    try {
      const { applyWatermarkInBrowser } = await import("@/lib/clientWatermark");

      const watermarkedBytes = await applyWatermarkInBrowser(
        await file.arrayBuffer()
      );

      // Create a real ArrayBuffer so TypeScript/Node 24 accepts it as BlobPart.
      const safeBuffer = new ArrayBuffer(watermarkedBytes.byteLength);
      new Uint8Array(safeBuffer).set(watermarkedBytes);

      const watermarkedFile = new File([safeBuffer], file.name, {
        type: "application/pdf",
      });

      // Generate the final 1200×630 professional PNG in the admin browser.
      // This keeps image rendering out of the Cloudflare Worker and lets
      // Telegram receive a real PNG instead of the old static logo.
      const telegramGraphic = await createTelegramGraphic({
        subject: subjectId,
        year,
        medium: medium as "sinhala" | "english" | "tamil",
        level: subjectId.startsWith("al-") ? "A/L" : "O/L",
        docType: docType as "paper" | "marking",
        part: subjectId.startsWith("al-") && docType === "paper" ? part : undefined,
      });

      const formData = new FormData();
      formData.append("file", watermarkedFile);
      formData.append("telegramGraphic", telegramGraphic, "telegram-post.png");
      formData.append("subjectId", subjectId);
      formData.append("year", year);
      formData.append("medium", medium);
      formData.append("docType", docType);
      if (subjectId.startsWith("al-") && docType === "paper") {
        formData.append("part", part);
      }

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.status === 401) {
        window.location.href = `/${locale}/admin/login`;
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Upload failed");

      showMessage(editingKey ? "Paper replaced successfully." : "Paper uploaded successfully.", "success");
      resetForm();
      await loadData();
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (paper: Paper) => {
    if (!window.confirm(`Delete ${paper.subjectId} ${paper.year} ${paper.docType}? This cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: paper.key }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");

      showMessage("Paper deleted permanently.", "success");
      await loadData();
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Delete failed.", "error");
    }
  };

  const updateReport = async (id: number, status: "resolved" | "dismissed") => {
    const res = await fetch("/api/admin/reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) return showMessage("Could not update report.", "error");
    showMessage(status === "resolved" ? "Report resolved." : "Report dismissed.", "success");
    await loadData();
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = `/${locale}/admin/login`;
    }
  };

  /* ---------- date range controls ---------- */
  const today = colomboToday();
  const isSingleDay = range.from === range.to;
  const activePreset = PRESETS.find((p) => {
    const r = presetRange(p.id);
    return r.from === range.from && r.to === range.to;
  })?.id;

  const setFrom = (value: string) => {
    if (!value) return;
    const from = value > today ? today : value;
    setRange({ from, to: range.to < from ? from : range.to });
  };
  const setDay = (value: string) => {
    if (!value) return;
    const day = value > today ? today : value;
    setRange({ from: day, to: day });
  };
  const setTo = (value: string) => {
    if (!value) return;
    const to = value > today ? today : value;
    setRange({ from: range.from > to ? to : range.from, to });
  };
  const stepDay = (delta: number) => {
    const next = shiftDate(range.from, delta);
    if (next > today) return;
    setRange({ from: next, to: next });
  };

  const { stats, change } = traffic;
  const days = traffic.range.days || 1;
  const compareNote = `vs previous ${days === 1 ? "day" : `${days} days`}`;
  const periodNote = isSingleDay ? "Selected day" : `${days} days`;

  const statCards: {
    label: string;
    value: number;
    icon: typeof Users;
    change?: number | null;
    tone: string;
  }[] = [
    { label: "Visits", value: stats.visitors, icon: MousePointerClick, change: change.visitors, tone: "indigo" },
    { label: "Unique Visitors", value: stats.uniqueVisitors, icon: UserCheck, tone: "violet" },
    { label: "Paper Views", value: stats.views, icon: Eye, change: change.views, tone: "sky" },
    { label: "Downloads", value: stats.downloads, icon: Download, change: change.downloads, tone: "orange" },
    { label: "New Users", value: stats.newUsers, icon: Users, change: change.newUsers, tone: "green" },
    { label: "Telegram Links Sent", value: telegramLinksDelivered, icon: Send, change: change.telegram, tone: "telegram" },
  ];

  const trendData = traffic.series as unknown as Parameters<typeof TrendChart>[0]["data"];
  const mediumSegments = [
    { label: "Sinhala", value: traffic.mediumSplit.sinhala || 0, color: "#f97316" },
    { label: "English", value: traffic.mediumSplit.english || 0, color: "#6366f1" },
    { label: "Tamil", value: traffic.mediumSplit.tamil || 0, color: "#10b981" },
  ];
  const levelSegments = [
    { label: "O/L", value: traffic.levelSplit.ol, color: "#0ea5e9" },
    { label: "A/L", value: traffic.levelSplit.al, color: "#f97316" },
  ];
  const peakHour = traffic.hourOfDay.some((v) => v > 0)
    ? traffic.hourOfDay.indexOf(Math.max(...traffic.hourOfDay))
    : -1;

  const dateToolbar = (
    <div className={styles.toolbar}>
      <div className={styles.chips} role="group" aria-label="Quick date ranges">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setRange(presetRange(preset.id))}
            className={`${styles.chip} ${activePreset === preset.id ? styles.chipActive : ""}`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className={styles.datePickers}>
        <button
          type="button"
          className={styles.stepBtn}
          onClick={() => stepDay(-1)}
          disabled={!isSingleDay}
          title="Previous day"
          aria-label="Previous day"
        >
          <ChevronLeft size={16} />
        </button>
        <label className={styles.dateField}>
          <CalendarDays size={15} />
          <span>{isSingleDay ? "Date" : "From"}</span>
          <input type="date" value={range.from} max={today} onChange={(e) => (isSingleDay ? setDay(e.target.value) : setFrom(e.target.value))} />
        </label>
        {!isSingleDay && (
          <label className={styles.dateField}>
            <span>To</span>
            <input type="date" value={range.to} min={range.from} max={today} onChange={(e) => setTo(e.target.value)} />
          </label>
        )}
        <button
          type="button"
          className={styles.stepBtn}
          onClick={() => stepDay(1)}
          disabled={!isSingleDay || range.from >= today}
          title="Next day"
          aria-label="Next day"
        >
          <ChevronRight size={16} />
        </button>
        <button
          type="button"
          className={styles.rangeToggle}
          onClick={() => (isSingleDay ? setRange({ from: shiftDate(range.to, -6), to: range.to }) : setRange({ from: range.to, to: range.to }))}
        >
          {isSingleDay ? "Pick a range" : "Single day"}
        </button>
      </div>
    </div>
  );

  const statsGrid = (
    <section className={`${styles.statsGrid} ${analyticsLoading ? styles.dim : ""}`}>
      {statCards.map((card) => {
        const Icon = card.icon;
        const c = card.change;
        return (
          <div key={card.label} className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles[`tone_${card.tone}`]}`}><Icon size={19} /></div>
            <div className={styles.statLabel}>{card.label}</div>
            <div className={styles.statValue}>{Number(card.value || 0).toLocaleString()}</div>
            <div className={styles.statFoot}>
              {c === undefined ? (
                <span className={styles.statNote}>{periodNote}</span>
              ) : c === null ? (
                <span className={`${styles.delta} ${styles.deltaUp}`}>New</span>
              ) : (
                <span className={`${styles.delta} ${c > 0 ? styles.deltaUp : c < 0 ? styles.deltaDown : styles.deltaFlat}`}>
                  {c > 0 ? <ArrowUpRight size={12} /> : c < 0 ? <ArrowDownRight size={12} /> : null}
                  {Math.abs(c)}%
                </span>
              )}
              {c !== undefined && <span className={styles.statNote}>{compareNote}</span>}
            </div>
          </div>
        );
      })}
    </section>
  );

  const truncatedNote = traffic.truncated && (
    <div className={`${styles.alert} ${styles.alertWarn}`}>
      <AlertCircle size={18} />
      This period has a very large number of events, so the charts show the most recent portion. Pick a shorter range for exact numbers.
    </div>
  );

  const trendCard = (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>Traffic Trend</h2>
          <p>{traffic.range.granularity === "hour" ? "Hour-by-hour activity" : "Day-by-day activity"} · {rangeLabel(range.from, range.to)}</p>
        </div>
        <ChartLegend series={SERIES} />
      </div>
      <div className={analyticsLoading ? styles.dim : ""}>
        <TrendChart data={trendData} series={SERIES} />
      </div>
    </div>
  );

  const hoursCard = (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>Busiest Hours</h2>
          <p>
            {peakHour >= 0
              ? `Peak activity around ${String(peakHour).padStart(2, "0")}:00 (Sri Lanka time)`
              : "Activity by hour of day (Sri Lanka time)"}
          </p>
        </div>
        <Clock3 size={19} className={styles.accentIcon} />
      </div>
      <div className={analyticsLoading ? styles.dim : ""}>
        <HourBars values={traffic.hourOfDay} />
      </div>
    </div>
  );

  const audienceCard = (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>What People Open</h2>
          <p>Paper views + downloads by level and medium</p>
        </div>
        <BookOpen size={19} className={styles.accentIcon} />
      </div>
      <div className={`${styles.donutPair} ${analyticsLoading ? styles.dim : ""}`}>
        <Donut segments={levelSegments} centerLabel="BY LEVEL" />
        <Donut segments={mediumSegments} centerLabel="BY MEDIUM" />
      </div>
    </div>
  );

  const subjectsMax = Math.max(1, ...traffic.topSubjects.map((s) => s.total));
  const subjectsCard = (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>Top Subjects</h2>
          <p>Most active subjects in the selected period</p>
        </div>
        <BarChart3 size={19} className={styles.accentIcon} />
      </div>
      <div className={`${styles.list} ${analyticsLoading ? styles.dim : ""}`}>
        {traffic.topSubjects.length ? traffic.topSubjects.map((s) => (
          <div key={s.subjectId} className={styles.subjectRow}>
            <div className={styles.subjectTop}>
              <span>{subjectLabel(s.subjectId)}</span>
              <b>{s.total.toLocaleString()}</b>
            </div>
            <div className={styles.stackBar}>
              <i className={styles.stackViews} style={{ width: `${(s.views / subjectsMax) * 100}%` }} />
              <i className={styles.stackDownloads} style={{ width: `${(s.downloads / subjectsMax) * 100}%` }} />
            </div>
            <div className={styles.subjectMeta}>{s.views.toLocaleString()} views · {s.downloads.toLocaleString()} downloads</div>
          </div>
        )) : <Empty text="No paper activity in this period." />}
      </div>
    </div>
  );

  return (
    <div className={styles.admin} data-theme={theme}>
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className={styles.overlay}
        />
      )}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <Image src="/logo.png" alt="PastPaperZone" width={42} height={42} className={styles.logo} />
          <div>
            <div className={styles.brandName}>PastPaperZone</div>
            <div className={styles.brandSub}>ADMIN DASHBOARD</div>
          </div>
          <button className={styles.mobileClose} onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.navLabel}>MENU</div>
        <nav className={styles.nav}>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  setMobileOpen(false);
                }}
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.id === "reports" && reports.length > 0 && (
                  <span className={styles.badge}>{reports.length}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href="https://pastpaperzone.lk" className={styles.backLink}>
            <ChevronLeft size={16} /> Back to website
          </Link>
          <button onClick={handleLogout} disabled={loggingOut} className={styles.logout}>
            <LogOut size={16} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.mobileMenu} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.liveDot}><i /> Live admin data</span>
            <button onClick={toggleTheme} className={styles.iconBtn} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={loadData} className={styles.iconBtn} title="Refresh" aria-label="Refresh">
              <RefreshCw size={18} className={loading || analyticsLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        <div className={styles.content}>
          {message && (
            <div className={`${styles.alert} ${message.type === "success" ? styles.alertSuccess : styles.alertError}`}>
              {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </div>
          )}

          <div className={styles.pageHeading}>
            <div>
              <p className={styles.eyebrow}>ADMIN PORTAL</p>
              <h1>{section === "overview" ? "Dashboard Overview" : nav.find((n) => n.id === section)?.label}</h1>
              <p>{SECTION_SUBTITLE[section]}</p>
            </div>
            {(section === "overview" || section === "analytics" || section === "users") && (
              <div className={styles.periodBadge}>
                <CalendarDays size={15} /> {rangeLabel(range.from, range.to)}
              </div>
            )}
          </div>

          {(section === "overview" || section === "analytics" || section === "users") && dateToolbar}
          {(section === "overview" || section === "analytics") && truncatedNote}
          {(section === "overview" || section === "analytics") && statsGrid}

          {section === "overview" && (
            <div className={styles.stack}>
              {trendCard}
              <div className={styles.twoColumns}>
                {hoursCard}
                {audienceCard}
              </div>
              <div className={styles.twoColumns}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>Most Downloaded</h2>
                      <p>Top papers by downloads · {rangeLabel(range.from, range.to)}</p>
                    </div>
                    <Download size={19} className={styles.accentIcon} />
                  </div>
                  <RankList items={mostDownloaded.slice(0, 5)} empty="No downloads in this period." dim={analyticsLoading} />
                </div>

                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>Reported Papers</h2>
                      <p>Problems waiting for admin review</p>
                    </div>
                    <Flag size={19} className={styles.redIcon} />
                  </div>
                  <div className={styles.list}>
                    {reports.length ? reports.slice(0, 5).map((report) => (
                      <div key={report.id} className={styles.reportRow}>
                        <div>
                          <strong>{subjectLabel(report.subject_id)} {report.year}</strong>
                          <span>{report.reason}</span>
                        </div>
                        <button onClick={() => setSection("reports")} className={styles.textButton}>Review</button>
                      </div>
                    )) : <Empty text="No pending reports." />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "papers" && (
            <div className={styles.stack}>
              <div className={styles.paperGrid}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>{editingKey ? "Edit / Replace Paper" : "Add Paper"}</h2>
                      <p>Upload a PDF to Cloudflare R2</p>
                    </div>
                    {editingKey && <button onClick={resetForm} className={styles.cancelEdit}>Cancel</button>}
                  </div>
                  <form onSubmit={handleUpload} className={styles.form}>
                    <label>
                      Subject
                      <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                        <optgroup label="O/L">
                          {OL_SUBJECTS.map((s) => (
                            <option key={s.id} value={s.id}>{subjectLabel(s.id)}</option>
                          ))}
                        </optgroup>
                        <optgroup label="A/L">
                          {AL_SUBJECTS.map((s) => (
                            <option key={s.id} value={s.id}>{subjectLabel(s.id)}</option>
                          ))}
                        </optgroup>
                      </select>
                    </label>
                    <label>
                      Year
                      <select value={year} onChange={(e) => setYear(e.target.value)}>
                        {YEAR_OPTIONS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </label>
                    <label>Medium<select value={medium} onChange={(e) => setMedium(e.target.value)}><option value="sinhala">Sinhala Medium</option><option value="english">English Medium</option><option value="tamil">Tamil Medium</option></select></label>
                    <label>Document type<select value={docType} onChange={(e) => setDocType(e.target.value)}><option value="paper">Question Paper</option><option value="marking">Marking Scheme</option></select></label>
                    {subjectId.startsWith("al-") && docType === "paper" && (
                      <label>
                        Part
                        <select
                          value={part}
                          onChange={(e) =>
                            setPart(e.target.value as "part1" | "part2" | "full")
                          }
                        >
                          <option value="full">Full Paper (no Part 1/2 split)</option>
                          <option value="part1">Part 1</option>
                          <option value="part2">Part 2</option>
                        </select>
                      </label>
                    )}
                    <label>PDF file<input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} required /></label>
                    <p className={styles.helper}>Same subject + year + medium + type will replace the existing PDF.</p>
                    <button disabled={uploading} className={styles.primaryButton}>{uploading ? "Uploading..." : editingKey ? "Replace Paper" : "Add Paper"}</button>
                  </form>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>All Papers</h2>
                      <p>{papers.length} files currently stored in R2</p>
                    </div>
                    <div className={styles.searchBox}>
                      <Search size={16} />
                      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search papers..." />
                    </div>
                  </div>

                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead><tr><th>Paper</th><th>Medium</th><th>Type</th><th>Actions</th></tr></thead>
                      <tbody>
                        {filteredPapers.map((paper) => (
                          <tr key={paper.key}>
                            <td><strong>{paper.subjectId}</strong> <span>{paper.year}</span></td>
                            <td>{paper.medium}</td>
                            <td>{paper.docType}</td>
                            <td className={styles.actions}>
                              <button onClick={() => startEdit(paper)} title="Edit"><FileEdit size={16} /></button>
                              <button onClick={() => handleDelete(paper)} title="Delete"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!filteredPapers.length && <Empty text="No papers found." />}
                  </div>
                </div>
              </div>

            </div>
          )}

          {section === "reports" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Reported Papers</h2>
                  <p>Review user-submitted paper problems</p>
                </div>
                <span className={styles.pendingBadge}>{reports.length} pending</span>
              </div>

              <div className={styles.reportList}>
                {reports.map((report) => (
                  <div key={report.id} className={styles.fullReport}>
                    <div>
                      <strong>{report.subject_id} {report.year} • {report.medium}</strong>
                      <span>{report.reason}</span>
                      {report.details && <p>{report.details}</p>}
                    </div>
                    <div className={styles.reportActions}>
                      <button onClick={() => updateReport(report.id, "resolved")} className={styles.resolve}><CheckCircle2 size={15} /> Resolve</button>
                      <button onClick={() => updateReport(report.id, "dismissed")} className={styles.dismiss}><X size={15} /> Dismiss</button>
                    </div>
                  </div>
                ))}
                {!reports.length && <Empty text="No pending reports." />}
              </div>
            </div>
          )}

          {section === "users" && (
            <div className={styles.stack}>
              <div className={styles.twoColumns}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>New Users</h2>
                      <p>Registrations · {rangeLabel(range.from, range.to)}</p>
                    </div>
                    <Users size={19} className={styles.accentIcon} />
                  </div>
                  <div className={styles.bigMetric}>{stats.newUsers.toLocaleString()}</div>
                  <div className={styles.muted}>
                    {change.newUsers === null
                      ? "No sign-ups in the previous period"
                      : `${change.newUsers > 0 ? "+" : ""}${change.newUsers}% ${compareNote}`}
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>Unique Visitors</h2>
                      <p>Distinct browsers that visited the site</p>
                    </div>
                    <UserCheck size={19} className={styles.accentIcon} />
                  </div>
                  <div className={styles.bigMetric}>{stats.uniqueVisitors.toLocaleString()}</div>
                  <div className={styles.muted}>{stats.visitors.toLocaleString()} total visits in this period</div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2>Sign-ups Over Time</h2>
                    <p>{traffic.range.granularity === "hour" ? "Hour-by-hour" : "Day-by-day"} registrations</p>
                  </div>
                  <ChartLegend series={SIGNUP_SERIES} />
                </div>
                <div className={analyticsLoading ? styles.dim : ""}>
                  <TrendChart data={trendData} series={SIGNUP_SERIES} height={260} />
                </div>
              </div>
            </div>
          )}

          {section === "requests" && (
            <div className={styles.twoColumns}>
              <RequestCard title="Paper Requests" icon={<Clock3 size={19} />} items={requests} />
              <RequestCard title="Contributions" icon={<MessageSquarePlus size={19} />} items={contributions} />
            </div>
          )}

          {section === "analytics" && (
            <div className={styles.stack}>
              {trendCard}
              <div className={styles.twoColumns}>
                {hoursCard}
                {audienceCard}
              </div>
              <div className={styles.twoColumns}>
                {subjectsCard}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>Telegram Activity</h2>
                      <p>Paper links the bot sent in this period</p>
                    </div>
                    <Send size={19} className={styles.accentIcon} />
                  </div>
                  <div className={analyticsLoading ? styles.dim : ""}>
                    <TrendChart data={trendData} series={TELEGRAM_SERIES} height={200} />
                  </div>
                </div>
              </div>
              <div className={styles.twoColumns}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div><h2>Most Downloaded</h2><p>Top papers by downloads</p></div>
                    <Download size={19} className={styles.accentIcon} />
                  </div>
                  <RankList items={mostDownloaded} empty="No downloads in this period." dim={analyticsLoading} />
                </div>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div><h2>Most Viewed</h2><p>Top papers by previews</p></div>
                    <Eye size={19} className={styles.accentIcon} />
                  </div>
                  <RankList items={mostViewed} empty="No views in this period." color="blue" dim={analyticsLoading} />
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2>Most Requested via Telegram</h2>
                    <p>Top papers/marking schemes the bot sent links for</p>
                  </div>
                  <Send size={19} className={styles.accentIcon} />
                </div>
                <RankList items={telegramTopLinks.slice(0, 10)} empty="No Telegram bot activity in this period." color="telegram" dim={analyticsLoading} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className={styles.empty}>{text}</div>;
}

function RequestCard({ title, icon, items }: { title: string; icon: React.ReactNode; items: any[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}><div><h2>{title}</h2><p>Pending items requiring attention</p></div>{icon}</div>
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.requestRow}>
            <strong>{item.subject || item.subject_id || "Contribution"}</strong>
            <span>{item.name || item.year || "Anonymous"} • {item.email || item.medium || "-"}</span>
            <p>{item.message || item.topic || item.file_key || "-"}</p>
          </div>
        ))}
        {!items.length && <Empty text={`No pending ${title.toLowerCase()}.`} />}
      </div>
    </div>
  );
}

function RankList({
  items,
  empty,
  color = "orange",
  dim = false,
}: {
  items: TopPaper[];
  empty: string;
  color?: "orange" | "blue" | "telegram";
  dim?: boolean;
}) {
  const max = Math.max(1, ...items.map((i) => i.count));
  const rankClass = color === "blue" ? styles.rankBlue : color === "telegram" ? styles.rankTelegram : "";
  const barClass = color === "blue" ? styles.barBlue : color === "telegram" ? styles.barTelegram : "";
  return (
    <div className={`${styles.list} ${dim ? styles.dim : ""}`}>
      {items.length ? items.map((item, index) => (
        <div key={`${item.subjectId}-${item.year}-${item.medium}-${item.docType}`} className={styles.rankRow}>
          <span className={`${styles.rank} ${rankClass}`}>{index + 1}</span>
          <div className={styles.rankBody}>
            <div className={styles.rankTitle}>{paperTitle(item)}</div>
            <div className={styles.rankSub}>{paperSub(item)}</div>
            <div className={styles.rankTrack}>
              <i className={`${styles.rankFill} ${barClass}`} style={{ width: `${(item.count / max) * 100}%` }} />
            </div>
          </div>
          <b>{item.count.toLocaleString()}</b>
        </div>
      )) : <Empty text={empty} />}
    </div>
  );
}
