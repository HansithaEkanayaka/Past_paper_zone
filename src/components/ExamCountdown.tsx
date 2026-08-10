"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "use-intl";
import { EXAMS, ExamLevel, ExamDefinition } from "@/lib/examDates";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: "upcoming" | "ongoing" | "done";
}

function getTimeLeft(exam: ExamDefinition): TimeLeft {
  const now = Date.now();

  if (now >= exam.end.getTime()) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "done" };
  }
  if (now >= exam.start.getTime()) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "ongoing" };
  }

  const diff = exam.start.getTime() - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, status: "upcoming" };
}

export default function ExamCountdown() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("countdown");
  const [level, setLevel] = useState<ExamLevel>("ol");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const exam = EXAMS[level];

  useEffect(() => {
    setTimeLeft(getTimeLeft(exam));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(exam)), 1000);
    return () => clearInterval(interval);
  }, [exam]);

  const units: { label: string; value: number }[] = [
    { label: t("days"), value: timeLeft?.days ?? 0 },
    { label: t("hours"), value: timeLeft?.hours ?? 0 },
    { label: t("mins"), value: timeLeft?.minutes ?? 0 },
    { label: t("secs"), value: timeLeft?.seconds ?? 0 },
  ];

  const headline =
    timeLeft?.status === "done"
      ? t("examDone", { year: exam.start.getFullYear(), label: exam.label })
      : timeLeft?.status === "ongoing"
      ? t("examOngoing", { year: exam.start.getFullYear(), label: exam.label })
      : t("countdownTo", { fullName: exam.fullName });

  return (
    <section
      className={`w-full py-8 px-4 md:px-8 transition-colors duration-300 ${
        isDarkMode ? "bg-[#171923]" : "bg-white" // පිටත section එකේ background එක set කිරීම
      }`}
    >
      <div
        className={`max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-3xl border transition-colors duration-300 relative overflow-hidden shadow-xl ${
          isDarkMode
            ? "bg-gradient-to-r from-[#2D3748] to-[#1A202C] border-gray-700 text-white"
            : "bg-gradient-to-r from-[#1A365D] to-[#2B6CB0] border-gray-200 text-white"
        }`}
      >
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#DD6B20]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="text-center lg:text-left space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-[#DD6B20]/15 text-[#DD6B20] px-3.5 py-1.5 rounded-full border border-[#DD6B20]/30 text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#DD6B20] animate-pulse" />
                {t("trackerBadge")}
              </div>
              <h2 className="font-brand text-xl md:text-3xl font-extrabold text-white tracking-tight">
                {headline}
              </h2>
              <p className="text-sm font-medium text-gray-200 flex items-center justify-center lg:justify-start gap-2">
                <svg className="w-4 h-4 text-[#DD6B20]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {exam.dateRangeLabel}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 w-full lg:w-auto">
              <div
                className={`inline-flex items-center p-1 rounded-2xl border backdrop-blur-md shadow-inner ${
                  isDarkMode ? "bg-[#1A202C]/80 border-gray-700" : "bg-black/20 border-white/20"
                }`}
              >
                {(["ol", "al"] as ExamLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    aria-pressed={level === lvl}
                    className={`px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#DD6B20] ${
                      level === lvl
                        ? "bg-[#DD6B20] text-white shadow-lg scale-105"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {EXAMS[lvl].label} Exam
                  </button>
                ))}
              </div>

              {timeLeft?.status === "upcoming" && (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {units.map((unit) => (
                    <div
                      key={unit.label}
                      className={`flex flex-col items-center justify-center rounded-2xl px-3.5 py-3 border backdrop-blur-md shadow-xl transition-transform hover:scale-105 ${
                        isDarkMode 
                          ? "bg-[#1A202C]/90 border-gray-700 text-white" 
                          : "bg-white/10 border-white/20 text-white"
                      }`}
                    >
                      <span className="text-xl sm:text-3xl font-black font-mono tracking-tight text-[#DD6B20] tabular-nums">
                        {unit.value.toString().padStart(2, "0")}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-gray-200 uppercase tracking-wider mt-0.5">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {timeLeft?.status === "ongoing" && (
                <div className="flex items-center gap-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl px-6 py-4 backdrop-blur-md shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-sm font-bold text-emerald-300">{t("ongoingMsg")}</span>
                </div>
              )}

              {timeLeft?.status === "done" && (
                <div className="flex items-center gap-3 bg-blue-500/15 border border-blue-500/30 rounded-2xl px-6 py-4 backdrop-blur-md shadow-lg">
                  <span className="text-sm font-bold text-blue-300">{t("doneMsg")}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}