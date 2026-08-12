"use client";

import { useEffect, useState } from "react";
import { Download, Eye, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";

type TrendingPaper = {
  subjectId: string;
  year: string;
  medium: string;
  docType: string;
  views: number;
  downloads: number;
  score: number;
};

export default function TrendingPapers() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("SubjectCard");
  const [papers, setPapers] = useState<TrendingPaper[]>([]);

  useEffect(() => {
    fetch("/api/trending-papers", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setPapers(data?.papers || []))
      .catch(() => setPapers([]));
  }, []);

  if (!papers.length) return null;

  const mediumLabel = (medium: string) =>
    medium === "sinhala" ? "Sinhala" : medium === "tamil" ? "Tamil" : "English";

  const subjectLabel = (id: string) => {
    try {
      return t(`subjects.${id}`);
    } catch {
      return id;
    }
  };

  return (
    <section
      className={`w-full py-12 px-4 md:px-8 border-y ${
        isDarkMode ? "bg-[#171923] border-gray-800" : "bg-gray-50 border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DD6B20]">
              <TrendingUp size={15} /> Trending this week
            </span>
            <h2 className={`text-2xl md:text-3xl font-extrabold mt-2 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              Most downloaded papers
            </h2>
          </div>
          <Link href="/#subjects-section" className="text-sm font-bold text-[#DD6B20] hover:underline">
            Browse all
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {papers.map((paper) => {
            const level = paper.subjectId.startsWith("al") ? "al" : "ol";
            return (
              <Link
                key={`${paper.subjectId}-${paper.year}-${paper.medium}-${paper.docType}`}
                href={`/papers/${level}/${paper.subjectId}/${paper.year}/${paper.medium}`}
                className={`rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  isDarkMode
                    ? "bg-[#2D3748] border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <div className="text-xs font-bold text-[#DD6B20] uppercase">
                  {paper.docType === "marking" ? "Marking Scheme" : "Question Paper"}
                </div>
                <h3 className="font-extrabold text-lg mt-2 leading-snug">{subjectLabel(paper.subjectId)}</h3>
                <p className="text-sm opacity-70 mt-1">
                  {paper.year} • {mediumLabel(paper.medium)}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs font-semibold opacity-75">
                  <span className="inline-flex items-center gap-1"><Download size={14} /> {paper.downloads}</span>
                  <span className="inline-flex items-center gap-1"><Eye size={14} /> {paper.views}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
