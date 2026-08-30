import "./globals.css";
import { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

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

const siteUrl = "https://pastpaperzone.lk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Past Paper Zone - G.C.E. O/L & A/L Past Papers Sri Lanka",
    template: "%s | Past Paper Zone",
  },

  description:
    "Download free G.C.E. O/L and A/L past papers, marking schemes and exam resources in Sinhala, English and Tamil mediums in Sri Lanka.",

  applicationName: "Past Paper Zone",

  keywords: [
    "Past Paper Zone",
    "Past Paper Zone Sri Lanka",
    "pastpaperzone",
    "pastpaperzone.lk",
    "O/L past papers Sri Lanka",
    "A/L past papers Sri Lanka",
    "GCE past papers",
    "O/L marking schemes",
    "A/L marking schemes",
    "Sri Lanka past papers",
  ],

  authors: [
    {
      name: "Past Paper Zone",
      url: siteUrl,
    },
  ],

  creator: "Past Paper Zone",
  publisher: "Past Paper Zone",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteUrl,
    siteName: "Past Paper Zone",
    title:
      "Past Paper Zone - G.C.E. O/L & A/L Past Papers Sri Lanka",
    description:
      "Free G.C.E. O/L and A/L past papers and marking schemes for Sri Lankan students.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Past Paper Zone - G.C.E. O/L & A/L Past Papers Sri Lanka",
    description:
      "Free G.C.E. O/L and A/L past papers and marking schemes in Sri Lanka.",
  },

  verification: {
    google:
      "Da_thGZy2Oxv4HghEnCkDMzd_TIidhT6tw2elaHRRVU",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2841360094855256"
        crossOrigin="anonymous">
        </script>
      </head>
      <body
        className={`${baloo2.variable} ${nunito.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}