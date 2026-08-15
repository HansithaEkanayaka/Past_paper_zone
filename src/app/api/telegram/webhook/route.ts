import { NextResponse } from "next/server";
import { getR2Bucket } from "@/lib/r2";
import {
  ALL_SUBJECTS,
  OL_SUBJECTS,
  AL_SUBJECTS,
} from "@/lib/subjects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL = "https://pastpaperzone.lk";

const DISCUSSION_CHAT_ID = "-1003769963583";

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
  "al-ict": "තොරතුරු තාක්ෂණය",
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
| Send message
|--------------------------------------------------------------------------
*/

async function sendMessage(
  chatId: number | string,
  text: string,
  replyMarkup?: Record<string, unknown>
) {
  return telegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    ...(replyMarkup
      ? { reply_markup: replyMarkup }
      : {}),
  });
}

/*
|--------------------------------------------------------------------------
| Answer callback
|--------------------------------------------------------------------------
*/

async function answerCallbackQuery(
  callbackQueryId: string
) {
  return telegram("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
  });
}

/*
|--------------------------------------------------------------------------
| Normalize text
|--------------------------------------------------------------------------
*/

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[“”‘’]/g, "")
    .replace(/[^\p{L}\p{N}/]+/gu, " ")
    .trim();
}

/*
|--------------------------------------------------------------------------
| Discussion aliases
|--------------------------------------------------------------------------
*/

const DISCUSSION_ALIASES: Array<
  [string[], string]
> = [
  [
    [
      "o level maths",
      "o-level maths",
      "o/l maths",
      "ol maths",
      "o level math",
      "o/l math",
      "ol math",
      "maths",
      "math",
      "ගණිතය",
      "ගණන්",
    ],
    "ol-maths",
  ],

  [
    [
      "o level science",
      "o-level science",
      "o/l science",
      "ol science",
      "science",
      "විද්‍යාව",
    ],
    "ol-science",
  ],

  [
    [
      "o level sinhala",
      "o-level sinhala",
      "o/l sinhala",
      "ol sinhala",
      "sinhala",
      "සිංහල",
      "සිංහල පේපර්",
    ],
    "ol-sinhala",
  ],

  [
    [
      "o level english",
      "o-level english",
      "o/l english",
      "ol english",
      "english",
      "ඉංග්‍රීසි",
    ],
    "ol-english",
  ],

  [
    [
      "o level history",
      "o-level history",
      "o/l history",
      "ol history",
      "history",
      "ඉතිහාසය",
    ],
    "ol-history",
  ],

  [
    [
      "al physics",
      "a/l physics",
      "a level physics",
      "a-level physics",
      "physics",
      "භෞතික විද්‍යාව",
    ],
    "al-physics",
  ],

  [
    [
      "al chemistry",
      "a/l chemistry",
      "a level chemistry",
      "a-level chemistry",
      "chemistry",
      "රසායන විද්‍යාව",
    ],
    "al-chemistry",
  ],

  [
    [
      "al biology",
      "a/l biology",
      "a level biology",
      "a-level biology",
      "biology",
      "ජීව විද්‍යාව",
    ],
    "al-biology",
  ],

  [
    [
      "al combined maths",
      "a/l combined maths",
      "a level combined maths",
      "a-level combined maths",
      "combined maths",
      "combined math",
      "සංයුක්ත ගණිතය",
    ],
    "al-combined-maths",
  ],

  [
    [
      "al ict",
      "a/l ict",
      "a level ict",
      "a-level ict",
    ],
    "al-ict",
  ],

  [
    [
      "al accounting",
      "a/l accounting",
      "a level accounting",
      "accounting",
      "ගණකාධිකරණය",
    ],
    "al-accounting",
  ],

  [
    [
      "al business",
      "a/l business",
      "a level business",
      "business studies",
      "ව්‍යාපාර අධ්‍යයනය",
    ],
    "al-business",
  ],

  [
    [
      "al economics",
      "a/l economics",
      "a level economics",
      "economics",
      "ආර්ථික විද්‍යාව",
    ],
    "al-econ",
  ],
];

/*
|--------------------------------------------------------------------------
| Find subject from Discussion message
|--------------------------------------------------------------------------
*/

function findDiscussionSubject(text: string) {
  const normalized = normalize(text);

  for (const [aliases, subjectId] of DISCUSSION_ALIASES) {
    if (
      aliases.some((alias) =>
        normalized.includes(normalize(alias))
      )
    ) {
      return (
        ALL_SUBJECTS.find(
          (subject) => subject.id === subjectId
        ) || null
      );
    }
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| R2 papers
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

    keys.push(
      ...page.objects.map(
        (object) => object.key
      )
    );

    cursor = page.truncated
      ? page.cursor
      : undefined;
  } while (cursor);

  return keys.filter((key) =>
    /^papers\/[^/]+\/20\d{2}\/(sinhala|english|tamil)\/paper\.pdf$/i.test(
      key
    )
  );
}

/*
|--------------------------------------------------------------------------
| Extract paper information
|--------------------------------------------------------------------------
*/

function getPaperInfo(key: string) {
  const match = key.match(
    /^papers\/([^/]+)\/(20\d{2})\/(sinhala|english|tamil)\/paper\.pdf$/i
  );

  if (!match) {
    return null;
  }

  return {
    subjectId: match[1],
    year: match[2],
    medium: match[3].toLowerCase() as Medium,
  };
}

/*
|--------------------------------------------------------------------------
| Get available years
|--------------------------------------------------------------------------
*/

function getAvailableYears(
  subjectId: string,
  keys: string[]
) {
  const years = new Set<string>();

  for (const key of keys) {
    const info = getPaperInfo(key);

    if (
      info &&
      info.subjectId === subjectId
    ) {
      years.add(info.year);
    }
  }

  return [...years].sort(
    (a, b) => Number(b) - Number(a)
  );
}

/*
|--------------------------------------------------------------------------
| Check paper
|--------------------------------------------------------------------------
*/

function hasPaper(
  subjectId: string,
  year: string,
  medium: Medium,
  keys: string[]
) {
  return keys.some((key) => {
    const info = getPaperInfo(key);

    return (
      info?.subjectId === subjectId &&
      info.year === year &&
      info.medium === medium
    );
  });
}

/*
|--------------------------------------------------------------------------
| Website paper URL
|--------------------------------------------------------------------------
*/

function paperUrl(
  subjectId: string,
  year: string,
  medium: Medium
) {
  const subject = ALL_SUBJECTS.find(
    (item) => item.id === subjectId
  );

  const level =
    subject?.level.toLowerCase() || "ol";

  return `${BASE_URL}/si/papers/${level}/${subjectId}/${year}/${medium}`;
}

/*
|--------------------------------------------------------------------------
| /start
|--------------------------------------------------------------------------
*/

async function showStartMenu(
  chatId: number | string
) {
  await sendMessage(
    chatId,

    "👋 *PastPaperZone වෙත සාදරයෙන් පිළිගනිමු!*\n\n" +
      "ඔබට අවශ්‍ය විභාග මට්ටම තෝරන්න 👇",

    {
      inline_keyboard: [
        [
          {
            text: "📘 O/L",
            callback_data: "ppz:level:OL",
          },
          {
            text: "📕 A/L",
            callback_data: "ppz:level:AL",
          },
        ],
      ],
    }
  );
}

/*
|--------------------------------------------------------------------------
| Subject menu
|--------------------------------------------------------------------------
*/

async function showSubjectMenu(
  chatId: number | string,
  level: Level
) {
  const subjects =
    level === "OL"
      ? OL_SUBJECTS
      : AL_SUBJECTS;

  const buttons: Array<
    Array<{
      text: string;
      callback_data: string;
    }>
  > = [];

  for (
    let i = 0;
    i < subjects.length;
    i += 2
  ) {
    const row = [];

    const first = subjects[i];

    row.push({
      text:
        SUBJECT_NAMES[first.id] ||
        first.id,
      callback_data: `ppz:subject:${first.id}`,
    });

    if (subjects[i + 1]) {
      const second = subjects[i + 1];

      row.push({
        text:
          SUBJECT_NAMES[second.id] ||
          second.id,
        callback_data: `ppz:subject:${second.id}`,
      });
    }

    buttons.push(row);
  }

  await sendMessage(
    chatId,

    `📚 *${level} Subjects*\n\nවිෂය තෝරන්න 👇`,

    {
      inline_keyboard: buttons,
    }
  );
}

/*
|--------------------------------------------------------------------------
| Year menu
|--------------------------------------------------------------------------
*/

async function showYearMenu(
  chatId: number | string,
  subjectId: string,
  keys: string[]
) {
  const subject =
    ALL_SUBJECTS.find(
      (item) => item.id === subjectId
    );

  if (!subject) {
    await sendMessage(
      chatId,
      "❌ Subject එක හමු වුණේ නැහැ."
    );

    return;
  }

  const years = getAvailableYears(
    subjectId,
    keys
  );

  if (!years.length) {
    await sendMessage(
      chatId,

      `❌ *${
        SUBJECT_NAMES[subjectId] ||
        subjectId
      }* සඳහා papers හමු වුණේ නැහැ.`
    );

    return;
  }

  const buttons: Array<
    Array<{
      text: string;
      callback_data: string;
    }>
  > = [];

  for (let i = 0; i < years.length; i += 3) {
    const row = [];

    for (let j = i; j < i + 3; j++) {
      if (!years[j]) continue;

      row.push({
        text: years[j],
        callback_data: `ppz:year:${subjectId}:${years[j]}`,
      });
    }

    buttons.push(row);
  }

  await sendMessage(
    chatId,

    `📚 *${
      SUBJECT_NAMES[subjectId] ||
      subjectId
    }*\n\n` +
      "📅 අවශ්‍ය වර්ෂය තෝරන්න 👇",

    {
      inline_keyboard: buttons,
    }
  );
}

/*
|--------------------------------------------------------------------------
| Medium menu
|--------------------------------------------------------------------------
*/

async function showMediumMenu(
  chatId: number | string,
  subjectId: string,
  year: string,
  keys: string[]
) {
  const buttons: Array<
    Array<{
      text: string;
      callback_data: string;
    }>
  > = [];

  for (const medium of MEDIUMS) {
    if (
      hasPaper(
        subjectId,
        year,
        medium,
        keys
      )
    ) {
      buttons.push([
        {
          text: MEDIUM_LABEL[medium],
          callback_data: `ppz:medium:${subjectId}:${year}:${medium}`,
        },
      ]);
    }
  }

  if (!buttons.length) {
    await sendMessage(
      chatId,
      "❌ මේ වර්ෂයට paper එකක් හමු වුණේ නැහැ."
    );

    return;
  }

  await sendMessage(
    chatId,

    `📅 *${year}*\n\n` +
      "🌐 Medium එක තෝරන්න 👇",

    {
      inline_keyboard: buttons,
    }
  );
}

/*
|--------------------------------------------------------------------------
| Final paper
|--------------------------------------------------------------------------
*/

async function showPaper(
  chatId: number | string,
  subjectId: string,
  year: string,
  medium: Medium,
  keys: string[]
) {
  if (
    !hasPaper(
      subjectId,
      year,
      medium,
      keys
    )
  ) {
    await sendMessage(
      chatId,
      "❌ මේ paper එක දැනට available නැහැ."
    );

    return;
  }

  const subjectName =
    SUBJECT_NAMES[subjectId] ||
    subjectId;

  const url = paperUrl(
    subjectId,
    year,
    medium
  );

  await sendMessage(
    chatId,

    `📚 *${subjectName}*\n\n` +
      `📅 Year: *${year}*\n` +
      `${MEDIUM_LABEL[medium]}\n\n` +
      "Paper එක ලබාගැනීමට පහත button එක click කරන්න 👇",

    {
      inline_keyboard: [
        [
          {
            text: "📄 View / Download Paper",
            url,
          },
        ],
        [
          {
            text: "🌐 Open PastPaperZone",
            url: BASE_URL,
          },
        ],
      ],
    }
  );
}

/*
|--------------------------------------------------------------------------
| Discussion post
|--------------------------------------------------------------------------
*/

async function sendDiscussionReply(
  chatId: number | string,
  messageId: number,
  subjectId: string,
  keys: string[]
) {
  const subject =
    ALL_SUBJECTS.find(
      (item) => item.id === subjectId
    );

  if (!subject) return;

  const subjectName =
    SUBJECT_NAMES[subjectId] ||
    subjectId;

  const level = subject.level;

  const lines: string[] = [];

  lines.push(
    `📚 *${level} ${subjectName} Past Papers*`
  );

  lines.push("");

  lines.push(
    "පහත අවශ්‍ය මාධ්‍යය සහ වර්ෂය තෝරන්න 👇"
  );

  lines.push("");

  const keyboard: Array<
    Array<{
      text: string;
      url: string;
    }>
  > = [];

  for (const medium of MEDIUMS) {
    const years = new Set<string>();

    for (const key of keys) {
      const info = getPaperInfo(key);

      if (
        info &&
        info.subjectId === subjectId &&
        info.medium === medium
      ) {
        years.add(info.year);
      }
    }

    const sortedYears = [...years].sort(
      (a, b) => Number(b) - Number(a)
    );

    if (!sortedYears.length) continue;

    lines.push(
      `*${MEDIUM_LABEL[medium]}*`
    );

    const mediumButtons: Array<{
      text: string;
      url: string;
    }> = [];

    for (const year of sortedYears) {
      mediumButtons.push({
        text: year,
        url: paperUrl(
          subjectId,
          year,
          medium
        ),
      });
    }

    keyboard.push(mediumButtons);

    lines.push(
      sortedYears
        .map(
          (year) =>
            `• ${year} — [Paper](${paperUrl(
              subjectId,
              year,
              medium
            )})`
        )
        .join("\n")
    );

    lines.push("");
  }

  lines.push(
    "🌐 [PastPaperZone](https://pastpaperzone.lk)"
  );

  await telegram("sendMessage", {
    chat_id: chatId,
    text: lines.join("\n"),
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_to_message_id: messageId,
    allow_sending_without_reply: true,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}

/*
|--------------------------------------------------------------------------
| Handle callback buttons
|--------------------------------------------------------------------------
*/

async function handleCallbackQuery(
  callbackQuery: any
) {
  const callbackId =
    callbackQuery.id;

  const data =
    typeof callbackQuery.data === "string"
      ? callbackQuery.data
      : "";

  const message =
    callbackQuery.message;

  if (!message?.chat?.id) {
    await answerCallbackQuery(
      callbackId
    );

    return;
  }

  const chatId =
    message.chat.id;

  await answerCallbackQuery(
    callbackId
  );

  const keys =
    await listPaperKeys();

  /*
   * LEVEL
   */

  if (data === "ppz:level:OL") {
    await showSubjectMenu(
      chatId,
      "OL"
    );

    return;
  }

  if (data === "ppz:level:AL") {
    await showSubjectMenu(
      chatId,
      "AL"
    );

    return;
  }

  /*
   * SUBJECT
   */

  if (data.startsWith("ppz:subject:")) {
    const subjectId =
      data.replace(
        "ppz:subject:",
        ""
      );

    const subject =
      ALL_SUBJECTS.find(
        (item) =>
          item.id === subjectId
      );

    if (!subject) {
      await sendMessage(
        chatId,
        "❌ Subject එක හමු වුණේ නැහැ."
      );

      return;
    }

    await showYearMenu(
      chatId,
      subjectId,
      keys
    );

    return;
  }

  /*
   * YEAR
   */

  if (data.startsWith("ppz:year:")) {
    const parts =
      data.split(":");

    const subjectId = parts[2];
    const year = parts[3];

    await showMediumMenu(
      chatId,
      subjectId,
      year,
      keys
    );

    return;
  }

  /*
   * MEDIUM
   */

  if (data.startsWith("ppz:medium:")) {
    const parts =
      data.split(":");

    const subjectId = parts[2];
    const year = parts[3];
    const medium =
      parts[4] as Medium;

    await showPaper(
      chatId,
      subjectId,
      year,
      medium,
      keys
    );

    return;
  }
}

/*
|--------------------------------------------------------------------------
| POST WEBHOOK
|--------------------------------------------------------------------------
*/

export async function POST(
  request: Request
) {
  const webhookSecret =
    process.env.TELEGRAM_WEBHOOK_SECRET;

  if (
    webhookSecret &&
    request.headers.get(
      "x-telegram-bot-api-secret-token"
    ) !== webhookSecret
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const update =
      await request.json();

    /*
    |--------------------------------------------------------------------------
    | CALLBACK QUERY
    |--------------------------------------------------------------------------
    */

    if (update?.callback_query) {
      await handleCallbackQuery(
        update.callback_query
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | NORMAL MESSAGE
    |--------------------------------------------------------------------------
    */

    const message =
      update?.message;

    if (!message?.chat?.id) {
      return NextResponse.json({
        ok: true,
      });
    }

    const chatId =
      message.chat.id;

    const text =
      typeof message.text === "string"
        ? message.text.trim()
        : "";

    if (!text) {
      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | DISCUSSION GROUP
    |--------------------------------------------------------------------------
    |
    | ONLY Discussion Group messages use this logic.
    |
    | Private /start is NOT affected.
    |
    */

    if (
      String(chatId) ===
      DISCUSSION_CHAT_ID
    ) {
      /*
       * Ignore commands in discussion.
       */

      if (
        text.startsWith("/")
      ) {
        return NextResponse.json({
          ok: true,
        });
      }

      const discussionSubject =
        findDiscussionSubject(text);

      /*
       * Normal discussion comments
       * are ignored.
       */

      if (!discussionSubject) {
        return NextResponse.json({
          ok: true,
        });
      }

      const keys =
        await listPaperKeys();

      /*
       * Send formatted paper post
       * as a reply to the comment.
       */

      await sendDiscussionReply(
        chatId,
        Number(message.message_id),
        discussionSubject.id,
        keys
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | PRIVATE BOT
    |--------------------------------------------------------------------------
    |
    | /start MUST show the original selection flow.
    |
    */

    if (
      /^\/start\b/i.test(text)
    ) {
      await showStartMenu(
        chatId
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | /help
    |--------------------------------------------------------------------------
    */

    if (
      /^\/help\b/i.test(text)
    ) {
      await sendMessage(
        chatId,

        "📚 *PastPaperZone Bot*\n\n" +
          "Start button එකෙන් O/L හෝ A/L තෝරන්න.\n\n" +
          "ඊට පස්සේ:\n" +
          "1️⃣ Subject\n" +
          "2️⃣ Year\n" +
          "3️⃣ Medium\n" +
          "4️⃣ Paper\n\n" +
          "📄 Paper එක PastPaperZone website එකෙන් ලබාගන්න පුළුවන්."
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | /id
    |--------------------------------------------------------------------------
    */

    if (
      /^\/id\b/i.test(text)
    ) {
      await sendMessage(
        chatId,
        `🆔 Chat ID:\n\`${chatId}\``
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | /subjects
    |--------------------------------------------------------------------------
    */

    if (
      /^\/subjects\b/i.test(text)
    ) {
      await showSubjectMenu(
        chatId,
        "OL"
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | /papers
    |--------------------------------------------------------------------------
    */

    if (
      /^\/papers\b/i.test(text)
    ) {
      await showStartMenu(
        chatId
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Ignore normal private text
    |--------------------------------------------------------------------------
    |
    | We DO NOT automatically search from arbitrary text.
    | User should use the button flow.
    |
    */

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "Telegram webhook error:",
      error
    );

    /*
     * Return 200 so Telegram doesn't endlessly
     * retry a bad update.
     */
    return NextResponse.json({
      ok: true,
    });
  }
}

/*
|--------------------------------------------------------------------------
| GET health check
|--------------------------------------------------------------------------
*/

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "PastPaperZone Telegram Webhook",
    webhook: "active",
  });
}