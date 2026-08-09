"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function SubjectDetailPage() {
  const { isDarkMode } = useTheme();
  const { user, openLoginModal } = useAuth();
  const params = useParams();
  const subjectId = params.id as string;

  // i18n Translations Hooks
  const t = useTranslations("subjectDetail");
  const tSubjects = useTranslations("SubjectCard");

  // Available Years List
  const availableYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

  // State for Year Selection, Medium Selection, and Document Type Toggle
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<"sinhala" | "english" | "tamil">("sinhala");
  const [docType, setDocType] = useState<"paper" | "marking">("paper");
  const [showPreview, setShowPreview] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  // Dynamic Subject Name & Level Tag from translations
  const subjectName = subjectId ? tSubjects(`subjects.${subjectId}`) : t("fallbackSubject");
  const levelTag = subjectId?.startsWith("al") ? t("levelTagAl") : t("levelTagOl");

  const mediums = [
    { id: "sinhala", label: "සිංහල මාධ්‍යය", tag: t("tagSinhala") },
    { id: "english", label: "English Medium", tag: t("tagEnglish") },
    { id: "tamil", label: "தமிழ் ஊடகங்கள்", tag: t("tagTamil") },
  ];

  const docTypeLabel = docType === "paper" ? t("questionPaperTab") : t("markingSchemeTab");

  // Files are served through our own /api/paper route (same domain, and it
  // requires the visitor to be logged in) instead of the raw R2 URL.
  const getFileUrl = (action: "view" | "download") => {
    if (!selectedYear) return "#";
    const params = new URLSearchParams({
      subject: subjectId,
      year: selectedYear,
      medium: selectedMedium,
      type: docType,
      action,
    });
    return `/api/paper?${params.toString()}`;
  };

  const requireLogin = (): boolean => {
    if (!user) {
      openLoginModal();
      return true;
    }
    return false;
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-[#171923] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-6 md:px-16">
        
        {/* Back to All Subjects Button */}
        <div className="w-full mb-10">
          <Link
            href="/#subjects-section"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold shadow-sm hover:shadow transition-all duration-200 ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-700 text-white hover:border-[#DD6B20] hover:text-[#DD6B20]"
                : "bg-white border-gray-200 text-[#1A365D] hover:border-[#DD6B20] hover:text-[#DD6B20]"
            }`}
          >
            <span>←</span>
            <span>{t("backToAll")}</span>
          </Link>
        </div>

        {/* Dynamic Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 tracking-wider">
            {levelTag}
          </span>
          <h1 className={`text-4xl md:text-5xl font-extrabold mt-4 ${
            isDarkMode ? "text-white" : "text-[#1A365D]"
          }`}>
            {subjectName}
          </h1>
          <p className={`mt-3 text-base md:text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {!selectedYear
              ? t("step1")
              : t("step2", { year: selectedYear })}
          </p>
        </div>

        {/* STEP 1: Select Examination Year Grid */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className={`text-sm font-bold uppercase tracking-wider text-center mb-4 ${
            isDarkMode ? "text-gray-300" : "text-[#1A365D]"
          }`}>
            {t("selectYearHeading")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setShowPreview(false);
                  setPreviewFailed(false);
                }}
                className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 border ${
                  selectedYear === year
                    ? "bg-[#DD6B20] text-white border-[#DD6B20] shadow-md scale-105"
                    : isDarkMode
                    ? "bg-[#2D3748] text-gray-200 border-gray-700 hover:border-[#DD6B20] hover:shadow-sm"
                    : "bg-white text-[#1A365D] border-gray-200 hover:border-[#DD6B20] hover:shadow-sm"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: Select Medium Switch & Document Type Toggle */}
        {selectedYear ? (
          <div className="animate-fadeIn">
            <h2 className={`text-sm font-bold uppercase tracking-wider text-center mb-4 ${
              isDarkMode ? "text-gray-300" : "text-[#1A365D]"
            }`}>
              {t("selectMediumHeading", { year: selectedYear })}
            </h2>
            <div className={`p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-xl border w-full max-w-xl mx-auto mb-8 ${
              isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-[#1A365D] border-gray-700"
            }`}>
              {mediums.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMedium(m.id as "sinhala" | "english" | "tamil");
                    setShowPreview(false);
                    setPreviewFailed(false);
                  }}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                    selectedMedium === m.id
                      ? "bg-[#DD6B20] text-white shadow-lg scale-[1.02]"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* STEP 3: Paper vs Marking Scheme Toggle Bar */}
            <div className="flex justify-center mb-8">
              <div className={`flex items-center p-1.5 rounded-xl border w-full max-w-md ${
                isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-200 border-gray-300"
              }`}>
                <button
                  onClick={() => {
                    setDocType("paper");
                    setShowPreview(false);
                    setPreviewFailed(false);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
                    docType === "paper"
                      ? "bg-[#DD6B20] text-white shadow-md"
                      : isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {t("questionPaperTab")}
                </button>
                <button
                  onClick={() => {
                    setDocType("marking");
                    setShowPreview(false);
                    setPreviewFailed(false);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
                    docType === "marking"
                      ? "bg-[#DD6B20] text-white shadow-md"
                      : isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {t("markingSchemeTab")}
                </button>
              </div>
            </div>

            {/* Papers Display Box */}
            <div className={`w-full rounded-2xl p-10 border shadow-sm text-center max-w-4xl mx-auto ${
              isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
            }`}>
              <h3 className={`text-2xl font-bold mb-3 ${
                isDarkMode ? "text-white" : "text-[#1A365D]"
              }`}>
                {t("showingFor", { docType: docTypeLabel })}{" "}
                <span className="text-[#DD6B20]">
                  {selectedYear} - {mediums.find((m) => m.id === selectedMedium)?.tag}
                </span>
              </h3>

              <p className={`text-sm md:text-base mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}>
                {t("downloadDesc", {
                  docType: docType === "paper" ? t("docTypePapers") : t("docTypeSchemes"),
                  subject: subjectName,
                  year: selectedYear,
                  medium: selectedMedium.toUpperCase(),
                })}
              </p>

              {/* Download Action Box (R2 Storage Linked) */}
              <div className={`p-6 rounded-xl border max-w-md mx-auto ${
                isDarkMode ? "bg-[#171923] border-gray-700" : "bg-gray-50 border-gray-200"
              }`}>
                <p className="font-semibold text-sm mb-4">
                  {subjectName} {selectedYear} ({selectedMedium.toUpperCase()}) - {docType === "paper" ? "Paper.pdf" : "Marking_Scheme.pdf"}
                </p>

                {/* Preview & Download Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (requireLogin()) return;
                      setPreviewFailed(false);
                      setShowPreview((prev) => !prev);
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md w-full border ${
                      isDarkMode
                        ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20]"
                        : "bg-white border-gray-300 text-[#1A365D] hover:border-[#DD6B20]"
                    }`}
                  >
                    <span>
                      {showPreview
                        ? t("hidePreviewButton")
                        : t("previewButton")}
                    </span>
                  </button>

                  {/* Download Button - served from our own domain via /api/paper */}
                  <a
                    href={getFileUrl("download")}
                    onClick={(e) => {
                      if (requireLogin()) e.preventDefault();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#DD6B20] hover:bg-orange-600 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg w-full"
                  >
                    <span>{t("downloadButton", { docType: docTypeLabel })}</span>
                  </a>
                </div>

                {/* Inline PDF Preview */}
                {showPreview && (
                  <div className="mt-5 text-left">
                    <div
                      className={`w-full rounded-xl overflow-hidden border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      {!previewFailed ? (
                        <iframe
                          key={getFileUrl("view")}
                          src={getFileUrl("view")}
                          title={t("previewButton")}
                          className="w-full h-[70vh] bg-white"
                          onError={() => setPreviewFailed(true)}
                        />
                      ) : (
                        <div
                          className={`w-full py-16 px-6 text-center text-sm ${
                            isDarkMode ? "bg-[#171923] text-gray-400" : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          {t("previewUnavailable")}
                        </div>
                      )}
                    </div>
                    <p className={`mt-2 text-xs text-center ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                      {t("previewNote")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Prompt Box when no Year is selected yet */
          <div className={`w-full rounded-2xl p-10 border border-dashed text-center max-w-4xl mx-auto ${
            isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
          }`}>
            <p className={`text-base font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {t("promptText")}
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}