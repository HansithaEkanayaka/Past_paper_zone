"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

export default function TermsOfServicePage() {
  const t = useTranslations("termsPage");
  const { isDarkMode } = useTheme();

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

        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec1Heading")}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {t("sec1Text")}{" "}
              <a href="https://pastpaperzone.lk" className="text-blue-500 underline">
                https://pastpaperzone.lk
              </a>
              . {t("sec1Text2")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec2Heading")}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {t("sec2Text")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec3Heading")}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {t("sec3Text")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec4Heading")}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {t("sec4Text")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec5Heading")}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {t("sec5Text")}{" "}
              <a href="mailto:pastpaperzone@gmail.com" className="text-blue-500 underline">
                pastpaperzone@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}