import { NextResponse } from "next/server";
import { getR2Bucket } from "@/lib/r2";
import { ALL_SUBJECTS } from "@/lib/subjects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL = "https://pastpaperzone.lk";

const MEDIUMS = ["sinhala", "english", "tamil"] as const;
type Medium = (typeof MEDIUMS)[number];
type Level = "OL" | "AL";

const MEDIUM_LABEL: Record<Medium, string> = {
  sinhala: "🇱🇰 සිංහල මාධ්‍ය",
  english: "🇬🇧 ඉංග්‍රීසි මාධ්‍ය",
  tamil: "🇱🇰 දෙමළ මාධ්‍ය",
};

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
  "al-ict": "තොරතුරු තාක්ෂණය (ICT)",
  "al-accounting": "ගණකාධිකරණය",
  "al-business": "ව්‍යාපාර අධ්‍යයනය",
  "al-econ": "ආර්ථික විද්‍යාව",
  "al-agro": "කෘෂි තාක්ෂණවේදය",
  "al-et": "ඉංජිනේරු තාක්ෂණවේදය",
  "al-bst": "ජෛව පද්ධති තාක්ෂණවේදය",
  "al-sft": "තාක්ෂණය සඳහා විද්‍යාව",
};

const ALIASES: Array<[string[], string]> = [
  [["ol maths", "o/l maths", "ol math", "o/l math", "maths", "math", "ගණන්", "ගණිතය"], "ol-maths"],
  [["ol science", "o/l science", "science", "විද්‍යාව"], "ol-science"],
  [["ol sinhala", "o/l sinhala", "sinhala", "සිංහල", "සිංහල පේපර්", "සිංහල භාෂාව"], "ol-sinhala"],
  [["ol english", "o/l english", "english", "ඉංග්‍රීසි"], "ol-english"],
  [["ol history", "o/l history", "history", "ඉතිහාසය"], "ol-history"],
  [["buddhism", "බුද්ධ ධර්මය", "බුද්ධාගම"], "ol-buddhism"],
  [["tamil", "දෙමළ"], "ol-tamil"],
  [["geography", "භූගෝල විද්‍යාව"], "ol-geography"],
  [["civic", "පුරවැසි"], "ol-civic"],
  [["ol ict", "o/l ict"], "ol-ict"],
  [["al combined maths", "a/l combined maths", "combined maths", "combined math", "සංයුක්ත ගණිතය", "කොම්බයින්"], "al-combined-maths"],
  [["physics", "භෞතික විද්‍යාව"], "al-physics"],
  [["chemistry", "රසායන විද්‍යාව"], "al-chemistry"],
  [["biology", "ජීව විද්‍යාව"], "al-biology"],
  [["al ict", "a/l ict"], "al-ict"],
  [["accounting", "ගණකාධිකරණය"], "al-accounting"],
  [["business", "ව්‍යාපාර අධ්‍යයනය"], "al-business"],
  [["economics", "ආර්ථික විද්‍යාව"], "al-econ"],
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[“”‘’]/g, "")
    .replace(/[^\p{L}\p{N}/]+/gu, " ")
    .trim();
}

function findSubject(text: string) {
  const n = normalize(text);

  for (const [names, id] of ALIASES) {
    if (names.some((name) => n.includes(normalize(name)))) {
      return ALL_SUBJECTS.find((s) => s.id === id) || null;
    }
  }

  return null;
}

function findYear(text: string) {
  return text.match(/\b(20\d{2})\b/)?.[1] || null;
}

async function listPaperKeys() {
  const bucket = await getR2Bucket();
  const keys: string[] = [];
  let cursor: string | undefined;

  do {
    const page = await bucket.list({
      prefix: "papers/",
      cursor,
    });

    keys.push(...page.objects.map((object) => object.key));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  return keys.filter((key) =>
    /^papers\/[^/]+\/20\d{2}\/(sinhala|english|tamil)\/paper\.pdf$/i.test(key)
  );
}

function paperPageUrl(
  level: Level,
  subjectId: string,
  year: string,
  medium: Medium
) {
  return `${BASE_URL}/si/papers/${level.toLowerCase()}/${subjectId}/${year}/${medium}`;
}

/**
 * Creates the Telegram message.
 *
 * Format:
 *
 * 📚 O/L ගණිතය Past Papers
 *
 * 🇱🇰 සිංහල මාධ්‍ය
 * 2024 — Paper
 * 2023 — Paper
 *
 * 🇬🇧 ඉංග්‍රීසි මාධ්‍ය
 * ...
 *
 * Every year is a clickable link.
 */
function buildPost(subjectId: string, level: Level, keys: string[]) {
  const subjectName = SUBJECT_NAMES[subjectId] || subjectId;

  const yearsByMedium: Record<Medium, string[]> = {
    sinhala: [],
    english: [],
    tamil: [],
  };

  for (const key of keys) {
    const match = key.match(
      /^papers\/([^/]+)\/(20\d{2})\/(sinhala|english|tamil)\/paper\.pdf$/i
    );

    if (!match || match[1] !== subjectId) continue;

    const medium = match[3].toLowerCase() as Medium;

    if (!yearsByMedium[medium].includes(match[2])) {
      yearsByMedium[medium].push(match[2]);
    }
  }

  for (const medium of MEDIUMS) {
    yearsByMedium[medium].sort((a, b) => Number(b) - Number(a));
  }

  const totalYears = MEDIUMS.reduce(
    (total, medium) => total + yearsByMedium[medium].length,
    0
  );

  if (!totalYears) {
    return `❌ *${level} ${subjectName}* සඳහා papers හමු වුණේ නැහැ.`;
  }

  const lines: string[] = [
    `📚 *${level} ${subjectName} Past Papers*`,
    "",
    "පහත අවශ්‍ය වර්ෂය click කර paper එක ලබාගන්න 👇",
    "",
  ];

  for (const medium of MEDIUMS) {
    const years = yearsByMedium[medium];

    if (!years.length) continue;

    lines.push(`*${MEDIUM_LABEL[medium]}*`);

    for (const year of years) {
      const url = paperPageUrl(level, subjectId, year, medium);
      lines.push(`• [${year} — Paper](${url})`);
    }

    lines.push("");
  }

  lines.push("🌐 [PastPaperZone](https://pastpaperzone.lk)");

  return lines.join("\n");
}

async function telegram(
  method: string,
  body: Record<string, unknown>
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/${method}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.description || "Telegram API error");
  }

  return data.result;
}

async function sendMessage(
  chatId: number | string,
  text: string
) {
  return telegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  });
}

async function sendChannelPost(
  subjectId: string,
  level: Level,
  keys: string[]
) {
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!channelId) {
    throw new Error("TELEGRAM_CHANNEL_ID is not configured");
  }

  return sendMessage(
    channelId,
    buildPost(subjectId, level, keys)
  );
}

export async function POST(request: Request) {
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (
    webhookSecret &&
    request.headers.get("x-telegram-bot-api-secret-token") !==
      webhookSecret
  ) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const update = await request.json();

    // Telegram can send updates other than normal messages.
    const message = update?.message;

    if (!message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = Number(message.chat.id);
    const text =
      typeof message.text === "string"
        ? message.text.trim()
        : "";

    if (!text) {
      return NextResponse.json({ ok: true });
    }

    if (/^\/start\b/i.test(text) || /^\/help\b/i.test(text)) {
      await sendMessage(
        chatId,
        "👋 *PastPaperZone Bot*\n\n" +
          "📚 Subject එකක් type කරන්න:\n\n" +
          "`O/L සිංහල`\n" +
          "`O/L ගණිතය`\n" +
          "`A/L Physics`\n\n" +
          "Bot එක ඒ subject එකේ available paper years සහ Sinhala / English / Tamil links පෙන්වයි.\n\n" +
          "🔐 Admin:\n" +
          "`/post O/L ගණිතය`\n" +
          "`/post O/L සිංහල`"
      );

      return NextResponse.json({ ok: true });
    }

    if (/^\/id\b/i.test(text)) {
      await sendMessage(
        chatId,
        `🆔 Your Telegram Chat ID:\n\`${chatId}\``
      );

      return NextResponse.json({ ok: true });
    }

    /*
     * Channel publishing command.
     *
     * Examples:
     * /post O/L ගණිතය
     * /post O/L සිංහල
     * /post A/L Physics
     *
     * Only TELEGRAM_ADMIN_CHAT_ID can publish.
     */
    const postMatch = text.match(/^\/post(?:@\w+)?\s+(.+)$/i);

    if (postMatch) {
      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

      if (
        !adminChatId ||
        String(chatId) !== String(adminChatId)
      ) {
        await sendMessage(
          chatId,
          "⛔ Channel post create කරන්න admin account එකට විතරයි අවසර තියෙන්නේ."
        );

        return NextResponse.json({ ok: true });
      }

      const subject = findSubject(postMatch[1]);

      if (!subject) {
        await sendMessage(
          chatId,
          "❓ Subject එක හඳුනාගන්න බැරි වුණා.\n\n" +
            "උදා:\n" +
            "`/post O/L ගණිතය`\n" +
            "`/post O/L සිංහල`\n" +
            "`/post A/L Physics`"
        );

        return NextResponse.json({ ok: true });
      }

      const requestedYear = findYear(postMatch[1]);
      let keys = await listPaperKeys();

      keys = keys.filter(
        (key) => key.startsWith(`papers/${subject.id}/`)
      );

      if (requestedYear) {
        keys = keys.filter(
          (key) => key.includes(`/${requestedYear}/`)
        );
      }

      await sendChannelPost(
        subject.id,
        subject.level,
        keys
      );

      await sendMessage(
        chatId,
        `✅ *${subject.level} ${SUBJECT_NAMES[subject.id] || subject.id}* post එක channel එකට publish කළා.`
      );

      return NextResponse.json({ ok: true });
    }

    /*
     * Normal user search.
     *
     * Examples:
     * O/L සිංහල
     * O/L ගණිතය
     * A/L Physics
     * O/L Maths 2024
     */
    const subject = findSubject(text);

    if (!subject) {
      await sendMessage(
        chatId,
        "❓ Subject එක හඳුනාගන්න බැරි වුණා.\n\n" +
          "උදා:\n" +
          "`O/L ගණිතය`\n" +
          "`O/L සිංහල`\n" +
          "`A/L Physics`"
      );

      return NextResponse.json({ ok: true });
    }

    const year = findYear(text);

    let filtered = await listPaperKeys();

    filtered = filtered.filter(
      (key) => key.startsWith(`papers/${subject.id}/`)
    );

    if (year) {
      filtered = filtered.filter(
        (key) => key.includes(`/${year}/`)
      );
    }

    await sendMessage(
      chatId,
      buildPost(
        subject.id,
        subject.level,
        filtered
      )
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);

    return NextResponse.json({ ok: true });
  }
}
