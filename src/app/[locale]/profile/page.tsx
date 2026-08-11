"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";
import SavedPapers from "@/components/SavedPapers";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

// Full-page profile view/editor. This used to be a popup modal opened from
// "View Profile" - now, same as picking a subject (e.g. Mathematics) opens
// its own /subject/[id] page instead of a popup, "View Profile" opens this
// dedicated page so the details (and the edit/save form) have proper room
// to breathe and are reachable via a normal URL.
export default function ProfilePage() {
  const { user, loading, openLoginModal } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#171923] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
        {/* Back link - same pattern used on the subject detail page */}
        <div className="w-full mb-8">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold shadow-sm hover:shadow transition-all duration-200 ${
              isDarkMode
                ? "bg-[#2D3748] border-gray-700 text-white hover:border-[#DD6B20] hover:text-[#DD6B20]"
                : "bg-white border-gray-200 text-[#1A365D] hover:border-[#DD6B20] hover:text-[#DD6B20]"
            }`}
          >
            <span>←</span>
            <span>Back to PastPaperZone</span>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-sm opacity-70">Loading...</p>
        ) : !user ? (
          <div
            className={`rounded-2xl border p-10 text-center ${
              isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <p className="mb-4 text-base font-medium">
              You need to be logged in to view your profile.
            </p>
            <button
              type="button"
              onClick={() => openLoginModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DD6B20] hover:bg-orange-600 text-white font-bold text-sm transition-all"
            >
              Log In
            </button>
          </div>
        ) : (
          // ProfileForm already renders as a self-contained card (avatar +
          // upload, contact summary, and editable Full Name / Phone /
          // Location / About fields with a Save Changes button), so it
          // drops straight into the page - no `onClose` means no close
          // button, since there's nothing to dismiss on a full page.
          <>
            <ProfileForm />
            <SavedPapers />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
