"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

export default function About() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("about");

  const rawOfferItems = t.raw("offerItems");
  const offerList: string[] = Array.isArray(rawOfferItems) ? rawOfferItems : [];

  return (
    <section id="about" className={`w-full py-16 px-6 md:px-16 border-b transition-colors duration-300 ${
      isDarkMode ? "bg-[#1A202C] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className={`rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between ${
            isDarkMode ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20]" : "bg-gray-50 border-gray-200 hover:border-[#DD6B20]"
          }`}>
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {t("missionTitle")}
              </h3>
              <p className={`leading-relaxed text-sm md:text-base space-y-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                <span>
                  {t("missionP1")}
                </span>
                <br /><br />
                <span>
                  {t("missionP2")}
                </span>
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`rounded-2xl p-8 border transition-all duration-300 ${
            isDarkMode ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20]" : "bg-gray-50 border-gray-200 hover:border-[#DD6B20]"
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("offerTitle")}
            </h3>
            <ul className="space-y-3">
              {offerList.map((item, index) => (
                <li key={index} className={`flex items-start gap-3 text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="text-[#DD6B20] font-bold mt-0.5">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className={`rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between ${
            isDarkMode ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20]" : "bg-gray-50 border-gray-200 hover:border-[#DD6B20]"
          }`}>
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {t("policyTitle")}
              </h3>
              <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {t("policyBefore")}{" "}
                <Link href="/contact" className="text-[#DD6B20] font-semibold hover:underline">
                  {t("policyLink")}
                </Link>{" "}
                {t("policyAfter")}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className={`rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between ${
            isDarkMode ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20]" : "bg-gray-50 border-gray-200 hover:border-[#DD6B20]"
          }`}>
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {t("freeTitle")}
              </h3>
              <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {t("freeText")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}