"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPage");
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
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {t("intro1")}
            </p>
            <p className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("intro2")}{" "}
              <a 
                href="https://www.termsfeed.com/privacy-policy-generator/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 underline hover:opacity-80"
              >
                Privacy Policy Generator
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec1Heading")}
            </h2>
            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("sec1Sub1Heading")}
            </h3>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec1Sub1Text")}
            </p>

            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("sec1Sub2Heading")}
            </h3>
            <p className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec1Sub2Text")}
            </p>
            <ul className={`list-disc pl-6 space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>{t("def1")}</li>
              <li>{t("def2")}</li>
              <li>{t("def3")}</li>
              <li>{t("def4")}</li>
              <li>{t("def5")}</li>
              <li>{t("def6")}</li>
              <li>{t("def7")}</li>
              <li>{t("def8")}</li>
              <li>{t("def9")}</li>
              <li>{t("def10")}</li>
              <li>{t("def11")}</li>
              <li>{t("def12")}</li>
              <li>{t("def13")}</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec2Heading")}
            </h2>
            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("sec2Sub1Heading")}
            </h3>
            <h4 className={`font-medium mt-2 mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              {t("sec2Sub1_1Heading")}
            </h4>
            <p className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec2Sub1_1Text")}
            </p>
            <ul className={`list-disc pl-6 space-y-1 mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>{t("personalData1")}</li>
              <li>{t("personalData2")}</li>
            </ul>

            <h4 className={`font-medium mt-2 mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              {t("sec2Sub1_2Heading")}
            </h4>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec2Sub1_2Text")}
            </p>

            <h4 className={`font-medium mt-2 mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              {t("sec2Sub1_3Heading")}
            </h4>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec2Sub1_3Text")}
            </p>

            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("sec2Sub2Heading")}
            </h3>
            <p className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec2Sub2Text")}
            </p>
            <ul className={`list-disc pl-6 space-y-1 mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>{t("useData1")}</li>
              <li>{t("useData2")}</li>
              <li>{t("useData3")}</li>
              <li>{t("useData4")}</li>
              <li>{t("useData5")}</li>
              <li>{t("useData6")}</li>
            </ul>

            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("sec2Sub3Heading")}
            </h3>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec2Sub3Text")}
            </p>

            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("sec2Sub4Heading")}
            </h3>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec2Sub4Text")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec3Heading")}
            </h2>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec3Text")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec4Heading")}
            </h2>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec4Text")}
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("sec5Heading")}
            </h2>
            <p className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t("sec5Text")}
            </p>
            <ul className={`list-disc pl-6 space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>{t("contactEmail")}</li>
              <li>{t("contactWeb")}</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}