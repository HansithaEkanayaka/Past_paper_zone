"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";

export default function BackToTopButton() {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("backToTop");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("label")}
      className={`fixed bottom-5 right-4 sm:right-6 z-50 p-3 rounded-full shadow-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DD6B20] hover:-translate-y-1 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      } ${
        isDarkMode
          ? "bg-[#2D3748] border-gray-700 text-white hover:bg-[#DD6B20] hover:border-[#DD6B20]"
          : "bg-white border-gray-200 text-[#1A365D] hover:bg-[#DD6B20] hover:text-white hover:border-[#DD6B20]"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
