"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/context/ThemeContext";

// The footer's "Contact Us" link has always pointed here, and the
// ContactForm component already existed - but no page ever rendered it,
// so this route 404'd. This page just gives ContactForm a home.
//
// Previously this page (and ContactForm itself) used hardcoded dark colors
// ("#0B0E14", slate/blue) instead of following the site's light/dark theme
// switch, which is why it looked visually out of place. It now reads
// isDarkMode the same way every other page (e.g. the subject detail page)
// does.
export default function ContactPage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#171923] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      <main className="flex-1 w-full py-16 px-6">
        <div className="max-w-xl mx-auto mb-6">
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

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
