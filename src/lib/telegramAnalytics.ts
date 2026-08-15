import { createAdminClient } from "@/lib/supabase/admin";

export type TelegramDelivery = {
  subjectId: string;
  year: string;
  medium: "sinhala" | "english" | "tamil";
  docType: "paper" | "marking";
  chatType: "channel" | "bot";
  language?: "sinhala" | "english" | "tamil";
};

export async function trackTelegramLinkDelivery(params: TelegramDelivery) {
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("telegram_link_deliveries").insert({
      subject_id: params.subjectId,
      year: params.year,
      medium: params.medium,
      doc_type: params.docType,
      chat_type: params.chatType,
      language: params.language || null,
    });
    if (error) console.error("Telegram analytics insert failed:", error);
  } catch (error) {
    console.error("Telegram analytics insert failed:", error);
  }
}
