"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

interface HeroProps {
  totalPapers?: number;
  totalSubjects?: number;
}

export default function Hero({ totalPapers: initialPapers, totalSubjects: initialSubjects }: HeroProps) {
  const { isDarkMode } = useTheme();
  const t = useTranslations("hero");

  // Dynamic stats state
  const [stats, setStats] = useState({
    papersCount: initialPapers ?? 0,
    subjectsCount: initialSubjects ?? 15,
  });
  const [loading, setLoading] = useState(!initialPapers);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setStats({
            papersCount: data.papersCount,
            subjectsCount: data.subjectsCount,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dynamic stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const gridImages = [
    { id: 1, src: "/banner1.png", alt: "Banner 1", bg: "bg-[#9FB0C3]" },
    { id: 2, src: "/banner2.png", alt: "Banner 2", bg: "bg-[#7285A5]" },
    { id: 3, src: "/banner3.png", alt: "Banner 3", bg: "bg-[#FBCFE8]" },
    { id: 4, src: "/banner4.png", alt: "Banner 4", bg: "bg-[#86EFAC]" },
    { id: 5, src: "/banner5.png", alt: "Banner 5", bg: "bg-[#FEF08A]" },
    { id: 6, src: "/banner6.png", alt: "Banner 6", bg: "bg-[#FECDD3]" },
    { id: 7, src: "/banner7.png", alt: "Banner 7", bg: "bg-[#EA580C]" },
    { id: 8, src: "/banner8.png", alt: "Banner 8", bg: "bg-[#115E59]" },
    { id: 9, src: "/banner9.png", alt: "Banner 9", bg: "bg-[#2563EB]" },
    { id: 10, src: "/banner10.png", alt: "Banner 10", bg: "bg-[#0D9488]" },
    { id: 11, src: "/banner11.png", alt: "Banner 11", bg: "bg-[#4B5563]" },
    { id: 12, src: "/banner12.png", alt: "Banner 12", bg: "bg-[#991B1B]" },
    { id: 13, src: "/banner13.png", alt: "Banner 13", bg: "bg-[#FDBA74]" },
    { id: 14, src: "/banner14.png", alt: "Banner 14", bg: "bg-[#C084FC]" },
    { id: 15, src: "/banner15.png", alt: "Banner 15", bg: "bg-[#881337]" },
  ];

  return (
    <section className={`w-full py-12 px-6 md:px-16 border-b transition-colors duration-300 ${
      isDarkMode ? "bg-[#1A202C] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Section */}
        <div className="flex flex-col items-start space-y-6">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
            isDarkMode ? "text-white" : "text-[#1A365D]"
          }`}>
            {t("titlePrefix")}<span className="text-[#DD6B20]">{t("titleSuffix")}</span>
          </h1>
          
          <p className={`text-lg md:text-xl leading-relaxed max-w-xl ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {t("description")}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/#subjects-section"
              className="inline-block text-center bg-[#DD6B20] hover:bg-[#c05621] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              {t("explorePapers")}
            </Link>

            <Link
              href="/#about"
              className={`inline-block text-center border-2 font-bold text-base px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 ${
                isDarkMode 
                  ? "border-white text-white hover:bg-white hover:text-gray-900" 
                  : "border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white"
              }`}
            >
              {t("aboutUs")}
            </Link>
          </div>

          {/* Dynamic Stats Section */}
          <dl className={`mt-6 grid grid-cols-3 w-full max-w-sm gap-6 border-t pt-6 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            {/* Past Papers Count */}
            <div>
              <dt className="sr-only">{t("pastPapers")}</dt>
              <dd className={`font-display text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {loading ? "..." : `${stats.papersCount}+`}
              </dd>
              <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("pastPapers")}
              </p>
            </div>

            {/* Subjects Count */}
            <div>
              <dt className="sr-only">{t("subjects")}</dt>
              <dd className={`font-display text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {loading ? "..." : stats.subjectsCount}
              </dd>
              <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("subjects")}
              </p>
            </div>

            {/* Mediums Count (Static - Fixed 3) */}
            <div>
              <dt className="sr-only">{t("mediums")}</dt>
              <dd className={`font-display text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                3
              </dd>
              <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("mediums")}
              </p>
            </div>
          </dl>
        </div>

        {/* Right Section - Grid Images */}
        <div className={`w-full h-[380px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg border grid grid-cols-3 grid-rows-5 sm:grid-cols-4 sm:grid-rows-4 md:grid-cols-5 md:grid-rows-3 gap-2.5 p-3 ${
          isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-[#F1F5F9] border-gray-200"
        }`}>
          {gridImages.map((item) => (
            <div
              key={item.id}
              className={`${item.bg} rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.03] transition-transform duration-200 w-full h-full`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 20vw, 10vw"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}