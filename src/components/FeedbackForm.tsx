"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

export default function FeedbackForm() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("feedback");
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", comment: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="feedback" className={`w-full py-16 px-6 md:px-16 border-b transition-colors duration-300 ${
      isDarkMode ? "bg-[#171923] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
    }`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
            {t("heading")}
          </h2>
          <p className={`mt-3 text-base md:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {t("subheading")}
          </p>
        </div>

        <div className={`rounded-2xl p-8 border shadow-sm ${
          isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-gray-50 border-gray-200"
        }`}>
          {submitted ? (
            <div className={`border rounded-xl p-8 text-center space-y-3 ${
              isDarkMode ? "bg-emerald-950/40 border-emerald-800 text-emerald-200" : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}>
              <span className="text-4xl">🎉</span>
              <h3 className="font-bold text-xl">{t("successTitle")}</h3>
              <p className="text-sm">
                {t("successText")}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold text-[#DD6B20] hover:underline"
              >
                {t("submitAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-xs font-bold uppercase mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {t("ratingLabel")}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-transform hover:scale-110 ${
                        star <= rating ? "text-amber-400" : isDarkMode ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:border-[#DD6B20] ${
                    isDarkMode ? "bg-[#1A202C] border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-800"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:border-[#DD6B20] ${
                    isDarkMode ? "bg-[#1A202C] border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-800"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {t("commentLabel")}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={t("commentPlaceholder")}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:border-[#DD6B20] resize-none ${
                    isDarkMode ? "bg-[#1A202C] border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-800"
                  }`}
                />
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#DD6B20] hover:bg-[#c05621] text-white font-bold text-base py-3.5 rounded-xl shadow-md transition-all duration-200 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : t("submitButton")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}