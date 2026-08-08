import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "PastPaperZone",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}