"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import MissingSubjectRequest from "@/components/MissingSubjectRequest";

interface SubjectItem {
  id: string;
  name: string;
  code: string;
  MediumCount: number;
}

export default function SubjectCard() {
  const { isDarkMode } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<"OL" | "AL">("OL");
  const t = useTranslations("SubjectCard");

  const olSubjects: SubjectItem[] = [
    { id: "ol-maths", name: t("subjects.ol-maths"), code: "32", MediumCount: 3 },
    { id: "ol-science", name: t("subjects.ol-science"), code: "34", MediumCount: 3 },
    { id: "ol-sinhala", name: t("subjects.ol-sinhala"), code: "21", MediumCount: 3 },
    { id: "ol-english", name: t("subjects.ol-english"), code: "31", MediumCount: 3 },
    { id: "ol-history", name: t("subjects.ol-history"), code: "33", MediumCount: 3 },
    { id: "ol-buddhism", name: t("subjects.ol-buddhism"), code: "11", MediumCount: 3 },
    { id: "ol-tamil", name: t("subjects.ol-tamil"), code: "22", MediumCount: 3 },
    { id: "ol-geography", name: t("subjects.ol-geography"), code: "61", MediumCount: 3 },
    { id: "ol-civic", name: t("subjects.ol-civic"), code: "62", MediumCount: 3 },
    { id: "ol-music", name: t("subjects.ol-music"), code: "40", MediumCount: 3 },
    { id: "ol-art", name: t("subjects.ol-art"), code: "43", MediumCount: 3 },
    { id: "ol-dancing", name: t("subjects.ol-dancing"), code: "44", MediumCount: 3 },
    { id: "ol-drama", name: t("subjects.ol-drama"), code: "50", MediumCount: 3 },
    { id: "ol-ict", name: t("subjects.ol-ict"), code: "80", MediumCount: 3 },
    { id: "ol-agriculture", name: t("subjects.ol-agriculture"), code: "81", MediumCount: 3 },
    { id: "ol-health", name: t("subjects.ol-health"), code: "86", MediumCount: 3 },
  ];

  const alSubjects: SubjectItem[] = [
    { id: "al-combined-maths", name: t("subjects.al-combined-maths"), code: "10", MediumCount: 3 },
    { id: "al-physics", name: t("subjects.al-physics"), code: "01", MediumCount: 3 },
    { id: "al-chemistry", name: t("subjects.al-chemistry"), code: "02", MediumCount: 3 },
    { id: "al-biology", name: t("subjects.al-biology"), code: "09", MediumCount: 3 },
    { id: "al-ict", name: t("subjects.al-ict"), code: "20", MediumCount: 3 },
    { id: "al-accounting", name: t("subjects.al-accounting"), code: "33", MediumCount: 3 },
    { id: "al-business", name: t("subjects.al-business"), code: "32", MediumCount: 3 },
    { id: "al-econ", name: t("subjects.al-econ"), code: "21", MediumCount: 3 },
    { id: "al-agro", name: t("subjects.al-agro"), code: "18", MediumCount: 3 },
    { id: "al-et", name: t("subjects.al-et"), code: "65", MediumCount: 3 },
    { id: "al-bst", name: t("subjects.al-bst"), code: "66", MediumCount: 3 },
    { id: "al-sft", name: t("subjects.al-sft"), code: "67", MediumCount: 3 },
  ];

  const activeSubjects = selectedLevel === "OL" ? olSubjects : alSubjects;

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

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {activeSubjects.map((subject) => (
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

        {/* Missing Subject / Paper Request Banner & Modal */}
        <div className="w-full mt-12">
          <MissingSubjectRequest />
        </div>

      </div>
    </section>
  );
}