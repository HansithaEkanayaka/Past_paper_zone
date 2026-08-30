import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import BackToTopButton from "@/components/BackToTopButton";
import CookieBanner from "@/components/CookieBanner";
import ActivityTracker from "@/components/ActivityTracker";

// Brand fonts (Baloo 2 for headings/logo, Nunito for body text) are loaded
// once in the root layout (src/app/layout.tsx) and applied to <body> there,
// so every page inherits --font-heading / --font-body correctly. See the
// comment in that file for why they can't be set on a div here instead.

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
          <div className="antialiased transition-colors duration-300">
            {children}
          </div>
          <BackToTopButton />
          <CookieBanner />
          <ActivityTracker />
        </AuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}