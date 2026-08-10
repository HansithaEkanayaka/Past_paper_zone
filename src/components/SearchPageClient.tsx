"use client";

import React, { useMemo, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MissingSubjectRequest from "@/components/MissingSubjectRequest";
import { useTheme } from "@/context/ThemeContext";
import { ALL_SUBJECTS, SubjectMeta } from "@/lib/subjects";

export default function SearchPageClient() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("search");
  const tSubjects = useTranslations("SubjectCard");

  const query = searchParams.get("q")?.trim() ?? "";
  const [inputValue, setInputValue] = useState(query);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Live hints while typing, matched the same way as the header search box.
  const suggestions = useMemo(() => {
    const needle = inputValue.trim().toLowerCase();
    if (!needle) return [];
    return ALL_SUBJECTS.filter((subject) => {
      const name = tSubjects(`subjects.${subject.id}`).toLowerCase();
      return (
        name.includes(needle) ||
        subject.id.toLowerCase().includes(needle) ||
        subject.code.toLowerCase().includes(needle)
      );
    }).slice(0, 6);
  }, [inputValue, tSubjects]);

  const showSuggestions = isInputFocused && suggestions.length > 0;

  // Resolve translated names once per render, then filter against the query.
  const results = useMemo(() => {
    if (!query) return [];

    const needle = query.toLowerCase();

    const withNames = ALL_SUBJECTS.map((subject) => ({
      ...subject,
      name: tSubjects(`subjects.${subject.id}`),
    }));

    return withNames.filter((subject) => {
      return (
        subject.name.toLowerCase().includes(needle) ||
        subject.id.toLowerCase().includes(needle) ||
        subject.code.toLowerCase().includes(needle) ||
        subject.level.toLowerCase().includes(needle)
      );
    });
  }, [query, tSubjects]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      router.push({ pathname: "/search", query: { q: trimmed } });
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#171923] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-6 md:px-16">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1
            className={`text-3xl md:text-4xl font-extrabold ${
              isDarkMode ? "text-white" : "text-[#1A365D]"
            }`}
          >
            {query ? t("headingFor", { query }) : t("headingEmpty")}
          </h1>
          {query && (
            <p className={`mt-3 text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {t("resultsCount", { count: results.length })}
            </p>
          )}
        </div>

        {/* On-page search box, so results can be refined without going back to the header */}
        <form
          onSubmit={handleSubmit}
          role="search"
          className="relative w-full max-w-xl mx-auto mb-12 flex items-center gap-2"
        >
          <label htmlFor="search-page-input" className="sr-only">
            {t("placeholder")}
          </label>
          <input
            id="search-page-input"
            type="search"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 150)}
            role="combobox"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            aria-controls="search-page-suggestions"
            placeholder={t("placeholder")}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
          <button
            type="submit"
            className="shrink-0 px-5 py-3 rounded-xl bg-[#DD6B20] hover:bg-orange-600 text-white font-bold text-sm transition-colors"
          >
            {t("searchButton")}
          </button>

          {showSuggestions && (
            <ul
              id="search-page-suggestions"
              role="listbox"
              className={`absolute left-0 right-0 top-full mt-2 py-2 rounded-xl shadow-xl border overflow-hidden z-50 max-h-72 overflow-y-auto ${
                isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              {suggestions.map((subject) => (
                <li key={subject.id} role="option" aria-selected="false">
                  <button
                    type="button"
                    onClick={() => router.push(`/subject/${subject.id}`)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors ${
                      isDarkMode ? "text-gray-100 hover:bg-white/5" : "text-gray-800 hover:bg-orange-50"
                    }`}
                  >
                    <span className="font-medium truncate">{tSubjects(`subjects.${subject.id}`)}</span>
                    <span className="shrink-0 text-[10px] font-bold text-[#DD6B20] bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30">
                      {subject.level === "OL" ? "O/L" : "A/L"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* States: empty query / no results / results grid */}
        {!query ? (
          <div
            className={`w-full rounded-2xl p-10 border border-dashed text-center max-w-2xl mx-auto ${
              isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <p className={`text-base font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              {t("emptyPrompt")}
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div
              className={`w-full rounded-2xl p-10 border border-dashed text-center ${
                isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {t("noResultsTitle", { query })}
              </h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("noResultsDesc")}
              </p>
            </div>
            <MissingSubjectRequest />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((subject: SubjectMeta & { name: string }) => (
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
                      {subject.level === "OL" ? "G.C.E O/L" : "G.C.E A/L"}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-bold transition-colors mb-2 ${
                      isDarkMode ? "text-white group-hover:text-[#DD6B20]" : "text-[#1A365D] group-hover:text-[#DD6B20]"
                    }`}
                  >
                    {subject.name}
                  </h3>
                </div>
                <div
                  className={`flex items-center justify-end pt-4 border-t mt-4 text-sm font-medium ${
                    isDarkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <span className="text-[#DD6B20] group-hover:translate-x-1 transition-transform">
                    {t("viewLink")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
