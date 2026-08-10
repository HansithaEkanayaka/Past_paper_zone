"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import {
  CookiePreferences,
  DEFAULT_PREFERENCES,
  acceptAllPreferences,
  getStoredPreferences,
  rejectAllPreferences,
  savePreferences,
} from "@/lib/cookieConsent";

interface CookiePreferencesModalProps {
  onClose: () => void;
}

function ToggleRow({
  title,
  description,
  checked,
  disabled,
  onChange,
  alwaysActiveLabel,
  isDarkMode,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  alwaysActiveLabel?: string;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        isDarkMode ? "bg-[#171923] border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
          {title}
        </h4>

        {disabled ? (
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#DD6B20] bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 shrink-0">
            {alwaysActiveLabel}
          </span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={title}
            onClick={() => onChange?.(!checked)}
            className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${
              checked ? "bg-[#DD6B20]" : isDarkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                checked ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        )}
      </div>
      <p className={`text-xs leading-relaxed mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {description}
      </p>
    </div>
  );
}

export default function CookiePreferencesModal({ onClose }: CookiePreferencesModalProps) {
  const { isDarkMode } = useTheme();
  const t = useTranslations("cookiePreferences");
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = getStoredPreferences();
    if (stored) setPrefs(stored);
  }, []);

  const commit = (next: CookiePreferences) => {
    savePreferences(next);
    onClose();
  };

  return (
    <div
      className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl relative transition-all duration-300 max-h-[90vh] overflow-y-auto ${
        isDarkMode ? "bg-[#1A202C] border-gray-700/80 text-white" : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={onClose}
        aria-label={t("closeLabel")}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 bg-gray-500/10 hover:bg-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
      >
        ✕
      </button>

      <div className="mb-6 pr-8">
        <span className="inline-block text-[10px] font-extrabold text-[#DD6B20] uppercase tracking-wider bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 mb-2">
          {t("badge")}
        </span>
        <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
          {t("title")}
        </h2>
        <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {t("intro")}
        </p>
      </div>

      <div className="space-y-3">
        <ToggleRow
          title={t("necessaryTitle")}
          description={t("necessaryDesc")}
          checked
          disabled
          alwaysActiveLabel={t("alwaysActive")}
          isDarkMode={isDarkMode}
        />
        <ToggleRow
          title={t("analyticsTitle")}
          description={t("analyticsDesc")}
          checked={prefs.analytics}
          onChange={(value) => setPrefs((p) => ({ ...p, analytics: value }))}
          isDarkMode={isDarkMode}
        />
        <ToggleRow
          title={t("marketingTitle")}
          description={t("marketingDesc")}
          checked={prefs.marketing}
          onChange={(value) => setPrefs((p) => ({ ...p, marketing: value }))}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => commit(rejectAllPreferences())}
          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border ${
            isDarkMode
              ? "bg-[#2D3748] border-gray-600 text-white hover:bg-[#3A4A60]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {t("rejectAllButton")}
        </button>
        <button
          type="button"
          onClick={() => commit(acceptAllPreferences())}
          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border ${
            isDarkMode
              ? "bg-[#2D3748] border-gray-600 text-white hover:bg-[#3A4A60]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {t("acceptAllButton")}
        </button>
        <button
          type="button"
          onClick={() => commit(prefs)}
          className="flex-1 py-3 bg-[#DD6B20] hover:bg-orange-600 font-extrabold text-white text-xs rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {t("saveButton")}
        </button>
      </div>
    </div>
  );
}
