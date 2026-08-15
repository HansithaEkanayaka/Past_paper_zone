// Posts a formatted announcement to the PastPaperZone Telegram channel
// whenever a new paper/marking-scheme is uploaded from the admin dashboard.
//
// Required env vars (set in Cloudflare Workers/Pages project settings):
//   TELEGRAM_BOT_TOKEN            - same bot token used by the webhook
//   TELEGRAM_CHANNEL_ID           - numeric channel id, e.g. -1001234567890
//   TELEGRAM_DISCUSSION_INVITE_LINK (optional) - public t.me invite link for
//                                    the discussion group ("Join Discussion
//                                    Group" button). Falls back to the site
//                                    URL if not set.
//
// If TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID are missing, this silently
// does nothing (so local/dev environments and pre-launch setups don't error).

import { ALL_SUBJECTS } from "@/lib/subjects";

const BASE_URL = "https://pastpaperzone.lk";

type Medium = "sinhala" | "english" | "tamil";
type DocType = "paper" | "marking";

const MEDIUM_LABEL: Record<Medium, string> = {
  sinhala: "සිංහල මාධ්‍ය (Sinhala Medium)",
  english: "English Medium",
  tamil: "தமிழ் மொழி (Tamil Medium)",
};

// Kept in sync with SUBJECT_NAMES in the telegram webhook route.
const SUBJECT_NAMES: Record<string, string> = {
  "ol-maths": "ගණිතය",
  "ol-science": "විද්‍යාව",
  "ol-sinhala": "සිංහල භාෂාව",
  "ol-english": "ඉංග්‍රීසි භාෂාව",
  "ol-history": "ඉතිහාසය",
  "ol-buddhism": "බුද්ධ ධර්මය",
  "ol-tamil": "දෙමළ භාෂාව",
  "ol-geography": "භූගෝල විද්‍යාව",
  "ol-civic": "පුරවැසි අධ්‍යාපනය",
  "ol-music": "සංගීතය",
  "ol-art": "කලාව",
  "ol-dancing": "නර්තනය",
  "ol-drama": "නාට්‍ය හා රංග කලාව",
  "ol-ict": "තොරතුරු හා සන්නිවේදන තාක්ෂණය",
  "ol-agriculture": "කෘෂිකර්මය",
  "ol-health": "සෞඛ්‍යය",
  "al-combined-maths": "සංයුක්ත ගණිතය",
  "al-physics": "භෞතික විද්‍යාව",
  "al-chemistry": "රසායන විද්‍යාව",
  "al-biology": "ජීව විද්‍යාව",
  "al-ict": "තොරතුරු තාක්ෂණය",
  "al-accounting": "ගණකාධිකරණය",
  "al-business": "ව්‍යාපාර අධ්‍යයනය",
  "al-econ": "ආර්ථික විද්‍යාව",
  "al-agro": "කෘෂි තාක්ෂණවේදය",
  "al-et": "ඉංජිනේරු තාක්ෂණවේදය",
  "al-bst": "ජෛව පද්ධති තාක්ෂණවේදය",
  "al-sft": "තාක්ෂණය සඳහා විද්‍යාව",
};

async function telegram(
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

export async function notifyChannelNewPaper(params: {
  subjectId: string;
  year: string;
  medium: Medium;
  docType: DocType;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  // Not configured yet — skip quietly, don't break the upload.
  if (!token || !channelId) return;

  const { subjectId, year, medium, docType } = params;

  const subject = ALL_SUBJECTS.find((item) => item.id === subjectId);
  const level = subject?.level === "AL" ? "A/L" : "O/L";
  const subjectName = SUBJECT_NAMES[subjectId] || subjectId;
  const docLabel = docType === "marking" ? "Marking Scheme" : "Past Paper";
  const docLabelSi = docType === "marking" ? "පිළිතුරු පත්‍රය" : "ප්‍රශ්න පත්‍රය";

  const paperPageUrl = `${BASE_URL}/si/papers/${
    subject?.level.toLowerCase() || "ol"
  }/${subjectId}/${year}/${medium}${docType === "marking" ? "?type=marking" : ""}`;

  const discussionLink =
    process.env.TELEGRAM_DISCUSSION_INVITE_LINK || BASE_URL;

  const caption =
    `📝 *${year} ${level}*\n` +
    `*${subjectName}*\n\n` +
    `${MEDIUM_LABEL[medium]}\n` +
    `🗂️ ${docLabelSi} (${docLabel})\n\n` +
    `GCE ${level} ${subjectName} ${docLabel} ${year} — ${MEDIUM_LABEL[medium]}\n\n` +
    `Download now →`;

  const replyMarkup = {
    inline_keyboard: [
      [{ text: "📥 Download Now", url: paperPageUrl }],
      [{ text: "💬 Join Discussion Group", url: discussionLink }],
      [{ text: "🔗 Visit Site", url: BASE_URL }],
    ],
  };

  try {
    // Try to post with the site logo as a photo, matching the reference
    // channel-post style. Falls back to a plain text message if the logo
    // URL isn't reachable by Telegram for any reason.
    await telegram(token, "sendPhoto", {
      chat_id: channelId,
      photo: `${BASE_URL}/logo.png`,
      caption,
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    });
  } catch {
    await telegram(token, "sendMessage", {
      chat_id: channelId,
      text: caption,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
      reply_markup: replyMarkup,
    });
  }
}
