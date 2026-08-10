import "./globals.css";
import { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";

// These CSS variables (--font-heading / --font-body) are read by
// globals.css on the <body> element itself (`font-family: var(--font-body)...`
// and `.font-brand { font-family: var(--font-heading)... }`). CSS custom
// properties only flow DOWN the tree, so the variables must be defined on
// <body> (or an ancestor of it) - defining them on a wrapper <div> further
// down (as this project previously did, inside `[locale]/layout.tsx`) means
// <body> itself never sees them, so both fonts silently fall back to the
// browser default everywhere except inside that div.
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

export const metadata = {
  title: "PastPaperZone",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${baloo2.variable} ${nunito.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}