"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import { createClient } from "@/lib/supabase/client";

interface LoginFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function LoginForm({ onClose, onSuccess }: LoginFormProps) {
  const { isDarkMode } = useTheme();
  const t = useTranslations("auth");

  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (oauthError) {
        setError(oauthError.message || "Failed to sign in with Google.");
        setGoogleLoading(false);
      }
      // On success the browser is redirected to Google, so no further
      // action is needed here.
    } catch (err) {
      setError("Failed to sign in with Google.");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError(t("passwordsDoNotMatch") || "Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setSuccess(
        isSignUp
          ? t("registerSuccess") || "Account created successfully! You can now login."
          : t("loginSuccess") || "Successfully logged in!"
      );

      if (isSignUp) {
        setIsSignUp(false);
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl relative transition-all duration-300 max-h-[90vh] overflow-y-auto ${
        isDarkMode
          ? "bg-[#1A202C] border-gray-700/80 text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 bg-gray-500/10 hover:bg-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
        >
          ✕
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-6 pr-4 pl-4">
        <span className="inline-block text-[10px] font-extrabold text-[#DD6B20] uppercase tracking-wider bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 mb-2">
          {isSignUp ? t("signUpBadge") || "Create Account" : t("signInBadge") || "Welcome Back"}
        </span>
        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
          {isSignUp ? t("signUpTitle") || "Join PastPaperZone" : t("signInTitle") || "Log In to PastPaperZone"}
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
          {t("optionalNote") || "Login is optional. Access and download papers anytime for free!"}
        </p>
      </div>

      {/* Status Alert Messages */}
      {error && (
        <div className="p-3 rounded-2xl mb-4 text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-400 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-2xl mb-4 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center">
          {success}
        </div>
      )}

      {/* Social Login Section */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className={`w-full py-3 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] ${
            isDarkMode
              ? "bg-[#2D3748] border-gray-600 text-white hover:bg-[#3A4A60]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {/* Official Google SVG Icon */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{googleLoading ? "Connecting..." : "Continue with Google"}</span>
        </button>
      </div>

      {/* OR Divider */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="border-t border-gray-700/40 w-full"></div>
        <span className={`px-3 text-[11px] font-bold uppercase tracking-wider shrink-0 ${isDarkMode ? "bg-[#1A202C] text-gray-500" : "bg-white text-gray-400"}`}>
          or
        </span>
        <div className="border-t border-gray-700/40 w-full"></div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {isSignUp && (
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
              {t("labelName") || "Full Name"}
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Kasun Kalhara"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                isDarkMode
                  ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
              }`}
            />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
            {t("labelEmail") || "Email Address"}
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="kasun@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
            }`}
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
            {t("labelPassword") || "Password"}
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
            }`}
          />
        </div>

        {isSignUp && (
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
              {t("labelConfirmPassword") || "Confirm Password"}
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                isDarkMode
                  ? "bg-[#2D3748] border-gray-700 text-white focus:border-[#DD6B20]"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#DD6B20]"
              }`}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#DD6B20] hover:bg-orange-600 font-extrabold text-white text-xs rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 mt-2 active:scale-[0.99]"
        >
          {loading
            ? t("processing") || "Please wait..."
            : isSignUp
            ? t("signUpBtn") || "Create Account"
            : t("signInBtn") || "Sign In"}
        </button>
      </form>

      {/* Switcher Footer */}
      <div className="mt-5 pt-4 border-t border-gray-700/30 text-center">
        <p className="text-xs text-gray-400">
          {isSignUp ? (
            <>
              {t("alreadyHaveAccount") || "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError(null);
                }}
                className="text-[#DD6B20] font-extrabold hover:underline ml-1"
              >
                {t("signInBtn") || "Sign In"}
              </button>
            </>
          ) : (
            <>
              {t("dontHaveAccount") || "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError(null);
                }}
                className="text-[#DD6B20] font-extrabold hover:underline ml-1"
              >
                {t("signUpBtn") || "Create One"}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}