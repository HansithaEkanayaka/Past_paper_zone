import { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import BackToTopButton from "@/components/BackToTopButton";
import CookieBanner from "@/components/CookieBanner";
import "@/app/globals.css";

// Brand fonts: Baloo 2 is a bold, rounded, friendly display font used for
// the logo/headings (matches an education/study-tools brand much better
// than a plain grotesque like Google Sans Flex), Nunito is a softly
// rounded but very readable font used for regular body text. Both are
// exposed as CSS variables so any component can opt in via
// `font-[family-name:var(--font-heading)]` or the `.font-brand` helper
// class added in globals.css.
const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
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
            className={`${baloo2.variable} ${nunito.variable} antialiased transition-colors duration-300`}
          >
            {children}
          </div>
          <BackToTopButton />
          <CookieBanner />
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