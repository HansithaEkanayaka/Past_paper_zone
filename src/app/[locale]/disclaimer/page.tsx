"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

export default function DisclaimerPage() {
  const t = useTranslations("disclaimerPage");
  const { isDarkMode } = useTheme();

  const sections = [1, 2, 3, 4, 5] as const;

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#171923] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto py-16 px-6">
        <h1
          className={`text-3xl md:text-4xl font-extrabold mb-2 ${
            isDarkMode ? "text-white" : "text-[#1A365D]"
          }`}
        >
          {t("title")}
        </h1>
        <p className={`text-sm mb-10 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {t("lastUpdated")}
        </p>

        <div className="space-y-8">
          {sections.map((n) => (
            <section key={n}>
              <h2
                className={`text-lg font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-[#1A365D]"
                }`}
              >
                {t(`p${n}Heading`)}
              </h2>
              <p
                className={`text-sm md:text-base leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t(`p${n}`)}
              </p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
