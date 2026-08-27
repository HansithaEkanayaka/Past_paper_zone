"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Download,
  FileEdit,
  Flag,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquarePlus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock3,
  ChevronLeft,
  Send,
} from "lucide-react";
import { useLocale } from "next-intl";
import styles from "./page.module.css";
import { OL_SUBJECTS, AL_SUBJECTS } from "@/lib/subjects";
import { createTelegramGraphic } from "@/lib/clientTelegramGraphic";


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

type Analytics = {
  visitors: number;
  views: number;
  downloads: number;
  newUsers: number;
};

type TopPaper = {
  subjectId: string;
  year: string;
  medium: string;
  docType: string;
  count: number;
};

type TelegramTopLink = {
  subjectId: string;
  year: string;
  medium: string;
  docType: string;
  count: number;
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

export default function AdminDashboard() {
  const locale = useLocale();
  const [section, setSection] = useState<Section>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [papers, setPapers] = useState<Paper[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    visitors: 0,
    views: 0,
    downloads: 0,
    newUsers: 0,
  });
  const [mostDownloaded, setMostDownloaded] = useState<TopPaper[]>([]);
  const [mostViewed, setMostViewed] = useState<TopPaper[]>([]);
  const [telegramLinksDelivered, setTelegramLinksDelivered] = useState(0);
  const [telegramTopLinks, setTelegramTopLinks] = useState<TelegramTopLink[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState("ol-maths");
  const [year, setYear] = useState("2024");
  const [medium, setMedium] = useState("sinhala");
  const [docType, setDocType] = useState("paper");
  const [part, setPart] = useState<"part1" | "part2">("part1");
  const [search, setSearch] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [papersRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/papers", { cache: "no-store" }),
        fetch("/api/admin/analytics", { cache: "no-store" }),
      ]);

      if (papersRes.status === 401 || analyticsRes.status === 401) {
        window.location.href = `/${locale}/admin/login`;
        return;
      }

      const papersData = await papersRes.json();
      const analyticsData = await analyticsRes.json();

      if (papersData.success) setPapers(papersData.papers || []);
      if (analyticsData.success) {
        setAnalytics(analyticsData.stats || { visitors: 0, views: 0, downloads: 0, newUsers: 0 });
        setMostDownloaded(analyticsData.mostDownloaded || []);
        setMostViewed(analyticsData.mostViewed || []);
        setTelegramLinksDelivered(analyticsData.telegramLinksDelivered || 0);
        setTelegramTopLinks(
          Object.entries(analyticsData.telegramTopLinks || {})
            .map(([key, count]) => {
              const [subjectId, year, medium, docType] = key.split("|");
              return { subjectId, year, medium, docType, count: count as number };
            })
            .sort((a, b) => b.count - a.count)
        );
        setReports(analyticsData.reports || []);
        setRequests(analyticsData.requests || []);
        setContributions(analyticsData.contributions || []);
      }
    } catch {
      setMessage({ text: "Unable to load dashboard data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
    setDocType(paper.docType);
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

  const formatPaper = (item: TopPaper) =>
    `${item.subjectId} • ${item.year} • ${item.medium} • ${item.docType}`;

  const statCards = [
    { label: "Visitors", value: analytics.visitors, icon: Users, note: "Today" },
    { label: "Paper Views", value: analytics.views, icon: Eye, note: "Today" },
    { label: "Downloads", value: analytics.downloads, icon: Download, note: "Today" },
    { label: "New Users", value: analytics.newUsers, icon: Users, note: "Today" },
    { label: "Telegram Links Sent", value: telegramLinksDelivered, icon: Send, note: "Today" },
  ];

  return (
    <div className={styles.admin}>
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
          <Link href="/" className={styles.backLink}>
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
          <button className={styles.mobileMenu} onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.liveDot}><i /> Live admin data</span>
            <button onClick={loadData} className={styles.refresh} title="Refresh">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
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
              <p>Manage papers, reports, requests and site demand from one place.</p>
            </div>
          </div>

          {(section === "overview" || section === "analytics") && (
            <section className={styles.statsGrid}>
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className={styles.statCard}>
                    <div className={styles.statIcon}><Icon size={19} /></div>
                    <div className={styles.statLabel}>{card.label}</div>
                    <div className={styles.statValue}>{Number(card.value || 0).toLocaleString()}</div>
                    <div className={styles.statNote}>{card.note}</div>
                  </div>
                );
              })}
            </section>
          )}

          {section === "overview" && (
            <>
              <div className={styles.twoColumns}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2>Most Downloaded</h2>
                      <p>Top papers by downloads today</p>
                    </div>
                    <Download size={19} className={styles.orangeIcon} />
                  </div>
                  <div className={styles.list}>
                    {mostDownloaded.length ? mostDownloaded.slice(0, 5).map((item, index) => (
                      <div key={formatPaper(item)} className={styles.rankRow}>
                        <span className={styles.rank}>{index + 1}</span>
                        <span className={styles.rowTitle}>{formatPaper(item)}</span>
                        <b>{item.count}</b>
                      </div>
                    )) : <Empty text="No download data yet." />}
                  </div>
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
                          <strong>{report.subject_id} {report.year}</strong>
                          <span>{report.reason}</span>
                        </div>
                        <button onClick={() => setSection("papers")} className={styles.textButton}>Review</button>
                      </div>
                    )) : <Empty text="No pending reports." />}
                  </div>
                </div>
              </div>
            </>
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
                            setPart(e.target.value as "part1" | "part2")
                          }
                        >
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
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>User Activity</h2>
                  <p>New user registrations tracked for today</p>
                </div>
                <Users size={19} className={styles.orangeIcon} />
              </div>
              <div className={styles.bigMetric}>{analytics.newUsers.toLocaleString()}</div>
              <div className={styles.muted}>New users today</div>
            </div>
          )}

          {section === "requests" && (
            <div className={styles.twoColumns}>
              <RequestCard title="Paper Requests" icon={<Clock3 size={19} />} items={requests} />
              <RequestCard title="Contributions" icon={<MessageSquarePlus size={19} />} items={contributions} />
            </div>
          )}

          {section === "analytics" && (
            <>
              <div className={styles.twoColumns}>
                <RankingCard title="Most Downloaded" items={mostDownloaded} color="orange" formatPaper={formatPaper} />
                <RankingCard title="Most Viewed" items={mostViewed} color="blue" formatPaper={formatPaper} />
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2>Most Requested via Telegram</h2>
                    <p>Top papers/marking schemes the bot has sent links for today</p>
                  </div>
                  <Send size={19} className={styles.orangeIcon} />
                </div>
                <div className={styles.list}>
                  {telegramTopLinks.length ? telegramTopLinks.slice(0, 10).map((item, index) => (
                    <div key={`${item.subjectId}-${item.year}-${item.medium}-${item.docType}`} className={styles.rankRow}>
                      <span className={styles.rank}>{index + 1}</span>
                      <span className={styles.rowTitle}>{formatPaper(item)}</span>
                      <b>{item.count}</b>
                    </div>
                  )) : <Empty text="No Telegram bot activity yet today." />}
                </div>
              </div>
            </>
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

function RankingCard({
  title,
  items,
  color,
  formatPaper,
}: {
  title: string;
  items: TopPaper[];
  color: "orange" | "blue";
  formatPaper: (item: TopPaper) => string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}><div><h2>{title}</h2><p>Top performing papers today</p></div>{color === "orange" ? <Download size={19} /> : <Eye size={19} />}</div>
      <div className={styles.list}>
        {items.length ? items.map((item, index) => (
          <div key={formatPaper(item)} className={styles.rankRow}>
            <span className={`${styles.rank} ${color === "blue" ? styles.rankBlue : ""}`}>{index + 1}</span>
            <span className={styles.rowTitle}>{formatPaper(item)}</span>
            <b>{item.count}</b>
          </div>
        )) : <Empty text="No analytics data yet." />}
      </div>
    </div>
  );
}
