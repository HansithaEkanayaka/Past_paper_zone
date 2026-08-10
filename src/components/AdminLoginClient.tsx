"use client";

import React, { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function AdminLoginClient() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }

      // Hard navigation so the freshly-set cookie is picked up by middleware
      // on the very next request to /admin/dashboard. Only allow same-site,
      // relative redirect targets to avoid an open-redirect via ?from=.
      const from = searchParams.get("from");
      const redirectTo = from && from.startsWith("/") && !from.startsWith("//") ? from : "./dashboard";
      window.location.href = redirectTo;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#171923] text-white flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm bg-[#2D3748]/50 border border-gray-800 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <Image
              src="/logo.png"
              alt="PastPaperZone Logo"
              width={64}
              height={64}
              className="object-contain max-h-full w-auto brightness-0 invert"
              priority
            />
          </div>
          <h1 className="text-xl font-extrabold">Admin Login</h1>
          <p className="text-xs text-gray-400 mt-1">
            Enter the admin password to manage past papers.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl mb-4 text-xs font-semibold bg-red-950/40 border border-red-500/50 text-red-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#171923] border border-gray-700 text-white focus:outline-none focus:border-[#DD6B20] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#DD6B20] hover:bg-orange-600 rounded-xl font-extrabold text-white text-sm transition-all duration-200 shadow-md disabled:opacity-50"
          >
            {loading ? "Checking..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-[#DD6B20] font-semibold">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
