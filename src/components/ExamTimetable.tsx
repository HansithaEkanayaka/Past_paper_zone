"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import { EXAMS, ExamLevel } from "@/lib/examDates";

function useDaysUntil(target: Date) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const diff = target.getTime() - Date.now();
      setDays(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [target]);

  return days;
}

export default function ExamTimetable() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("timetable");
  const [level, setLevel] = useState<ExamLevel>("al");
  const exam = EXAMS[level];
  const daysLeft = useDaysUntil(exam.start);

  const [downloadState, setDownloadState] = useState<"idle" | "loading">("idle");
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const handleLevelChange = (lvl: ExamLevel) => {
    setLevel(lvl);
    setDownloadMessage(null);
  };

  const handleDownload = async () => {
    setDownloadState("loading");
    setDownloadMessage(null);

    try {
      const res = await fetch(`/api/timetable?level=${level}`);

      if (!res.ok) {
        setDownloadMessage(t("notReleased", { label: exam.label }));
        return;
      }

      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") || "";
      const nameMatch = disposition.match(/filename="([^"]+)"/);
      const filename = nameMatch?.[1] || `${exam.label}-${exam.year}-timetable.pdf`;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Timetable download failed:", err);
      setDownloadMessage(t("notReleased", { label: exam.label }));
    } finally {
      setDownloadState("idle");
    }
  };

  return (
    <section
      className={`w-full py-16 px-6 md:px-16 border-b transition-colors duration-300 ${
        isDarkMode ? "bg-[#1A202C] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
            {exam.fullName}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {t("subtitle", { year: exam.year })}
          </p>
        </div>

        {/* O/L - A/L toggle */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center p-1 rounded-2xl border ${
              isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-100 border-gray-200"
            }`}
          >
            {(["al", "ol"] as ExamLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleLevelChange(lvl)}
                aria-pressed={level === lvl}
                className={`px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#DD6B20] ${
                  level === lvl
                    ? "bg-[#DD6B20] text-white shadow-md"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {EXAMS[lvl].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
          {/* Info cards */}
          <div className="md:col-span-3 space-y-4">
            <div
              className={`rounded-2xl p-6 border flex items-center gap-4 ${
                isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="w-11 h-11 shrink-0 rounded-xl bg-[#2563EB] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>{t("examPeriod")}</h3>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
                    {exam.year}
                  </span>
                </div>
                <p className={`text-sm mt-0.5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{exam.dateRangeLabel}</p>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 border ${
                isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>{t("officialSource")}</h3>
              </div>
              <a
                href={exam.officialSource}
                target="_blank"
                rel="noreferrer"
                className={`block w-full px-4 py-2.5 rounded-xl text-sm font-medium border truncate ${
                  isDarkMode
                    ? "bg-[#1A202C] border-gray-700 text-[#DD6B20] hover:underline"
                    : "bg-white border-gray-200 text-[#DD6B20] hover:underline"
                }`}
              >
                {exam.officialSource}
              </a>
              <p className={`mt-2 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{t("verifyNote")}</p>
            </div>
          </div>

          {/* Live "days to go" dial - real data instead of stock photos */}
          <div
            className={`md:col-span-2 rounded-2xl border p-6 flex flex-col items-center justify-center text-center ${
              isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div
              className="relative w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(#DD6B20 ${Math.min(((daysLeft ?? 0) / 120) * 360, 360)}deg, ${
                  isDarkMode ? "#1A202C" : "#E2E8F0"
                } 0deg)`,
              }}
            >
              <div
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ${
                  isDarkMode ? "bg-[#2D3748]" : "bg-gray-50"
                }`}
              >
                <span className={`text-3xl font-black tabular-nums ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                  {daysLeft === null ? "…" : daysLeft}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {t("daysToGo")}
                </span>
              </div>
            </div>
            <p className={`mt-4 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              {t("untilLabel", { label: exam.label })}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadState === "loading"}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm bg-gradient-to-r from-[#2563EB] to-[#7C3AED] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-wait"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            {downloadState === "loading"
              ? t("preparing")
              : t("downloadButton", { year: exam.year, label: exam.label })}
          </button>

          {downloadMessage && (
            <p
              className={`text-sm text-center max-w-sm ${
                isDarkMode ? "text-amber-400" : "text-amber-600"
              }`}
              role="status"
            >
              {downloadMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
