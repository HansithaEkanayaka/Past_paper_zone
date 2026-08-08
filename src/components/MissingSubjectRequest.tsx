"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

export default function MissingSubjectRequest() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("missingRequest");
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    topic: "Missing Past Paper",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/request-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: "success", text: t("successMsg") });
        setFormData({ name: "", email: "", subject: "", topic: "Missing Past Paper", message: "" });
        setTimeout(() => {
          setIsOpen(false);
          setStatus(null);
        }, 3000);
      } else {
        setStatus({ type: "error", text: t("errorMsg") });
      }
    } catch (err) {
      setStatus({ type: "error", text: t("serverErrorMsg") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner Section */}
      <div className="w-full max-w-7xl mx-auto mt-12 px-4">
        <div
          className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg transition-all ${
            isDarkMode
              ? "bg-gradient-to-r from-[#2D3748] to-[#1A202C] border-gray-700"
              : "bg-gradient-to-r from-[#1A365D] to-[#2B6CB0] border-gray-200 text-white"
          }`}
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {t("bannerTitle")}
            </h3>
            <p className="text-gray-300 text-sm max-w-xl">
              {t("bannerDesc")}
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="whitespace-nowrap px-8 py-3.5 bg-[#DD6B20] hover:bg-orange-600 text-white font-extrabold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm tracking-wide"
          >
            {t("buttonText")}
          </button>
        </div>
      </div>

      {/* Modal Form Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-3xl p-6 sm:p-7 border shadow-2xl relative transition-all max-h-[90vh] overflow-y-auto ${
              isDarkMode ? "bg-[#171923] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-500/10 hover:bg-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-all"
            >
              ✕
            </button>

            {/* Modal Title Header */}
            <div className="mb-4 pr-6">
              <span className="text-[10px] font-bold text-[#DD6B20] uppercase tracking-wider bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                {t("modalBadge")}
              </span>
              <h3 className={`text-xl font-extrabold mt-1.5 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {t("modalTitle")}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-snug">
                {t("modalSubtitle")}
              </p>
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`p-3 rounded-xl mb-4 text-xs font-bold border ${
                  status.type === "success"
                    ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
                    : "bg-red-950/50 border-red-500/50 text-red-300"
                }`}
              >
                {status.text}
              </div>
            )}

            {/* Form Inputs with Compact Spacing */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                  {t("labelName")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("phName")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                  {t("labelEmail")}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t("phEmail")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
                  }`}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                  {t("labelSubject")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("phSubject")}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none transition-all ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
                  }`}
                />
              </div>

              {/* Dropdown Topic */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                  {t("labelTopic")}
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none transition-all cursor-pointer ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
                  }`}
                >
                  <option value="Missing Past Paper">{t("topicOption1")}</option>
                  <option value="Missing Marking Scheme">{t("topicOption2")}</option>
                  <option value="Entire Subject Missing">{t("topicOption3")}</option>
                  <option value="Wrong Paper PDF File">{t("topicOption4")}</option>
                  <option value="Other Issue">{t("topicOption5")}</option>
                </select>
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                  {t("labelMessage")}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder={t("phMessage")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs outline-none transition-all resize-none ${
                    isDarkMode
                      ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#DD6B20] hover:bg-orange-600 font-extrabold text-white text-xs rounded-xl transition-all duration-200 shadow-md disabled:opacity-50 mt-2"
              >
                {loading ? t("submitting") : t("submitBtn")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}