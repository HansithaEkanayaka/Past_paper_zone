import { ReactNode } from "react";
import { Poppins, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import BackToTopButton from "@/components/BackToTopButton";
import "@/app/globals.css";

// Brand fonts: Poppins for the logo/headings (bold, friendly, matches an
// education/study-tools brand), Inter for regular body text. Both are
// exposed as CSS variables so any component can opt in via
// `font-[family-name:var(--font-poppins)]` or the `.font-brand` helper
// class added in globals.css.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch translation messages for next-intl
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <AuthProvider>
          <div
            className={`${poppins.variable} ${inter.variable} antialiased transition-colors duration-300`}
          >
            {children}
          </div>
          <BackToTopButton />
        </AuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
export const metadata = {
  title: 'Past Paper Zone - G.C.E. O/L & A/L Past Papers Sri Lanka',
  description: 'Download Sri Lankan G.C.E. O/L and A/L past papers, marking schemes, and model papers for free on Past Paper Zone.',
  keywords: ['past paper zone', 'pastpaperzone', 'pastpaperzone.lk', 'ol past papers', 'al past papers'],
  verification: {
    google: '<meta name="google-site-verification" content="Da_thGZy2Oxv4HghEnCkDMzd_TIidhT6tw2elaHRRVU" />'
  },
  openGraph: {
    title: 'Past Paper Zone',
    description: 'Download Sri Lankan O/L & A/L past papers and marking schemes.',
    url: 'https://pastpaperzone.lk',
    siteName: 'Past Paper Zone',
  },
};