"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import MissingSubjectRequest from "@/components/MissingSubjectRequest";
import { OL_SUBJECTS, AL_SUBJECTS, type OLCategory, type ALStream } from "@/lib/subjects";

interface SubjectItem {
  id: string;
  name: string;
  code: string;
  MediumCount: number;
}

interface SubjectGroup {
  label: string;
  items: SubjectItem[];
}

// Display order for each level's groups.
const OL_CATEGORY_ORDER: OLCategory[] = ["main", "category1", "category2", "category3"];
const AL_STREAM_ORDER: ALStream[] = ["science", "tech", "art"];

export default function SubjectCard() {
  const { isDarkMode } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<"OL" | "AL">("OL");
  const t = useTranslations("SubjectCard");

  const toItem = (subjectId: string, code: string): SubjectItem => ({
    id: subjectId,
    name: t(`subjects.${subjectId}`),
    code,
    MediumCount: 3,
  });

  // O/L subjects grouped: main subjects first, then category 1, 2, 3.
  const olGroups: SubjectGroup[] = OL_CATEGORY_ORDER.map((category) => ({
    label: t(`olCategory.${category}`),
    items: OL_SUBJECTS.filter((s) => s.olCategory === category).map((s) => toItem(s.id, s.code)),
  })).filter((group) => group.items.length > 0);

  // A/L subjects grouped by stream: science, tech, art.
  const alGroups: SubjectGroup[] = AL_STREAM_ORDER.map((stream) => ({
    label: t(`alStream.${stream}`),
    items: AL_SUBJECTS.filter((s) => s.alStream === stream).map((s) => toItem(s.id, s.code)),
  })).filter((group) => group.items.length > 0);

  const activeGroups = selectedLevel === "OL" ? olGroups : alGroups;

  return (
    <section id="subjects-section" className={`w-full py-12 px-6 md:px-16 transition-colors duration-300 ${
      isDarkMode ? "bg-[#171923] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 uppercase tracking-wider mb-4">
          {t("badge")}
        </span>

        <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 ${
          isDarkMode ? "text-white" : "text-[#1A365D]"
        }`}>
          {t("selectLevelHeading")}
        </h2>

        {/* O/L - A/L Toggle Container */}
        <div className={`flex items-center p-1.5 rounded-xl border w-full max-w-md mb-12 transition-all duration-300 ${
          isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-200 border-gray-300"
        }`}>
          <button
            onClick={() => setSelectedLevel("OL")}
            className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm md:text-base transition-all duration-200 ${
              selectedLevel === "OL"
                ? "bg-[#DD6B20] text-white shadow-md"
                : isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            {t("olTab")}
          </button>

          <button
            onClick={() => setSelectedLevel("AL")}
            className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm md:text-base transition-all duration-200 ${
              selectedLevel === "AL"
                ? "bg-[#DD6B20] text-white shadow-md"
                : isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            {t("alTab")}
          </button>
        </div>

        <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 transition-all duration-300 ${
          isDarkMode ? "text-white" : "text-[#1A365D]"
        }`}>
          {selectedLevel === "OL"
            ? t("olHeading")
            : t("alHeading")}
        </h2>

        {/* Subjects, grouped into sections (main/category baskets for O/L, streams for A/L) */}
        <div className="w-full space-y-10">
          {activeGroups.map((group) => (
            <div key={group.label}>
              <h3 className={`text-lg md:text-xl font-extrabold mb-4 pb-2 border-b ${
                isDarkMode ? "text-white border-gray-700" : "text-[#1A365D] border-gray-200"
              }`}>
                {group.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {group.items.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/subject/${subject.id}`}
                    className={`rounded-2xl p-6 border transition-all duration-200 group flex flex-col justify-between ${
                      isDarkMode
                        ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20] hover:shadow-2xl text-white"
                        : "bg-white border-gray-200 hover:border-[#DD6B20] hover:shadow-xl text-gray-900"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
                          {t("codeLabel", { code: subject.code })}
                        </span>
                        <span className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {selectedLevel === "OL" ? t("olTag") : t("alTag")}
                        </span>
                      </div>

                      <h3 className={`text-xl font-bold transition-colors mb-2 ${
                        isDarkMode ? "text-white group-hover:text-[#DD6B20]" : "text-[#1A365D] group-hover:text-[#DD6B20]"
                      }`}>
                        {subject.name}
                      </h3>
                    </div>

                    <div className={`flex items-center justify-between pt-4 border-t mt-4 text-sm font-medium ${
                      isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-100 text-gray-600"
                    }`}>
                      <span>{t("mediumAvailable", { count: subject.MediumCount })}</span>
                      <span className="text-[#DD6B20] group-hover:translate-x-1 transition-transform">
                        {t("viewLink")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Missing Subject / Paper Request Banner & Modal */}
        <div className="w-full mt-12">
          <MissingSubjectRequest />
        </div>

      </div>
    </section>
  );
}