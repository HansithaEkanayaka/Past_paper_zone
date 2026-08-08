import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Import messages explicitly so Turbopack bundles them predictably
import en from "@/messages/en.json"; // adjust relative path if needed: "../../messages/en.json"
import si from "@/messages/si.json";
import ta from "@/messages/ta.json";

const messagesMap: Record<string, any> = {
  en,
  si,
  ta,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messagesMap[locale] || messagesMap[routing.defaultLocale],
  };
});