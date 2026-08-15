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

/*
|--------------------------------------------------------------------------
| Subject aliases
|--------------------------------------------------------------------------
*/

const ALIASES: Array<[string[], string]> = [
  [
    [
      "ol maths",
      "o/l maths",
      "ol math",
      "o/l math",
      "maths",
      "math",
      "ගණන්",
      "ගණිතය",
      "ol ගණිතය",
      "o/l ගණිතය",
    ],
    "ol-maths",
  ],

  [
    [
      "ol science",
      "o/l science",
      "science",
      "විද්‍යාව",
      "ol විද්‍යාව",
      "o/l විද්‍යාව",
    ],
    "ol-science",
  ],

  [
    [
      "ol sinhala",
      "o/l sinhala",
      "sinhala",
      "සිංහල",
      "සිංහල පේපර්",
      "සිංහල භාෂාව",
      "ol සිංහල",
      "o/l සිංහල",
    ],
    "ol-sinhala",
  ],

  [
    [
      "ol english",
      "o/l english",
      "english",
      "ඉංග්‍රීසි",
      "ol ඉංග්‍රීසි",
      "o/l ඉංග්‍රීසි",
    ],
    "ol-english",
  ],

  [
    [
      "ol history",
      "o/l history",
      "history",
      "ඉතිහාසය",
      "ol ඉතිහාසය",
      "o/l ඉතිහාසය",
    ],
    "ol-history",
  ],

  [
    ["buddhism", "බුද්ධ ධර්මය", "බුද්ධාගම"],
    "ol-buddhism",
  ],

  [
    ["tamil", "දෙමළ", "දෙමළ භාෂාව"],
    "ol-tamil",
  ],

  [
    ["geography", "භූගෝල විද්‍යාව"],
    "ol-geography",
  ],

  [
    ["civic", "පුරවැසි", "පුරවැසි අධ්‍යාපනය"],
    "ol-civic",
  ],

  [
    ["ol ict", "o/l ict", "ol information technology"],
    "ol-ict",
  ],

  [
    [
      "al combined maths",
      "a/l combined maths",
      "combined maths",
      "combined math",
      "සංයුක්ත ගණිතය",
      "කොම්බයින්",
      "al සංයුක්ත ගණිතය",
    ],
    "al-combined-maths",
  ],

  [
    ["physics", "භෞතික විද්‍යාව", "al physics", "a/l physics"],
    "al-physics",
  ],

  [
    ["chemistry", "රසායන විද්‍යාව", "al chemistry", "a/l chemistry"],
    "al-chemistry",
  ],

  [
    ["biology", "ජීව විද්‍යාව", "al biology", "a/l biology"],
    "al-biology",
  ],

  [
    ["al ict", "a/l ict", "al information technology"],
    "al-ict",
  ],

  [
    ["accounting", "ගණකාධිකරණය", "al accounting"],
    "al-accounting",
  ],

  [
    ["business", "ව්‍යාපාර අධ්‍යයනය", "business studies"],
    "al-business",
  ],

  [
    ["economics", "ආර්ථික විද්‍යාව", "economics", "al economics"],
    "al-econ",
  ],
];

/*
|--------------------------------------------------------------------------
| Normalize text
|--------------------------------------------------------------------------
*/

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[“”‘’]/g, "")
    .replace(/[^\p{L}\p{N}/]+/gu, " ")
    .trim();
}

/*
|--------------------------------------------------------------------------
| Find subject
|--------------------------------------------------------------------------
*/

function findSubject(text: string) {
  const normalizedText = normalize(text);

  for (const [names, id] of ALIASES) {
    const found = names.some((name) =>
      normalizedText.includes(normalize(name))
    );

    if (found) {
      return ALL_SUBJECTS.find((subject) => subject.id === id) || null;
    }
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| Find year
|--------------------------------------------------------------------------
*/

function findYear(text: string) {
  return text.match(/\b(20\d{2})\b/)?.[1] || null;
}

/*
|--------------------------------------------------------------------------
| Get all papers from R2
|--------------------------------------------------------------------------
*/

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
    /^papers\/[^/]+\/20\d{2}\/(sinhala|english|tamil)\/paper\.pdf$/i.test(
      key
    )
  );
}

/*
|--------------------------------------------------------------------------
| Build paper URL
|--------------------------------------------------------------------------
*/

function paperPageUrl(
  level: Level,
  subjectId: string,
  year: string,
  medium: Medium
) {
  return `${BASE_URL}/si/papers/${level.toLowerCase()}/${subjectId}/${year}/${medium}`;
}

/*
|--------------------------------------------------------------------------
| Build Telegram paper response
|--------------------------------------------------------------------------
|
| Example:
|
| 📚 O/L ගණිතය Past Papers
|
| 🇱🇰 සිංහල මාධ්‍ය
| • 2024 — Paper
| • 2023 — Paper
|
| 🇬🇧 ඉංග්‍රීසි මාධ්‍ය
| • 2024 — Paper
|
| 🇱🇰 දෙමළ මාධ්‍ය
| • 2024 — Paper
|
|--------------------------------------------------------------------------
*/

function buildPost(
  subjectId: string,
  level: Level,
  keys: string[]
) {
  const subjectName =
    SUBJECT_NAMES[subjectId] || subjectId;

  const yearsByMedium: Record<Medium, string[]> = {
    sinhala: [],
    english: [],
    tamil: [],
  };

  /*
   * Read R2 keys
   */
  for (const key of keys) {
    const match = key.match(
      /^papers\/([^/]+)\/(20\d{2})\/(sinhala|english|tamil)\/paper\.pdf$/i
    );

    if (!match) continue;

    const keySubjectId = match[1];
    const year = match[2];
    const medium = match[3].toLowerCase() as Medium;

    if (keySubjectId !== subjectId) continue;

    if (!yearsByMedium[medium].includes(year)) {
      yearsByMedium[medium].push(year);
    }
  }

  /*
   * Newest year first
   */
  for (const medium of MEDIUMS) {
    yearsByMedium[medium].sort(
      (a, b) => Number(b) - Number(a)
    );
  }

  const totalYears =
    yearsByMedium.sinhala.length +
    yearsByMedium.english.length +
    yearsByMedium.tamil.length;

  /*
   * No papers
   */
  if (!totalYears) {
    return (
      `❌ *${level} ${subjectName}* සඳහා ` +
      `papers හමු වුණේ නැහැ.`
    );
  }

  const lines: string[] = [];

  lines.push(
    `📚 *${level} ${subjectName} Past Papers*`
  );

  lines.push("");

  lines.push(
    "අවශ්‍ය වර්ෂය click කර paper එක ලබාගන්න 👇"
  );

  lines.push("");

  /*
   * Sinhala
   */
  if (yearsByMedium.sinhala.length > 0) {
    lines.push(
      `*${MEDIUM_LABEL.sinhala}*`
    );

    for (const year of yearsByMedium.sinhala) {
      const url = paperPageUrl(
        level,
        subjectId,
        year,
        "sinhala"
      );

      lines.push(
        `• [${year} — Paper](${url})`
      );
    }

    lines.push("");
  }

  /*
   * English
   */
  if (yearsByMedium.english.length > 0) {
    lines.push(
      `*${MEDIUM_LABEL.english}*`
    );

    for (const year of yearsByMedium.english) {
      const url = paperPageUrl(
        level,
        subjectId,
        year,
        "english"
      );

      lines.push(
        `• [${year} — Paper](${url})`
      );
    }

    lines.push("");
  }

  /*
   * Tamil
   */
  if (yearsByMedium.tamil.length > 0) {
    lines.push(
      `*${MEDIUM_LABEL.tamil}*`
    );

    for (const year of yearsByMedium.tamil) {
      const url = paperPageUrl(
        level,
        subjectId,
        year,
        "tamil"
      );

      lines.push(
        `• [${year} — Paper](${url})`
      );
    }

    lines.push("");
  }

  lines.push(
    "🌐 [PastPaperZone](https://pastpaperzone.lk)"
  );

  return lines.join("\n");
}

/*
|--------------------------------------------------------------------------
| Telegram API
|--------------------------------------------------------------------------
*/

async function telegram(
  method: string,
  body: Record<string, unknown>
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN is not configured"
    );
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
    throw new Error(
      data.description || "Telegram API error"
    );
  }

  return data.result;
}

/*
|--------------------------------------------------------------------------
| Normal private message
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Reply to Discussion comment
|--------------------------------------------------------------------------
*/

async function replyToDiscussionComment(
  chatId: number | string,
  messageId: number,
  text: string
) {
  return telegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,

    /*
     * IMPORTANT:
     * Reply to the exact comment.
     */
    reply_to_message_id: messageId,

    /*
     * If the original comment disappears,
     * Telegram can still send the reply.
     */
    allow_sending_without_reply: true,
  });
}

/*
|--------------------------------------------------------------------------
| Admin channel post
|--------------------------------------------------------------------------
*/

async function sendChannelPost(
  subjectId: string,
  level: Level,
  keys: string[]
) {
  const channelId =
    process.env.TELEGRAM_CHANNEL_ID;

  if (!channelId) {
    throw new Error(
      "TELEGRAM_CHANNEL_ID is not configured"
    );
  }

  return sendMessage(
    channelId,
    buildPost(subjectId, level, keys)
  );
}

/*
|--------------------------------------------------------------------------
| Telegram Webhook
|--------------------------------------------------------------------------
*/

export async function POST(
  request: Request
) {
  const webhookSecret =
    process.env.TELEGRAM_WEBHOOK_SECRET;

  /*
   * Webhook security
   */
  if (
    webhookSecret &&
    request.headers.get(
      "x-telegram-bot-api-secret-token"
    ) !== webhookSecret
  ) {
    return NextResponse.json(
      { ok: false },
      { status: 401 }
    );
  }

  try {
    const update = await request.json();

    /*
    |--------------------------------------------------------------------------
    | 1. Get normal Telegram message
    |--------------------------------------------------------------------------
    */

    const message = update?.message;

    if (!message?.chat?.id) {
      return NextResponse.json({
        ok: true,
      });
    }

    const chatId = Number(message.chat.id);

    const text =
      typeof message.text === "string"
        ? message.text.trim()
        : "";

    /*
    |--------------------------------------------------------------------------
    | 2. Ignore messages without text
    |--------------------------------------------------------------------------
    */

    if (!text) {
      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 3. DISCUSSION GROUP
    |--------------------------------------------------------------------------
    |
    | This is the NEW part.
    |
    | Example:
    |
    | User comment:
    | O/L Maths
    |
    | Bot:
    | 📚 O/L ගණිතය Past Papers
    | ...
    |
    */

    const discussionChatId =
      process.env.TELEGRAM_DISCUSSION_CHAT_ID;

    if (
      discussionChatId &&
      String(chatId) ===
        String(discussionChatId)
    ) {
      /*
       * Do not interfere with /start or /help
       * inside the discussion.
       */

      if (
        /^\/start\b/i.test(text) ||
        /^\/help\b/i.test(text)
      ) {
        await sendMessage(
          chatId,
          "👋 *PastPaperZone Bot*\n\n" +
            "📚 Subject එකක් type කරන්න.\n\n" +
            "`O/L Maths`\n" +
            "`O/L Sinhala`\n" +
            "`A/L Physics`"
        );

        return NextResponse.json({
          ok: true,
        });
      }

      /*
       * /id command
       *
       * Useful for finding Discussion Group ID.
       */
      if (/^\/id\b/i.test(text)) {
        await sendMessage(
          chatId,
          `🆔 Discussion Chat ID:\n\`${chatId}\``
        );

        return NextResponse.json({
          ok: true,
        });
      }

      /*
       * Find requested subject
       */
      const subject = findSubject(text);

      /*
       * If user didn't ask for a supported subject,
       * don't reply.
       *
       * This is important because the bot should NOT
       * reply to every normal discussion comment.
       */
      if (!subject) {
        return NextResponse.json({
          ok: true,
        });
      }

      /*
       * Get all papers
       */
      const keys = await listPaperKeys();

      /*
       * Optional year
       *
       * Example:
       * O/L Maths 2024
       *
       * Then only 2024 will be returned.
       */
      const year = findYear(text);

      let filtered = keys.filter((key) =>
        key.startsWith(
          `papers/${subject.id}/`
        )
      );

      if (year) {
        filtered = filtered.filter((key) =>
          key.includes(`/${year}/`)
        );
      }

      /*
       * Build paper response
       */
      const responseText = buildPost(
        subject.id,
        subject.level as Level,
        filtered
      );

      /*
       * Reply directly to user's comment
       */
      await replyToDiscussionComment(
        chatId,
        Number(message.message_id),
        responseText
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 4. PRIVATE BOT / EXISTING FLOW
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | This section is kept separate from the discussion logic.
    |
    |--------------------------------------------------------------------------
    */

    /*
     * /start
     */
    if (
      /^\/start\b/i.test(text) ||
      /^\/help\b/i.test(text)
    ) {
      await sendMessage(
        chatId,

        "👋 *PastPaperZone Bot*\n\n" +
          "📚 `O/L Maths`, `O/L Sinhala`, `A/L Physics` වගේ subject එකක් type කරන්න.\n\n" +
          "උදාහරණ:\n" +
          "`O/L Sinhala paper`\n" +
          "`O/L Maths`\n" +
          "`A/L Physics 2024`\n\n" +
          "Bot එක available years සහ Sinhala / English / Tamil paper links පෙන්වයි.\n\n" +
          "Admin channel post: `post O/L Maths`"
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
     * /id
     */
    if (/^\/id\b/i.test(text)) {
      await sendMessage(
        chatId,
        `🆔 Your Telegram Chat ID:\n\`${chatId}\``
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 5. Normal private subject search
    |--------------------------------------------------------------------------
    */

    const subject = findSubject(text);

    if (!subject) {
      await sendMessage(
        chatId,

        "❓ Subject එක හඳුනාගන්න බැරි වුණා.\n\n" +
          "උදා: `O/L ගණිතය`, `O/L සිංහල`, `A/L Physics` කියලා type කරන්න."
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Get papers
    |--------------------------------------------------------------------------
    */

    const level = subject.level as Level;

    const keys = await listPaperKeys();

    const year = findYear(text);

    let filtered = keys.filter((key) =>
      key.startsWith(
        `papers/${subject.id}/`
      )
    );

    /*
     * If a year was requested,
     * return that year only.
     */
    if (year) {
      filtered = filtered.filter((key) =>
        key.includes(`/${year}/`)
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 7. Admin "post" command
    |--------------------------------------------------------------------------
    |
    | Existing admin function.
    |
    | Example:
    | post O/L Maths
    |
    |--------------------------------------------------------------------------
    */

    if (/^post\b/i.test(text)) {
      const adminChatId =
        process.env.TELEGRAM_ADMIN_CHAT_ID;

      if (
        !adminChatId ||
        String(chatId) !==
          String(adminChatId)
      ) {
        await sendMessage(
          chatId,
          "⛔ Channel post create කරන්න admin account එකට විතරයි අවසර තියෙන්නේ."
        );

        return NextResponse.json({
          ok: true,
        });
      }

      await sendChannelPost(
        subject.id,
        level,
        filtered
      );

      await sendMessage(
        chatId,

        `✅ ${level} ${
          SUBJECT_NAMES[subject.id] ||
          subject.id
        } post එක channel එකට publish කළා.`
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 8. Normal private search result
    |--------------------------------------------------------------------------
    */

    await sendMessage(
      chatId,
      buildPost(
        subject.id,
        level,
        filtered
      )
    );

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "Telegram webhook error:",
      error
    );

    /*
     * Telegram expects a successful webhook response.
     */
    return NextResponse.json({
      ok: true,
    });
  }
}