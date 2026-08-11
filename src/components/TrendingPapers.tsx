"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import { TrendingUp, Eye } from "lucide-react";
import { ALL_SUBJECTS } from "@/lib/subjects";

interface TrendingItem {
  subjectId: string;
  year: string;
  medium: string;
  count: number;
}

const mediumTagKey: Record<string, string> = {
  sinhala: "tagSinhala",
  english: "tagEnglish",
  tamil: "tagTamil",
};

export default function TrendingPapers() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("trending");
  const tSubjects = useTranslations("SubjectCard");
  const tDetail = useTranslations("subjectDetail");

  const [items, setItems] = useState<TrendingItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/trending", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success) setItems(data.trending || []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing yet (analytics table just created, or genuinely quiet week) -
  // hide the whole section rather than show an awkward empty state.
  if (items && items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-[#DD6B20]" size={22} />
        <h2
          className={`text-xl sm:text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-[#1A365D]"
          }`}
        >
          {t("title")}
        </h2>
      </div>

      {!items ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-24 rounded-xl animate-pulse ${
                isDarkMode ? "bg-[#2D3748]" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item) => {
            const subjectMeta = ALL_SUBJECTS.find((s) => s.id === item.subjectId);
            const subjectName = subjectMeta
              ? tSubjects(`subjects.${item.subjectId}`)
              : item.subjectId;
            const mediumLabel = mediumTagKey[item.medium]
              ? tDetail(mediumTagKey[item.medium])
              : item.medium;

            return (
              <Link
                key={`${item.subjectId}-${item.year}-${item.medium}`}
                href={`/subject/${item.subjectId}`}
                className={`group rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${
                  isDarkMode
                    ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20]"
                    : "bg-white border-gray-200 hover:border-[#DD6B20]"
                }`}
              >
                <p
                  className={`text-sm font-bold truncate ${
                    isDarkMode ? "text-white" : "text-[#1A365D]"
                  } group-hover:text-[#DD6B20]`}
                >
                  {subjectName}
                </p>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {item.year} &middot; {mediumLabel}
                </p>
                <div
                  className={`flex items-center gap-1 mt-3 text-xs font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Eye size={13} />
                  <span>{t("viewCount", { count: item.count })}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
