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

type Availability = { full: boolean; part1: boolean; part2: boolean } | null;

export default function PaperDetailClient({ subjectId, subjectName, level, year, medium }: Props) {
  const { user, openLoginModal } = useAuth();
  const { isDarkMode } = useTheme();
  const searchParams = useSearchParams();
  // Allows deep links like ?type=marking (used by the Telegram bot) to open
  // straight into the marking-scheme tab instead of always defaulting to paper.
  const initialDocType = searchParams.get("type") === "marking" ? "marking" : "paper";
  const [docType, setDocType] = useState<"paper" | "marking">(initialDocType);
  // Deep links like ?part=part2 (used by the Telegram bot/channel post) can
  // preselect a part. Falls back to whatever is actually available once the
  // availability check below resolves.
  const initialPart = searchParams.get("part") === "part2" ? "part2" : "part1";
  const [part, setPart] = useState<"part1" | "part2">(initialPart);
  const [availability, setAvailability] = useState<Availability>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [report, setReport] = useState(false);
  const [reason, setReason] = useState("PDF doesn't open");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  // Whether this A/L question paper was uploaded as one single "full" paper
  // (no Part 1 / Part 2 split) — in that case the Part tabs shouldn't show.
  const isALQuestionPaper = level === "al" && docType === "paper";
  const isFullPaper = !isALQuestionPaper || !!availability?.full;
  const hasParts = isALQuestionPaper && !availability?.full && (!!availability?.part1 || !!availability?.part2);
  const currentDocAvailable = checkingAvailability
    ? null
    : isFullPaper
    ? !!availability?.full
    : (part === "part1" ? !!availability?.part1 : !!availability?.part2);

  const fileUrl = useMemo(() => {
    const params = new URLSearchParams({
      subject: subjectId,
      year,
      medium,
      type: docType,
      action: "view",
    });

    // Part is only used for A/L question papers that are actually split
    // into Part 1 / Part 2 — a "full paper" upload is fetched with no part.
    if (hasParts) {
      params.set("part", part);
    }

    return `/api/paper?${params.toString()}`;
  }, [subjectId, year, medium, docType, part, hasParts]);

  // Check what's actually uploaded for this subject/year/medium/docType
  // before showing Preview/Download or a Part 1 / Part 2 picker — this is
  // what lets a "full paper" subject show as one paper (no Part tabs) and
  // an unavailable paper show a clean message instead of a broken preview.
  useEffect(() => {
    let cancelled = false;
    setCheckingAvailability(true);

    const params = new URLSearchParams({ subject: subjectId, year, medium, type: docType });
    fetch(`/api/paper/availability?${params.toString()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.success) {
          const next: Availability = { full: !!data.full, part1: !!data.part1, part2: !!data.part2 };
          setAvailability(next);
          // If the part we currently have selected isn't the one that's
          // actually available, switch to whichever one is.
          if (level === "al" && docType === "paper" && !next.full) {
            if (next.part1 && !next.part2) setPart("part1");
            else if (next.part2 && !next.part1) setPart("part2");
          }
        } else {
          setAvailability(null);
        }
      })
      .catch(() => {
        if (!cancelled) setAvailability(null);
      })
      .finally(() => {
        if (!cancelled) setCheckingAvailability(false);
      });

    return () => {
      cancelled = true;
    };
  }, [subjectId, year, medium, docType, level]);

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

    if (hasParts) {
      params.set("part", part);
    }

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
          <button
            onClick={openPaper}
            disabled={currentDocAvailable === false}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#DD6B20] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye size={18} /> Preview
          </button>
          <button
            onClick={downloadPaper}
            disabled={currentDocAvailable === false}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-bold disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20]"
                : "bg-white border-gray-300 text-[#1A365D] hover:border-[#DD6B20]"
            }`}
          >
            <Download size={18} /> Download
          </button>
          <button
            onClick={savePaper}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-bold disabled:opacity-60 ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20]"
                : "bg-white border-gray-300 text-[#1A365D] hover:border-[#DD6B20]"
            }`}
          >
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={() => requireLogin() || setReport(true)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-bold ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-600 text-gray-200 hover:border-red-400 hover:text-red-300"
                : "bg-white border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500"
            }`}
          >
            <Flag size={18} /> Report
          </button>
        </div>

        <div className="flex gap-2 mt-6">
          {(["paper", "marking"] as const).map((type) => (
            <button
              key={type}
              onClick={() => { setDocType(type); setPreview(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${
                docType === type
                  ? "bg-[#DD6B20] text-white"
                  : isDarkMode
                  ? "bg-[#2D3748] border border-gray-600 text-white"
                  : "bg-gray-500/10 text-[#1A365D]"
              }`}
            >
              {type === "paper" ? "Question Paper" : "Marking Scheme"}
            </button>
          ))}
        </div>
        {hasParts && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              setPart("part1");
              setPreview(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
              part === "part1"
                ? "bg-[#DD6B20] text-white"
                : isDarkMode
                ? "bg-[#2D3748] border border-gray-600 text-white"
                : "bg-gray-500/10 text-[#1A365D]"
            }`}
          >
            Part 1
          </button>

          <button
            onClick={() => {
              setPart("part2");
              setPreview(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
              part === "part2"
                ? "bg-[#DD6B20] text-white"
                : isDarkMode
                ? "bg-[#2D3748] border border-gray-600 text-white"
                : "bg-gray-500/10 text-[#1A365D]"
            }`}
          >
            Part 2
          </button>
        </div>
      )}
      </div>

      {message && (
        <div className="rounded-xl border border-orange-300 bg-orange-50 text-orange-800 px-4 py-3 text-sm font-semibold">
          {message}
        </div>
      )}

      {!checkingAvailability && currentDocAvailable === false && (
        <div className={`rounded-2xl border p-6 text-center ${
          isDarkMode ? "bg-[#2D3748] border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-600"
        }`}>
          <p className="font-bold">
            {docType === "paper" ? "This question paper" : "This marking scheme"} isn&apos;t uploaded yet.
          </p>
          <p className="text-sm mt-1 opacity-80">
            Please check back later, or use the Report button to let us know you were looking for it.
          </p>
        </div>
      )}

      {preview && currentDocAvailable && (
        <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between gap-4 p-4 border-b">
            <strong>{docType === "paper" ? "Question Paper" : "Marking Scheme"} Preview</strong>
            <button onClick={() => setPreview(false)} className="text-sm font-bold text-[#DD6B20]">Close</button>
          </div>
            <iframe src={fileUrl} title={`${year} ${subjectName} ${docType}`} className="w-full h-[45vh] sm:h-[60vh] md:h-[75vh]" />
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
