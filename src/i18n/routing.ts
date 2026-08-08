import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales the app supports
  locales: ["en", "si", "ta"],

  // Used when no locale matches / as the fallback
  defaultLocale: "en",
});
