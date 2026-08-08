"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

interface StudyTip {
  number: string;
  title: string;
  description: string;
}

export default function StudyTipCard() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("studyTips");

  const rawTips = t.raw("tips");
  const tips: StudyTip[] = (rawTips && typeof rawTips === "object" && !Array.isArray(rawTips))
    ? Object.entries(rawTips as Record<string, { title: string; description: string }>).map(([number, tip]) => ({
        number,
        title: tip?.title || "",
        description: tip?.description || "",
      }))
    : [];

  return (
    <section id="study-tips" className={`w-full py-16 px-6 md:px-16 border-b transition-colors duration-300 ${
      isDarkMode ? "bg-[#171923] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.number}
              className={`rounded-2xl p-8 border transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden ${
                isDarkMode 
                  ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20] hover:shadow-2xl" 
                  : "bg-gray-50 border-gray-200 hover:border-[#DD6B20] hover:shadow-xl"
              }`}
            >
              <span className="text-3xl font-extrabold text-[#DD6B20] tracking-widest mb-3">
                {tip.number}
              </span>

              <h3 className={`text-xl font-bold mb-3 transition-colors ${
                isDarkMode ? "text-white group-hover:text-[#DD6B20]" : "text-[#1A365D] group-hover:text-[#DD6B20]"
              }`}>
                {tip.title}
              </h3>

              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}