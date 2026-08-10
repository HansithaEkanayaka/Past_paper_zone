"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import CookiePreferencesModal from "./CookiePreferencesModal";
import {
  acceptAllPreferences,
  getStoredPreferences,
  rejectAllPreferences,
  savePreferences,
} from "@/lib/cookieConsent";

export default function CookieBanner() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("cookiePreferences");
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    // පරිශීලකයා මීට පෙර තේරීමක් කර ඇත්දැයි බැලීම
    if (!getStoredPreferences()) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    savePreferences(acceptAllPreferences());
    setIsVisible(false);
  };

  const handleReject = () => {
    savePreferences(rejectAllPreferences());
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-0 left-0 w-full p-4 shadow-lg z-50 border-t ${
            isDarkMode ? "bg-[#1A202C] border-gray-800 text-white" : "bg-[#1A365D] border-gray-700 text-gray-100"
          }`}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left flex-1">{t("bannerText")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setShowCustomize(true)}
                className={`px-4 py-2 rounded-full font-bold text-sm border transition-colors ${
                  isDarkMode
                    ? "bg-[#2D3748] border-gray-600 text-white hover:border-[#DD6B20]"
                    : "bg-white/10 border-white/20 text-white hover:border-[#DD6B20]"
                }`}
              >
                {t("bannerCustomize")}
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-full border border-gray-400/40 text-white hover:bg-white/10 font-bold text-sm transition-colors"
              >
                {t("bannerReject")}
              </button>
              <button
                onClick={handleAccept}
                className="bg-[#DD6B20] hover:bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors"
              >
                {t("bannerAccept")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCustomize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <CookiePreferencesModal
            onClose={() => {
              setShowCustomize(false);
              setIsVisible(false);
            }}
          />
        </div>
      )}
    </>
  );
}
