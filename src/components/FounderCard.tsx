"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

// Social links reuse the same placeholder URLs as the Footer's icons for
// now - update both places once real profile URLs are available.
const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1DXBddEgzH/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_reshan_hansitha_?igsh=MWMzajVtMzdwNnc2Ng==",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/94767950458",
    path: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
  },
{
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hansitha-ekanayaka-476016309",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Portfolio",
    href: "https://hansithaekanayaka.com",
    path: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 19.931v-1.931h-2v1.931c-3.92-.303-7-3.513-7-7.431 0-1.944.743-3.712 1.956-5.029l1.415 1.415c-.752.92-1.213 2.091-1.213 3.614 0 3.032 2.468 5.5 5.5 5.5s5.5-2.468 5.5-5.5c0-1.523-.461-2.694-1.213-3.614l1.415-1.415c1.213 1.317 1.956 3.085 1.956 5.029 0 3.918-3.08 7.128-7 7.431zm-1-12.931c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z",
  },
];

export default function FounderCard() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("about.founder");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 ${
          isDarkMode ? "bg-[#2D3748] border-gray-700 hover:border-[#DD6B20]" : "bg-gray-50 border-gray-200 hover:border-[#DD6B20]"
        }`}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#DD6B20] shrink-0 relative bg-gray-300">
          {/* Add your photo at /public/founder.jpg (square image works best) */}
          <Image src="/founder.jpg" alt={t("name")} fill sizes="96px" className="object-cover" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30 uppercase tracking-wider mb-2">
            👑 {t("roleBadge")}
          </span>
          <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
            {t("name")}
          </h3>
          <p className={`text-sm md:text-base mt-2 mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {t("shortDesc")}
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DD6B20] hover:bg-orange-600 rounded-xl font-bold text-white text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {t("moreButton")} →
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl relative transition-all duration-300 max-h-[90vh] overflow-y-auto text-center ${
              isDarkMode ? "bg-[#1A202C] border-gray-700/80 text-white" : "bg-white border-gray-100 text-gray-900"
            }`}
          >
            <button
              onClick={() => setShowModal(false)}
              aria-label={t("closeLabel")}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 bg-gray-500/10 hover:bg-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
            >
              ✕
            </button>

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#DD6B20] mx-auto relative bg-gray-300">
              <Image src="/founder.jpg" alt={t("name")} fill sizes="112px" className="object-cover" />
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30 uppercase tracking-wider mt-4">
              👑 {t("modalRole")}
            </span>
            <h3 className={`text-2xl font-black mt-2 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
              {t("name")}
            </h3>

            <div className={`mt-5 pt-5 border-t text-left ${isDarkMode ? "border-gray-700/50" : "border-gray-200"}`}>
              <h4 className={`text-xs font-extrabold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("bioTitle")}
              </h4>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {t("bio")}
              </p>
            </div>

            <div className="mt-6">
              <h4 className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("socialHeading")}
              </h4>
              <div className="flex items-center justify-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isDarkMode ? "bg-white/10 hover:bg-[#DD6B20] text-white" : "bg-gray-100 hover:bg-[#DD6B20] text-[#1A365D] hover:text-white"
                    }`}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
