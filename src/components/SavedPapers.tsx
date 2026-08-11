"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Bookmark, X } from "lucide-react";
import { ALL_SUBJECTS } from "@/lib/subjects";

interface SavedPaper {
  id: string;
  subject_id: string;
  year: string;
  medium: string;
  doc_type: string;
}

const mediumTagKey: Record<string, string> = {
  sinhala: "tagSinhala",
  english: "tagEnglish",
  tamil: "tagTamil",
};

export default function SavedPapers() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const t = useTranslations("savedPapers");
  const tSubjects = useTranslations("SubjectCard");
  const tDetail = useTranslations("subjectDetail");

  const [items, setItems] = useState<SavedPaper[] | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetch("/api/saved-papers", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success) setItems(data.saved || []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const removeSaved = async (item: SavedPaper) => {
    setRemovingId(item.id);
    try {
      await fetch("/api/saved-papers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: item.subject_id,
          year: item.year,
          medium: item.medium,
          docType: item.doc_type,
        }),
      });
      setItems((prev) => (prev || []).filter((p) => p.id !== item.id));
    } catch {
      // Non-critical - leave the item in place, user can retry.
    } finally {
      setRemovingId(null);
    }
  };

  if (!user) return null;

  return (
    <div
      className={`mt-8 rounded-2xl border p-6 sm:p-8 ${
        isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-5">
        <Bookmark className="text-[#DD6B20]" size={20} />
        <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
          {t("title")}
        </h2>
      </div>

      {!items ? (
        <p className="text-sm opacity-70">{t("loading")}</p>
      ) : items.length === 0 ? (
        <p className="text-sm opacity-70">{t("empty")}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const subjectMeta = ALL_SUBJECTS.find((s) => s.id === item.subject_id);
            const subjectName = subjectMeta
              ? tSubjects(`subjects.${item.subject_id}`)
              : item.subject_id;
            const mediumLabel = mediumTagKey[item.medium]
              ? tDetail(mediumTagKey[item.medium])
              : item.medium;
            const docTypeLabel =
              item.doc_type === "marking" ? tDetail("markingSchemeTab") : tDetail("questionPaperTab");

            return (
              <li
                key={item.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <Link href={`/subject/${item.subject_id}`} className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-bold truncate ${
                      isDarkMode ? "text-white" : "text-[#1A365D]"
                    } hover:text-[#DD6B20]`}
                  >
                    {subjectName}
                  </p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {item.year} &middot; {mediumLabel} &middot; {docTypeLabel}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={() => removeSaved(item)}
                  disabled={removingId === item.id}
                  aria-label={t("removeLabel")}
                  className={`shrink-0 p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                      : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <X size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
