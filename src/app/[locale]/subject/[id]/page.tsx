"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import {
  Share2,
  Flag,
  X,
  Check,
} from "lucide-react";

export default function SubjectDetailPage() {
  const { isDarkMode } = useTheme();
  const { user, openLoginModal } = useAuth();
  const params = useParams();
  const subjectId = params.id as string;

  const t = useTranslations("subjectDetail");
  const tSubjects = useTranslations("SubjectCard");

  const availableYears = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ];

  const [selectedYear, setSelectedYear] = useState<string | null>(
    null
  );

  const [selectedMedium, setSelectedMedium] = useState<
    "sinhala" | "english" | "tamil"
  >("sinhala");

  const [docType, setDocType] = useState<"paper" | "marking">(
    "paper"
  );

  const [showPreview, setShowPreview] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  // Report modal state
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] =
    useState("PDF doesn't open");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSending, setReportSending] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  // Share message
  const [shareMessage, setShareMessage] = useState("");

  // =========================================================
  // BODY SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (!showReport) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      return;
    }

    const originalBodyOverflow =
      document.body.style.overflow;

    const originalHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalBodyOverflow;

      document.documentElement.style.overflow =
        originalHtmlOverflow;
    };
  }, [showReport]);

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    if (!showReport) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeReportModal();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showReport, reportSending]);

  // =========================================================
  // SUBJECT NAME
  // =========================================================

  const subjectName = subjectId
    ? tSubjects(`subjects.${subjectId}`)
    : t("fallbackSubject");

  // =========================================================
  // LEVEL TAG
  // =========================================================

  const levelTag = subjectId?.startsWith("al")
    ? t("levelTagAl")
    : t("levelTagOl");

  // =========================================================
  // MEDIUMS
  // =========================================================

  const mediums = [
    {
      id: "sinhala",
      label: "සිංහල මාධ්‍යය",
      tag: t("tagSinhala"),
    },
    {
      id: "english",
      label: "English Medium",
      tag: t("tagEnglish"),
    },
    {
      id: "tamil",
      label: "தமிழ் ஊடகங்கள்",
      tag: t("tagTamil"),
    },
  ];

  // =========================================================
  // DOCUMENT TYPE LABEL
  // =========================================================

  const docTypeLabel =
    docType === "paper"
      ? t("questionPaperTab")
      : t("markingSchemeTab");

  // =========================================================
  // FILE URL
  // =========================================================

  const getFileUrl = (
    action: "view" | "download"
  ) => {
    if (!selectedYear) return "#";

    const queryParams = new URLSearchParams({
      subject: subjectId,
      year: selectedYear,
      medium: selectedMedium,
      type: docType,
      action,
    });

    return `/api/paper?${queryParams.toString()}`;
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const requireLogin = (): boolean => {
    if (!user) {
      openLoginModal();
      return true;
    }

    return false;
  };

  // =========================================================
  // SHARE PAPER
  // =========================================================

  const sharePaper = async () => {
    if (!selectedYear) return;

    const shareUrl = window.location.href;

    const shareTitle =
      `${subjectName} ${selectedYear} - ${docTypeLabel}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareTitle,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(
          shareUrl
        );

        setShareMessage("Link copied!");

        window.setTimeout(() => {
          setShareMessage("");
        }, 1800);
      }
    } catch {
      // User cancelled share.
    }
  };

  // =========================================================
  // OPEN REPORT MODAL
  // =========================================================

  const openReportModal = () => {
    setReportSent(false);
    setReportSending(false);
    setShowReport(true);
  };

  // =========================================================
  // CLOSE REPORT MODAL
  // =========================================================

  const closeReportModal = () => {
    if (reportSending) return;

    setShowReport(false);
    setReportSent(false);
    setReportDetails("");
  };

  // =========================================================
  // SUBMIT REPORT
  // =========================================================

  const submitReport = async () => {
    if (!selectedYear || reportSending) return;

    setReportSending(true);

    try {
      const res = await fetch(
        "/api/report-paper",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subjectId,
            year: selectedYear,
            medium: selectedMedium,
            docType,
            reason: reportReason,
            details: reportDetails,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Report failed");
      }

      setReportSent(true);
      setReportDetails("");
    } catch {
      setShareMessage(
        "Could not submit report. Please try again."
      );

      window.setTimeout(() => {
        setShareMessage("");
      }, 2500);
    } finally {
      setReportSending(false);
    }
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <>
      <div
        className={`
          flex
          flex-col
          min-h-screen
          transition-colors
          duration-300
          ${
            isDarkMode
              ? "bg-[#171923] text-white"
              : "bg-gray-50 text-gray-900"
          }
        `}
      >
        <Header />

        <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-6 md:px-16">

          {/* BACK BUTTON */}

          <div className="w-full mb-10">
            <Link
              href="/#subjects-section"
              className={`
                inline-flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-full
                border
                text-sm
                font-bold
                shadow-sm
                hover:shadow
                transition-all
                duration-200
                ${
                  isDarkMode
                    ? "bg-[#2D3748] border-gray-700 text-white hover:border-[#DD6B20] hover:text-[#DD6B20]"
                    : "bg-white border-gray-200 text-[#1A365D] hover:border-[#DD6B20] hover:text-[#DD6B20]"
                }
              `}
            >
              <span>←</span>

              <span>
                {t("backToAll")}
              </span>
            </Link>
          </div>

          {/* SUBJECT TITLE */}

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span
              className="
                text-xs
                font-bold
                text-[#DD6B20]
                bg-orange-500/10
                px-4
                py-1.5
                rounded-full
                border
                border-orange-500/30
                tracking-wider
              "
            >
              {levelTag}
            </span>

            <h1
              className={`
                text-4xl
                md:text-5xl
                font-extrabold
                mt-4
                ${
                  isDarkMode
                    ? "text-white"
                    : "text-[#1A365D]"
                }
              `}
            >
              {subjectName}
            </h1>

            <p
              className={`
                mt-3
                text-base
                md:text-lg
                ${
                  isDarkMode
                    ? "text-gray-300"
                    : "text-gray-600"
                }
              `}
            >
              {!selectedYear
                ? t("step1")
                : t("step2", {
                    year: selectedYear,
                  })}
            </p>
          </div>

          {/* STEP 1 - YEAR */}

          <div className="mb-12 max-w-4xl mx-auto">
            <h2
              className={`
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-center
                mb-4
                ${
                  isDarkMode
                    ? "text-gray-300"
                    : "text-[#1A365D]"
                }
              `}
            >
              {t("selectYearHeading")}
            </h2>

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-6
                gap-3
              "
            >
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setShowPreview(false);
                    setPreviewFailed(false);
                  }}
                  className={`
                    py-3
                    px-4
                    rounded-xl
                    font-bold
                    text-sm
                    transition-all
                    duration-200
                    border
                    ${
                      selectedYear === year
                        ? "bg-[#DD6B20] text-white border-[#DD6B20] shadow-md scale-105"
                        : isDarkMode
                        ? "bg-[#2D3748] text-gray-200 border-gray-700 hover:border-[#DD6B20] hover:shadow-sm"
                        : "bg-white text-[#1A365D] border-gray-200 hover:border-[#DD6B20] hover:shadow-sm"
                    }
                  `}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* YEAR SELECTED */}

          {selectedYear ? (
            <div className="animate-fadeIn">

              {/* MEDIUM HEADING */}

              <h2
                className={`
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider
                  text-center
                  mb-4
                  ${
                    isDarkMode
                      ? "text-gray-300"
                      : "text-[#1A365D]"
                  }
                `}
              >
                {t(
                  "selectMediumHeading",
                  {
                    year: selectedYear,
                  }
                )}
              </h2>

              {/* MEDIUM SELECTOR */}

              <div
                className={`
                  p-2
                  rounded-2xl
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  gap-2
                  shadow-xl
                  border
                  w-full
                  max-w-xl
                  mx-auto
                  mb-8
                  ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700"
                      : "bg-[#1A365D] border-gray-700"
                  }
                `}
              >
                {mediums.map((medium) => (
                  <button
                    key={medium.id}
                    onClick={() => {
                      setSelectedMedium(
                        medium.id as
                          | "sinhala"
                          | "english"
                          | "tamil"
                      );

                      setShowPreview(false);
                      setPreviewFailed(false);
                    }}
                    className={`
                      w-full
                      py-3.5
                      px-6
                      rounded-xl
                      font-bold
                      text-sm
                      md:text-base
                      transition-all
                      duration-300
                      ${
                        selectedMedium ===
                        medium.id
                          ? "bg-[#DD6B20] text-white shadow-lg scale-[1.02]"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {medium.label}
                  </button>
                ))}
              </div>

              {/* PAPER / MARKING TOGGLE */}

              <div className="flex justify-center mb-8">
                <div
                  className={`
                    flex
                    items-center
                    p-1.5
                    rounded-xl
                    border
                    w-full
                    max-w-md
                    ${
                      isDarkMode
                        ? "bg-[#2D3748] border-gray-700"
                        : "bg-gray-200 border-gray-300"
                    }
                  `}
                >
                  <button
                    onClick={() => {
                      setDocType("paper");
                      setShowPreview(false);
                      setPreviewFailed(false);
                    }}
                    className={`
                      flex-1
                      py-2.5
                      px-4
                      rounded-lg
                      font-bold
                      text-sm
                      transition-all
                      duration-200
                      ${
                        docType === "paper"
                          ? "bg-[#DD6B20] text-white shadow-md"
                          : isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }
                    `}
                  >
                    {t("questionPaperTab")}
                  </button>

                  <button
                    onClick={() => {
                      setDocType("marking");
                      setShowPreview(false);
                      setPreviewFailed(false);
                    }}
                    className={`
                      flex-1
                      py-2.5
                      px-4
                      rounded-lg
                      font-bold
                      text-sm
                      transition-all
                      duration-200
                      ${
                        docType === "marking"
                          ? "bg-[#DD6B20] text-white shadow-md"
                          : isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }
                    `}
                  >
                    {t("markingSchemeTab")}
                  </button>
                </div>
              </div>

              {/* PAPER DISPLAY BOX */}

              <div
                className={`
                  w-full
                  rounded-2xl
                  p-10
                  border
                  shadow-sm
                  text-center
                  max-w-4xl
                  mx-auto
                  ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700"
                      : "bg-white border-gray-200"
                  }
                `}
              >
                <h3
                  className={`
                    text-2xl
                    font-bold
                    mb-3
                    ${
                      isDarkMode
                        ? "text-white"
                        : "text-[#1A365D]"
                    }
                  `}
                >
                  {t("showingFor", {
                    docType: docTypeLabel,
                  })}{" "}
                  <span className="text-[#DD6B20]">
                    {selectedYear} -{" "}
                    {
                      mediums.find(
                        (medium) =>
                          medium.id ===
                          selectedMedium
                      )?.tag
                    }
                  </span>
                </h3>

                <p
                  className={`
                    text-sm
                    md:text-base
                    mb-6
                    ${
                      isDarkMode
                        ? "text-gray-300"
                        : "text-gray-500"
                    }
                  `}
                >
                  {t("downloadDesc", {
                    docType:
                      docType === "paper"
                        ? t("docTypePapers")
                        : t("docTypeSchemes"),
                    subject: subjectName,
                    year: selectedYear,
                    medium:
                      selectedMedium.toUpperCase(),
                  })}
                </p>

                {/* ACTION BOX */}

                <div
                  className={`
                    p-6
                    rounded-xl
                    border
                    max-w-md
                    mx-auto
                    ${
                      isDarkMode
                        ? "bg-[#171923] border-gray-700"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >
                  <p className="font-semibold text-sm mb-4">
                    {subjectName}{" "}
                    {selectedYear} (
                    {selectedMedium.toUpperCase()}){" "}
                    -{" "}
                    {docType === "paper"
                      ? "Paper.pdf"
                      : "Marking_Scheme.pdf"}
                  </p>

                  {/* PREVIEW + DOWNLOAD */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-3
                    "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (requireLogin())
                          return;

                        setPreviewFailed(false);

                        setShowPreview(
                          (previous) =>
                            !previous
                        );
                      }}
                      className={`
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-6
                        py-3
                        rounded-xl
                        font-bold
                        text-sm
                        transition-all
                        duration-200
                        shadow-sm
                        hover:shadow-md
                        w-full
                        border
                        ${
                          isDarkMode
                            ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20]"
                            : "bg-white border-gray-300 text-[#1A365D] hover:border-[#DD6B20]"
                        }
                      `}
                    >
                      <span>
                        {showPreview
                          ? t("hidePreviewButton")
                          : t("previewButton")}
                      </span>
                    </button>

                    <a
                      href={getFileUrl("download")}
                      onClick={(event) => {
                        if (requireLogin()) {
                          event.preventDefault();
                        }
                      }}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-6
                        py-3
                        rounded-xl
                        bg-[#DD6B20]
                        hover:bg-orange-600
                        text-white
                        font-bold
                        text-sm
                        transition-all
                        duration-200
                        shadow-md
                        hover:shadow-lg
                        w-full
                      "
                    >
                      <span>
                        {t("downloadButton", {
                          docType: docTypeLabel,
                        })}
                      </span>
                    </a>
                  </div>

                  {/* SHARE + REPORT */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-3
                      mt-4
                    "
                  >
                    <Link
                      href={`/papers/${subjectId.startsWith("al") ? "al" : "ol"}/${subjectId}/${selectedYear}/${selectedMedium}`}
                      className={`
                        flex-1
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        border
                        font-bold
                        text-sm
                        transition-all
                        ${
                          isDarkMode
                            ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20] hover:text-[#DD6B20]"
                            : "bg-white border-gray-300 text-[#1A365D] hover:border-[#DD6B20] hover:text-[#DD6B20]"
                        }
                      `}
                    >
                      Open Paper Page
                    </Link>

                    <button
                      type="button"
                      onClick={sharePaper}
                      className={`
                        flex-1
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        border
                        font-bold
                        text-sm
                        transition-all
                        ${
                          isDarkMode
                            ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20] hover:text-[#DD6B20]"
                            : "bg-white border-gray-300 text-[#1A365D] hover:border-[#DD6B20] hover:text-[#DD6B20]"
                        }
                      `}
                    >
                      <Share2 size={17} />
                      Share Paper
                    </button>

                    <button
                      type="button"
                      onClick={openReportModal}
                      className={`
                        flex-1
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        border
                        font-bold
                        text-sm
                        transition-all
                        ${
                          isDarkMode
                            ? "bg-[#2D3748] border-gray-600 text-gray-200 hover:border-red-400 hover:text-red-300"
                            : "bg-white border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500"
                        }
                      `}
                    >
                      <Flag size={17} />
                      Report a problem
                    </button>
                  </div>

                  {/* SHARE MESSAGE */}

                  {shareMessage && (
                    <p className="mt-2 text-xs font-semibold text-[#DD6B20]">
                      {shareMessage}
                    </p>
                  )}

                  {/* PDF PREVIEW */}

                  {showPreview && (
                    <div className="mt-5 text-left">
                      <div
                        className={`
                          w-full
                          rounded-xl
                          overflow-hidden
                          border
                          ${
                            isDarkMode
                              ? "border-gray-700"
                              : "border-gray-200"
                          }
                        `}
                      >
                        {!previewFailed ? (
                          <iframe
                            key={getFileUrl("view")}
                            src={getFileUrl("view")}
                            title={t("previewButton")}
                            className="
                              w-full
                              h-[70vh]
                              bg-white
                            "
                            onError={() =>
                              setPreviewFailed(true)
                            }
                          />
                        ) : (
                          <div
                            className={`
                              w-full
                              py-16
                              px-6
                              text-center
                              text-sm
                              ${
                                isDarkMode
                                  ? "bg-[#171923] text-gray-400"
                                  : "bg-gray-50 text-gray-500"
                              }
                            `}
                          >
                            {t("previewUnavailable")}
                          </div>
                        )}
                      </div>

                      <p
                        className={`
                          mt-2
                          text-xs
                          text-center
                          ${
                            isDarkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {t("previewNote")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* NO YEAR SELECTED */

            <div
              className={`
                w-full
                rounded-2xl
                p-10
                border
                border-dashed
                text-center
                max-w-4xl
                mx-auto
                ${
                  isDarkMode
                    ? "bg-[#2D3748] border-gray-700"
                    : "bg-white border-gray-200"
                }
              `}
            >
              <p
                className={`
                  text-base
                  font-medium
                  ${
                    isDarkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                `}
              >
                {t("promptText")}
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* =====================================================
          REPORT MODAL
          ===================================================== */}

      {showReport && (
        <>
          {/* OVERLAY */}

          <div
            className="
              fixed
              inset-0
              z-[9998]
              bg-black/70
              backdrop-blur-md
              supports-[backdrop-filter]:backdrop-saturate-75
            "
            aria-hidden="true"
            onClick={closeReportModal}
          />

          {/* VIEWPORT CONTAINER */}

          <div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              w-full
              h-[100dvh]
              px-3
              py-3
              sm:px-6
              sm:py-6
              pointer-events-none
              overflow-hidden
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            {/* MODAL CARD */}

            <div
              className={`
                relative
                pointer-events-auto
                w-full
                max-w-md
                max-h-[calc(100dvh-24px)]
                sm:max-h-[calc(100dvh-48px)]
                rounded-2xl
                border
                overflow-hidden
                shadow-[0_30px_100px_rgba(0,0,0,0.75)]
                ${
                  isDarkMode
                    ? "bg-[#1F2430] border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }
              `}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >

              {/* =================================================
                  MODAL HEADER
                  ================================================= */}

              <div
                className={`
                  flex
                  items-center
                  w-full
                  px-4
                  py-3
                  sm:px-6
                  sm:py-4
                  border-b
                  ${
                    isDarkMode
                      ? "border-gray-700 bg-[#1F2430]"
                      : "border-gray-200 bg-white"
                  }
                `}
              >

                {/* TITLE */}

                <div className="min-w-0 flex-1 pr-3">
                  <h4
                    id="report-modal-title"
                    className="
                      text-base
                      sm:text-xl
                      font-extrabold
                      leading-tight
                      truncate
                    "
                  >
                    Report a problem
                  </h4>

                  <p className="text-[10px] sm:text-xs mt-0.5 opacity-60 truncate">
                    {subjectName}{" "}
                    {selectedYear}
                  </p>
                </div>

                {/* =================================================
                    X BUTTON - RIGHT SIDE
                    ================================================= */}

                <button
                  type="button"
                  onClick={closeReportModal}
                  disabled={reportSending}
                  aria-label="Close report dialog"
                  className={`
                    ml-auto
                    shrink-0
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    ${
                      reportSending
                        ? "opacity-40 cursor-not-allowed"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  <X
                    size={20}
                    className="sm:w-[22px] sm:h-[22px]"
                    strokeWidth={2.2}
                  />
                </button>
              </div>

              {/* =================================================
                  MODAL BODY
                  ================================================= */}

              <div
                className="
                  overflow-y-auto
                  overscroll-contain
                  px-3
                  py-3
                  sm:px-6
                  sm:py-5
                  max-h-[calc(100dvh-92px)]
                  sm:max-h-[calc(100dvh-120px)]
                "
              >
                {reportSent ? (

                  /* SUCCESS STATE */

                  <div className="py-8 text-center">
                    <div
                      className="
                        mx-auto
                        mb-4
                        w-14
                        h-14
                        rounded-full
                        bg-emerald-500/15
                        text-emerald-500
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Check
                        size={27}
                        strokeWidth={2.5}
                      />
                    </div>

                    <h5 className="font-bold text-lg">
                      Thanks for reporting it.
                    </h5>

                    <p className="text-sm opacity-60 mt-2 leading-relaxed">
                      The admin team can review
                      this paper now.
                    </p>

                    <button
                      type="button"
                      onClick={closeReportModal}
                      className="
                        mt-6
                        px-6
                        py-2.5
                        rounded-xl
                        bg-[#DD6B20]
                        hover:bg-orange-600
                        text-white
                        font-bold
                        text-sm
                        transition-colors
                      "
                    >
                      Done
                    </button>
                  </div>

                ) : (

                  <>
                    {/* REPORT REASONS */}

                    <div className="space-y-1.5 sm:space-y-2">
                      {[
                        "PDF doesn't open",
                        "Wrong paper",
                        "Missing pages",
                        "Wrong marking scheme",
                        "Poor quality",
                        "Other",
                      ].map((reason) => (
                        <label
                          key={reason}
                          className={`
                            flex
                            items-center
                            gap-2.5
                            p-2.5
                            sm:p-3
                            rounded-xl
                            border
                            cursor-pointer
                            transition-all
                            duration-150
                            ${
                              reportReason ===
                              reason
                                ? "border-[#DD6B20] bg-orange-500/10"
                                : isDarkMode
                                ? "border-gray-700 hover:border-gray-600"
                                : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="paper-report-reason"
                            value={reason}
                            checked={
                              reportReason ===
                              reason
                            }
                            onChange={() =>
                              setReportReason(
                                reason
                              )
                            }
                            className="
                              accent-[#DD6B20]
                              shrink-0
                              w-3.5
                              h-3.5
                            "
                          />

                          <span className="text-xs sm:text-sm font-medium">
                            {reason}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* DETAILS */}

                    <textarea
                      value={reportDetails}
                      onChange={(event) =>
                        setReportDetails(
                          event.target.value
                        )
                      }
                      rows={4}
                      maxLength={1000}
                      placeholder="Optional details..."
                      className={`
                        w-full
                        mt-3
                        sm:mt-4
                        p-3
                        rounded-xl
                        border
                        resize-none
                        text-xs
                        sm:text-sm
                        outline-none
                        transition-colors
                        focus:border-[#DD6B20]
                        ${
                          isDarkMode
                            ? "bg-[#171923] border-gray-700 text-white placeholder:text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                        }
                      `}
                    />

                    {/* CHARACTER COUNT */}

                    <div
                      className={`
                        text-right
                        text-[10px]
                        sm:text-[11px]
                        mt-1
                        ${
                          isDarkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {reportDetails.length}/1000
                    </div>

                    {/* SUBMIT */}

                    <button
                      type="button"
                      disabled={reportSending}
                      onClick={submitReport}
                      className="
                        w-full
                        mt-2
                        sm:mt-3
                        py-2.5
                        sm:py-3
                        rounded-xl
                        bg-[#DD6B20]
                        hover:bg-orange-600
                        text-white
                        font-bold
                        text-xs
                        sm:text-sm
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition-all
                        duration-200
                        shadow-md
                        hover:shadow-lg
                      "
                    >
                      {reportSending
                        ? "Submitting..."
                        : "Submit Report"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}