// Posts a professional, dynamically generated PNG announcement to the
// PastPaperZone Telegram channel whenever a paper/marking scheme is uploaded.
//
// The PNG is generated in the admin browser (see clientTelegramGraphic.ts)
// and arrives here as a real File. This is intentional: it keeps image
// rendering out of the Cloudflare Worker and avoids native Canvas/Sharp
// dependencies in the Worker bundle.

import { ALL_SUBJECTS } from "@/lib/subjects";

const BASE_URL = "https://pastpaperzone.lk";

type Medium = "sinhala" | "english" | "tamil";
type DocType = "paper" | "marking";

type TelegramPhoto = File | Blob;

const MEDIUM_LABEL: Record<Medium, string> = {
  sinhala: "SINHALA MEDIUM",
  english: "ENGLISH MEDIUM",
  tamil: "TAMIL MEDIUM",
};

const SUBJECT_NAMES: Record<string, string> = {
  "ol-maths": "Mathematics",
  "ol-science": "Science",
  "ol-sinhala": "Sinhala Language",
  "ol-english": "English Language",
  "ol-history": "History",
  "ol-buddhism": "Buddhism",
  "ol-tamil": "Tamil Language",
  "ol-geography": "Geography",
  "ol-civic": "Civic Education",
  "ol-music": "Music",
  "ol-art": "Art",
  "ol-dancing": "Dancing",
  "ol-drama": "Drama & Theatre",
  "ol-ict": "ICT",
  "ol-agriculture": "Agriculture",
  "ol-health": "Health",
  "al-combined-maths": "Combined Mathematics",
  "al-physics": "Physics",
  "al-chemistry": "Chemistry",
  "al-biology": "Biology",
  "al-ict": "Information Technology",
  "al-accounting": "Accounting",
  "al-business": "Business Studies",
  "al-econ": "Economics",
  "al-agro": "Agricultural Technology",
  "al-et": "Engineering Technology",
  "al-bst": "Bio Systems Technology",
  "al-sft": "Science for Technology",
};

async function telegramJson(
  token: string,
  method: string,
  body: Record<string, unknown>
) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/${method}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.description || "Telegram API error");
  }

  return data.result;
}

async function telegramPhoto(
  token: string,
  chatId: string,
  photo: TelegramPhoto,
  caption: string,
  replyMarkup: Record<string, unknown>
) {
  const form = new FormData();

  form.append("chat_id", chatId);
  form.append("photo", photo, "telegram-post.png");
  form.append("caption", caption);
  form.append("parse_mode", "Markdown");
  form.append("reply_markup", JSON.stringify(replyMarkup));

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendPhoto`,
    {
      method: "POST",
      body: form,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.description || "Telegram sendPhoto failed");
  }

  return data.result;
}

export async function notifyChannelNewPaper(params: {
  subjectId: string;
  year: string;
  medium: Medium;
  docType: DocType;
  graphic?: File | null;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  // Telegram is optional. Never break a paper upload when it is not configured.
  if (!token || !channelId) return;

  const {
    subjectId,
    year,
    medium,
    docType,
    graphic,
  } = params;

  const subject = ALL_SUBJECTS.find((item) => item.id === subjectId);
  const level = subject?.level === "AL" ? "A/L" : "O/L";
  const subjectName = SUBJECT_NAMES[subjectId] || subjectId;
  const docLabel = docType === "marking" ? "Marking Scheme" : "Question Paper";
  const docLabelSi = docType === "marking" ? "පිළිතුරු පත්‍රය" : "ප්‍රශ්න පත්‍රය";

  const paperPageUrl =
    `${BASE_URL}/si/papers/${subject?.level.toLowerCase() || "ol"}` +
    `/${subjectId}/${year}/${medium}` +
    `${docType === "marking" ? "?type=marking" : ""}`;

  const discussionLink =
    process.env.TELEGRAM_DISCUSSION_INVITE_LINK || BASE_URL;

  const caption =
    `📚 *${year} ${level} — ${subjectName}*\n` +
    `📖 *${docLabel}*\n` +
    `🌐 ${MEDIUM_LABEL[medium]}\n\n` +
    `${docLabelSi} ${year} — ${subjectName}\n\n` +
    `📥 *Download the paper from PastPaperZone.lk*`;

  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: "📥 Download Now",
          url: paperPageUrl,
        },
      ],
      [
        {
          text: "💬 Join Discussion Group",
          url: discussionLink,
        },
      ],
      [
        {
          text: "🔗 Visit PastPaperZone.lk",
          url: BASE_URL,
        },
      ],
    ],
  };

  // Only accept the browser-generated PNG when it is a sensible Telegram photo.
  const validGraphic =
    graphic instanceof File &&
    (graphic.type === "image/png" || graphic.type === "image/jpeg") &&
    graphic.size > 0 &&
    graphic.size <= 10 * 1024 * 1024;

  try {
    if (validGraphic) {
      // This is the new path: a real PNG is uploaded to Telegram.
      await telegramPhoto(
        token,
        channelId,
        graphic,
        caption,
        replyMarkup
      );
      return;
    }

    // Safe fallback if the browser graphic was not supplied.
    await telegramJson(token, "sendPhoto", {
      chat_id: channelId,
      photo: `${BASE_URL}/logo.png`,
      caption,
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    });
  } catch (photoError) {
    console.error("Telegram channel photo failed:", photoError);

    // Final fallback: never make the paper upload fail because Telegram failed.
    try {
      await telegramJson(token, "sendMessage", {
        chat_id: channelId,
        text: caption,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
        reply_markup: replyMarkup,
      });
    } catch (messageError) {
      console.error("Telegram channel message fallback failed:", messageError);
    }
  }
}
