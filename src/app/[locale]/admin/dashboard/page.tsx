"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState("ol-maths");
  const [year, setYear] = useState("2024");
  const [medium, setMedium] = useState("sinhala");
  const [docType, setDocType] = useState("paper");

  const [uploading, setUploading] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Logout Logic
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      // Hard navigation so middleware re-checks the (now cleared) cookie.
      window.location.href = "./login";
    }
  };

  // Upload Logic
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage({ text: "Please select a PDF file first.", type: "error" });

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subjectId", subjectId);
    formData.append("year", year);
    formData.append("medium", medium);
    formData.append("docType", docType);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.status === 401) {
        window.location.href = "./login";
        return;
      }

      const data = await res.json();
      if (data.success) {
        setMessage({ text: `Successfully uploaded! Key: ${data.key}`, type: "success" });
        setFile(null);
      } else {
        setMessage({ text: "Upload failed! Check your R2 settings.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error uploading file to server.", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  // Delete Logic
  const handleDelete = async () => {
    if (!deleteKey) return setMessage({ text: "Enter a valid R2 File Key.", type: "error" });

    try {
      const res = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: deleteKey }),
      });

      if (res.status === 401) {
        window.location.href = "./login";
        return;
      }

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "File deleted successfully from R2!", type: "success" });
        setDeleteKey("");
      } else {
        setMessage({ text: "Delete failed! Key not found.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error deleting file.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#171923] text-white flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="w-full bg-[#2D3748]/60 backdrop-blur border-b border-gray-800 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-[#DD6B20] text-white p-2 rounded-lg font-black text-xl tracking-wider shrink-0">
            PZ
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight truncate">PastPaperZone</h1>
            <p className="text-xs text-gray-400 truncate">Cloudflare R2 Paper Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="px-4 py-2 rounded-full border border-gray-700 bg-[#2D3748] text-sm font-bold text-gray-200 hover:border-[#DD6B20] hover:text-[#DD6B20] transition-all"
          >
            ← Back to Website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-sm font-bold text-red-300 hover:bg-red-500/20 transition-all disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main Full-Width Dashboard Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        
        {/* Welcome & Stats Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#2D3748] to-[#1A202C] p-5 sm:p-8 rounded-3xl border border-gray-800 shadow-xl">
          <div>
            <span className="text-xs font-bold text-[#DD6B20] uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Admin Portal
            </span>
            <h2 className="text-3xl font-extrabold mt-2">Manage Exam Papers & Markings</h2>
            <p className="text-gray-400 text-sm mt-1">
              Upload past papers directly to Cloudflare R2 object storage with automated prefixing.
            </p>
          </div>
        </div>

        {/* Global Notification Banner */}
        {message && (
          <div
            className={`p-4 rounded-xl border text-sm font-semibold transition-all ${
              message.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                : "bg-red-950/40 border-red-500/50 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Layout Grid: Upload Form (2 Columns) & Delete Section (1 Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Card (Takes 2 Columns) */}
          <div className="lg:col-span-2 bg-[#2D3748]/50 border border-gray-800 rounded-3xl p-5 sm:p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DD6B20]"></span>
              Upload New Paper / Marking Scheme
            </h3>

            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                    Subject ID
                  </label>
                  <input
                    type="text"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#171923] border border-gray-700 text-white focus:outline-none focus:border-[#DD6B20] transition-colors"
                    placeholder="e.g. ol-maths, al-[#DD6B20]physics"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                    Examination Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#171923] border border-gray-700 text-white focus:outline-none focus:border-[#DD6B20] transition-colors"
                    placeholder="e.g. 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                    Medium
                  </label>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#171923] border border-gray-700 text-white focus:outline-none focus:border-[#DD6B20] transition-colors"
                  >
                    <option value="sinhala">Sinhala Medium</option>
                    <option value="english">English Medium</option>
                    <option value="tamil">Tamil Medium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                    Document Type
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#171923] border border-gray-700 text-white focus:outline-none focus:border-[#DD6B20] transition-colors"
                  >
                    <option value="paper">Question Paper</option>
                    <option value="marking">Marking Scheme</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full p-3 bg-[#171923] border border-gray-700 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#DD6B20] file:text-white hover:file:bg-orange-600 transition-all cursor-pointer"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-4 bg-[#DD6B20] hover:bg-orange-600 rounded-xl font-extrabold text-white text-base transition-all duration-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 disabled:opacity-50"
              >
                {uploading ? "Uploading to Cloudflare R2..." : "Upload Document"}
              </button>
            </form>
          </div>

          {/* Delete Card & Helper Info (Takes 1 Column) */}
          <div className="flex flex-col gap-8">
            
            {/* Delete Box */}
            <div className="bg-[#2D3748]/50 border border-gray-800 rounded-3xl p-5 sm:p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-red-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Delete File from R2
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Paste the exact R2 File Key below to permanently delete it.
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  value={deleteKey}
                  onChange={(e) => setDeleteKey(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#171923] border border-gray-700 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="papers/ol-maths/2024/sinhala/paper-xxx.pdf"
                />
                <button
                  onClick={handleDelete}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white transition-all text-sm shadow-md"
                >
                  Delete Permanently
                </button>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-[#171923] border border-gray-800 rounded-3xl p-6 text-xs text-gray-400 space-y-2">
              <p className="font-bold text-gray-200 uppercase tracking-wider mb-2">R2 Path Format Info</p>
              <p>• Files are stored as: <span className="text-orange-400">papers/&#123;subject&#125;/&#123;year&#125;/&#123;medium&#125;/&#123;type&#125;.pdf</span></p>
              <p>• Make sure <span className="text-white">Subject ID</span> matches the frontend route slug (e.g., <code className="text-orange-400">ol-maths</code>).</p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}