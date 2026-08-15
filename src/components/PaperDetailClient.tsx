"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Bookmark, BookmarkCheck, Download, Eye, Flag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  subjectId: string;
  subjectName: string;
  level: "ol" | "al";
  year: string;
  medium: "sinhala" | "english" | "tamil";
};

const mediumNames = {
  sinhala: "Sinhala Medium",
  english: "English Medium",
  tamil: "Tamil Medium",
} as const;

export default function PaperDetailClient({ subjectId, subjectName, level, year, medium }: Props) {
  const { user, openLoginModal } = useAuth();
  const { isDarkMode } = useTheme();
  const searchParams = useSearchParams();
  // Allows deep links like ?type=marking (used by the Telegram bot) to open
  // straight into the marking-scheme tab instead of always defaulting to paper.
  const initialDocType = searchParams.get("type") === "marking" ? "marking" : "paper";
  const [docType, setDocType] = useState<"paper" | "marking">(initialDocType);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [report, setReport] = useState(false);
  const [reason, setReason] = useState("PDF doesn't open");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  const fileUrl = useMemo(() => {
    const params = new URLSearchParams({
      subject: subjectId,
      year,
      medium,
      type: docType,
      action: "view",
    });
    return `/api/paper?${params.toString()}`;
  }, [subjectId, year, medium, docType]);

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }

    fetch("/api/saved-papers", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const match = (data?.papers || []).some(
          (paper: { subject_id: string; year: string; medium: string; doc_type: string }) =>
            paper.subject_id === subjectId &&
            String(paper.year) === year &&
            paper.medium === medium &&
            paper.doc_type === docType
        );
        setSaved(match);
      })
      .catch(() => {});
  }, [user, subjectId, year, medium, docType]);

  const requireLogin = () => {
    if (!user) {
      openLoginModal();
      return true;
    }
    return false;
  };

  const savePaper = async () => {
    if (requireLogin() || saving) return;

    setSaving(true);
    try {
      const res = await fetch("/api/saved-papers", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, year, medium, docType }),
      });

      if (!res.ok) throw new Error();
      setSaved(!saved);
    } catch {
      setMessage("Could not update your saved papers.");
    } finally {
      setSaving(false);
    }
  };

  const submitReport = async () => {
    if (requireLogin()) return;

    try {
      const res = await fetch("/api/report-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, year, medium, docType, reason, details }),
      });
      if (!res.ok) throw new Error();
      setReport(false);
      setDetails("");
      setMessage("Thanks. Your report was submitted.");
    } catch {
      setMessage("Could not submit the report.");
    }
  };

  const openPaper = () => {
    if (requireLogin()) return;
    setPreview(true);
  };

  const downloadPaper = () => {
    if (requireLogin()) return;
    const params = new URLSearchParams({
      subject: subjectId,
      year,
      medium,
      type: docType,
      action: "download",
    });
    window.open(`/api/paper?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8">
      <div className={`rounded-3xl border p-6 md:p-8 ${isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-[#DD6B20] text-xs font-bold uppercase">
            {level.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-500/10 text-xs font-semibold">
            {mediumNames[medium]}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-500/10 text-xs font-semibold">
            {year}
          </span>
        </div>

        <h1 className={`text-3xl md:text-5xl font-extrabold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
          {year} {subjectName} Past Paper {mediumNames[medium]}
        </h1>
        <p className={`mt-3 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {year} {subjectName} {docType === "paper" ? "past paper" : "marking scheme"} in {mediumNames[medium]}.
          View the paper online, download the PDF, or save it to your dashboard.
        </p>

        <div className="flex flex-wrap gap-3 mt-7">
          <button onClick={openPaper} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#DD6B20] text-white font-bold">
            <Eye size={18} /> Preview
          </button>
          <button onClick={downloadPaper} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-bold">
            <Download size={18} /> Download
          </button>
          <button onClick={savePaper} disabled={saving} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-bold">
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            {saved ? "Saved" : "Save"}
          </button>
          <button onClick={() => requireLogin() || setReport(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-bold">
            <Flag size={18} /> Report
          </button>
        </div>

        <div className="flex gap-2 mt-6">
          {(["paper", "marking"] as const).map((type) => (
            <button
              key={type}
              onClick={() => { setDocType(type); setPreview(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${docType === type ? "bg-[#DD6B20] text-white" : "bg-gray-500/10"}`}
            >
              {type === "paper" ? "Question Paper" : "Marking Scheme"}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="rounded-xl border border-orange-300 bg-orange-50 text-orange-800 px-4 py-3 text-sm font-semibold">
          {message}
        </div>
      )}

      {preview && (
        <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between gap-4 p-4 border-b">
            <strong>{docType === "paper" ? "Question Paper" : "Marking Scheme"} Preview</strong>
            <button onClick={() => setPreview(false)} className="text-sm font-bold text-[#DD6B20]">Close</button>
          </div>
          <iframe src={fileUrl} title={`${year} ${subjectName} ${docType}`} className="w-full h-[75vh]" />
        </div>
      )}

      {report && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={() => setReport(false)}>
          <div className={`w-full max-w-lg rounded-2xl p-6 ${isDarkMode ? "bg-[#2D3748] text-white" : "bg-white text-gray-900"}`} onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-extrabold">Report this paper</h2>
            <p className="text-sm opacity-70 mt-1">{year} • {subjectName} • {mediumNames[medium]}</p>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full mt-5 rounded-xl border p-3 ${
                isDarkMode ? "bg-[#1A202C] border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>PDF doesn&apos;t open</option>
              <option>Wrong paper</option>
              <option>Missing pages</option>
              <option>Wrong marking scheme</option>
              <option>Poor quality</option>
              <option>Other</option>
            </select>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="Optional details"
              className={`w-full mt-3 rounded-xl border p-3 ${
                isDarkMode
                  ? "bg-[#1A202C] border-gray-600 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setReport(false)} className="px-4 py-2 rounded-lg border font-bold">Cancel</button>
              <button onClick={submitReport} className="px-4 py-2 rounded-lg bg-[#DD6B20] text-white font-bold">Submit report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
