// src/lib/telegramChannelPost.ts
//
// Creates a branded dynamic Telegram channel post for every new paper.
//
// The graphic is generated as SVG so it works with the Cloudflare/OpenNext
// environment without requiring native canvas/sharp dependencies.

import { ALL_SUBJECTS } from "@/lib/subjects";

const BASE_URL = "https://pastpaperzone.lk";

type Medium = "sinhala" | "english" | "tamil";
type DocType = "paper" | "marking";

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

/* -------------------------------------------------------------------------- */
/* Telegram helper                                                            */
/* -------------------------------------------------------------------------- */

async function telegram(
  token: string,
  method: string,
  body: Record<string, unknown>
) {
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

/* -------------------------------------------------------------------------- */
/* SVG helpers                                                                */
/* -------------------------------------------------------------------------- */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return value.slice(0, max - 1).trimEnd() + "…";
}

/* -------------------------------------------------------------------------- */
/* Dynamic branded graphic                                                    */
/* -------------------------------------------------------------------------- */

function createDynamicGraphic(params: {
  subject: string;
  year: string;
  medium: string;
  level: string;
  docType: string;
}): string {
  const {
    subject,
    year,
    medium,
    level,
    docType,
  } = params;

  const safeSubject = escapeXml(subject);
  const safeYear = escapeXml(year);
  const safeMedium = escapeXml(medium);

  const documentType =
    docType === "marking"
      ? "MARKING SCHEME"
      : "QUESTION PAPER";

  const safeDocumentType = escapeXml(documentType);

  /*
   * Long subject names get a slightly smaller font.
   */
  let subjectFontSize = 58;

  if (subject.length > 20) {
    subjectFontSize = 48;
  }

  if (subject.length > 28) {
    subjectFontSize = 40;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1200"
  height="630"
  viewBox="0 0 1200 630"
>

  <defs>

    <!-- Main background -->
    <linearGradient
      id="background"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop
        offset="0%"
        stop-color="#06152d"
      />

      <stop
        offset="100%"
        stop-color="#0d2748"
      />
    </linearGradient>

    <!-- Orange gradient -->
    <linearGradient
      id="orange"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop
        offset="0%"
        stop-color="#ffb020"
      />

      <stop
        offset="100%"
        stop-color="#f28c00"
      />
    </linearGradient>

    <!-- Glow -->
    <radialGradient
      id="glow"
      cx="50%"
      cy="50%"
      r="50%"
    >
      <stop
        offset="0%"
        stop-color="#ffad18"
        stop-opacity="0.25"
      />

      <stop
        offset="100%"
        stop-color="#ffad18"
        stop-opacity="0"
      />
    </radialGradient>

    <!-- Shadow -->
    <filter
      id="shadow"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
    >
      <feDropShadow
        dx="0"
        dy="10"
        stdDeviation="15"
        flood-color="#000000"
        flood-opacity="0.35"
      />
    </filter>

  </defs>


  <!-- ================================================================== -->
  <!-- BACKGROUND                                                         -->
  <!-- ================================================================== -->

  <rect
    width="1200"
    height="630"
    fill="#020b18"
  />

  <rect
    x="0"
    y="0"
    width="1200"
    height="10"
    fill="#f59e0b"
  />

  <rect
    x="0"
    y="620"
    width="1200"
    height="10"
    fill="#f59e0b"
  />


  <!-- ================================================================== -->
  <!-- MAIN CARD                                                          -->
  <!-- ================================================================== -->

  <rect
    x="40"
    y="30"
    width="1120"
    height="570"
    rx="20"
    fill="url(#background)"
    filter="url(#shadow)"
  />

  <!-- Left orange accent -->

  <rect
    x="40"
    y="30"
    width="10"
    height="570"
    rx="5"
    fill="#f59e0b"
  />


  <!-- ================================================================== -->
  <!-- DECORATIVE GLOW                                                    -->
  <!-- ================================================================== -->

  <circle
    cx="920"
    cy="320"
    r="250"
    fill="url(#glow)"
  />

  <circle
    cx="920"
    cy="320"
    r="170"
    fill="none"
    stroke="#f59e0b"
    stroke-opacity="0.08"
    stroke-width="2"
  />

  <circle
    cx="920"
    cy="320"
    r="190"
    fill="none"
    stroke="#f59e0b"
    stroke-opacity="0.06"
    stroke-width="2"
    stroke-dasharray="6 12"
  />


  <!-- ================================================================== -->
  <!-- BRAND                                                              -->
  <!-- ================================================================== -->

  <!-- Logo box -->

  <rect
    x="85"
    y="65"
    width="70"
    height="70"
    rx="16"
    fill="url(#orange)"
  />

  <!-- Book icon -->

  <path
    d="
      M101 85
      C112 80 122 82 130 88
      L130 120
      C121 114 111 113 101 118
      Z
    "
    fill="#06152d"
  />

  <path
    d="
      M130 88
      C138 82 148 80 157 85
      L157 118
      C147 113 138 114 130 120
      Z
    "
    fill="#06152d"
  />


  <!-- Brand name -->

  <text
    x="175"
    y="91"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="30"
    font-weight="800"
    letter-spacing="1"
  >
    PAST
  </text>

  <text
    x="175"
    y="122"
    fill="#f59e0b"
    font-family="Arial, Helvetica, sans-serif"
    font-size="30"
    font-weight="800"
    letter-spacing="1"
  >
    PAPER
  </text>

  <text
    x="325"
    y="122"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="30"
    font-weight="800"
    letter-spacing="1"
  >
    ZONE
  </text>


  <text
    x="175"
    y="150"
    fill="#aebbd0"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13"
    font-weight="600"
    letter-spacing="2"
  >
    YOUR PAST PAPERS, YOUR SUCCESS
  </text>


  <!-- ================================================================== -->
  <!-- TOP RIGHT                                                          -->
  <!-- ================================================================== -->

  <path
    d="
      M870 30
      H1130
      V150
      C1050 150 980 115 940 75
      C920 55 895 40 870 30
      Z
    "
    fill="#ffffff"
  />

  <text
    x="900"
    y="72"
    fill="#071a35"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18"
    font-weight="700"
  >
    DOWNLOAD
  </text>

  <text
    x="900"
    y="98"
    fill="#f59e0b"
    font-family="Arial, Helvetica, sans-serif"
    font-size="19"
    font-weight="800"
  >
    FREE PAST PAPERS
  </text>

  <text
    x="900"
    y="124"
    fill="#071a35"
    font-family="Arial, Helvetica, sans-serif"
    font-size="14"
    font-weight="600"
  >
    pastpaperzone.lk
  </text>


  <!-- ================================================================== -->
  <!-- LEVEL / YEAR                                                       -->
  <!-- ================================================================== -->

  <rect
    x="85"
    y="205"
    width="120"
    height="62"
    rx="12"
    fill="url(#orange)"
  />

  <text
    x="145"
    y="247"
    text-anchor="middle"
    fill="#06152d"
    font-family="Arial, Helvetica, sans-serif"
    font-size="31"
    font-weight="900"
  >
    ${escapeXml(level)}
  </text>


  <text
    x="235"
    y="257"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="72"
    font-weight="900"
    letter-spacing="2"
  >
    ${safeYear}
  </text>


  <!-- ================================================================== -->
  <!-- SUBJECT                                                            -->
  <!-- ================================================================== -->

  <rect
    x="85"
    y="290"
    width="570"
    height="4"
    rx="2"
    fill="url(#orange)"
  />

  <text
    x="85"
    y="355"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="${subjectFontSize}"
    font-weight="900"
    letter-spacing="0.5"
  >
    ${safeSubject}
  </text>


  <!-- ================================================================== -->
  <!-- MEDIUM                                                             -->
  <!-- ================================================================== -->

  <rect
    x="85"
    y="385"
    width="570"
    height="58"
    rx="12"
    fill="#102f53"
    stroke="#f59e0b"
    stroke-opacity="0.8"
    stroke-width="1.5"
  />

  <!-- Small book icon -->

  <rect
    x="105"
    y="401"
    width="30"
    height="28"
    rx="3"
    fill="none"
    stroke="#f59e0b"
    stroke-width="3"
  />

  <line
    x1="120"
    y1="402"
    x2="120"
    y2="428"
    stroke="#f59e0b"
    stroke-width="2"
  />

  <text
    x="155"
    y="422"
    fill="#e3eaf4"
    font-family="Arial, Helvetica, sans-serif"
    font-size="22"
    font-weight="700"
    letter-spacing="0.5"
  >
    ${safeMedium}
  </text>


  <!-- ================================================================== -->
  <!-- DOCUMENT TYPE                                                      -->
  <!-- ================================================================== -->

  <!-- Paper icon -->

  <rect
    x="87"
    y="474"
    width="36"
    height="43"
    rx="3"
    fill="none"
    stroke="#f59e0b"
    stroke-width="3"
  />

  <line
    x1="95"
    y1="488"
    x2="115"
    y2="488"
    stroke="#f59e0b"
    stroke-width="2"
  />

  <line
    x1="95"
    y1="497"
    x2="115"
    y2="497"
    stroke="#f59e0b"
    stroke-width="2"
  />

  <line
    x1="95"
    y1="506"
    x2="110"
    y2="506"
    stroke="#f59e0b"
    stroke-width="2"
  />

  <text
    x="145"
    y="503"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="24"
    font-weight="800"
    letter-spacing="0.5"
  >
    ${safeDocumentType}
  </text>


  <!-- ================================================================== -->
  <!-- RIGHT GLOBE                                                        -->
  <!-- ================================================================== -->

  <circle
    cx="895"
    cy="330"
    r="125"
    fill="none"
    stroke="#f59e0b"
    stroke-width="5"
  />

  <circle
    cx="895"
    cy="330"
    r="110"
    fill="#071a35"
    stroke="#ffffff"
    stroke-opacity="0.15"
    stroke-width="2"
  />

  <!-- Globe -->

  <ellipse
    cx="895"
    cy="330"
    rx="72"
    ry="105"
    fill="none"
    stroke="#ffffff"
    stroke-width="4"
  />

  <ellipse
    cx="895"
    cy="330"
    rx="35"
    ry="105"
    fill="none"
    stroke="#ffffff"
    stroke-opacity="0.7"
    stroke-width="3"
  />

  <line
    x1="823"
    y1="330"
    x2="967"
    y2="330"
    stroke="#ffffff"
    stroke-width="4"
  />

  <ellipse
    cx="895"
    cy="330"
    rx="72"
    ry="45"
    fill="none"
    stroke="#ffffff"
    stroke-opacity="0.7"
    stroke-width="3"
  />

  <ellipse
    cx="895"
    cy="330"
    rx="72"
    ry="75"
    fill="none"
    stroke="#ffffff"
    stroke-opacity="0.45"
    stroke-width="2"
  />

  <!-- Globe stand -->

  <line
    x1="895"
    y1="435"
    x2="895"
    y2="465"
    stroke="#ffffff"
    stroke-width="6"
  />

  <line
    x1="855"
    y1="465"
    x2="935"
    y2="465"
    stroke="#ffffff"
    stroke-width="7"
    stroke-linecap="round"
  />


  <!-- ================================================================== -->
  <!-- DECORATIVE DOTS                                                    -->
  <!-- ================================================================== -->

  <g fill="#f59e0b">

    <circle cx="755" cy="225" r="3"/>
    <circle cx="770" cy="225" r="3"/>
    <circle cx="785" cy="225" r="3"/>

    <circle cx="755" cy="240" r="3"/>
    <circle cx="770" cy="240" r="3"/>
    <circle cx="785" cy="240" r="3"/>

    <circle cx="1010" cy="475" r="3"/>
    <circle cx="1025" cy="475" r="3"/>
    <circle cx="1040" cy="475" r="3"/>

    <circle cx="1010" cy="490" r="3"/>
    <circle cx="1025" cy="490" r="3"/>
    <circle cx="1040" cy="490" r="3"/>

  </g>


  <!-- ================================================================== -->
  <!-- BOTTOM BAR                                                         -->
  <!-- ================================================================== -->

  <rect
    x="40"
    y="535"
    width="1120"
    height="65"
    rx="0 0 20 20"
    fill="#06162c"
  />

  <line
    x1="340"
    y1="550"
    x2="340"
    y2="585"
    stroke="#61738c"
    stroke-width="1"
  />

  <line
    x1="600"
    y1="550"
    x2="600"
    y2="585"
    stroke="#61738c"
    stroke-width="1"
  />

  <line
    x1="850"
    y1="550"
    x2="850"
    y2="585"
    stroke="#61738c"
    stroke-width="1"
  />


  <text
    x="75"
    y="560"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13"
    font-weight="800"
  >
    RELIABLE
  </text>

  <text
    x="75"
    y="580"
    fill="#c7d2e2"
    font-family="Arial, Helvetica, sans-serif"
    font-size="12"
    font-weight="600"
  >
    TRUSTED
  </text>


  <text
    x="385"
    y="570"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="15"
    font-weight="800"
  >
    FREE DOWNLOAD
  </text>


  <text
    x="645"
    y="570"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="15"
    font-weight="800"
  >
    100% SAFE
  </text>


  <text
    x="885"
    y="560"
    fill="#ffffff"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13"
    font-weight="800"
  >
    PAST PAPERS
  </text>

  <text
    x="885"
    y="580"
    fill="#c7d2e2"
    font-family="Arial, Helvetica, sans-serif"
    font-size="12"
    font-weight="600"
  >
    &amp; MARKING SCHEMES
  </text>


</svg>`;
}

/* -------------------------------------------------------------------------- */
/* SVG → Telegram                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Telegram's sendPhoto does not reliably accept an SVG string as a photo.
 *
 * Therefore we expose the SVG through a data URL.
 *
 * NOTE:
 * Telegram may reject data URLs depending on its current API behavior.
 * If that happens in production, the recommended Cloudflare solution is
 * to add a small /api/telegram/graphic endpoint and use a PNG renderer
 * such as resvg-wasm.
 */
function svgDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg);

  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

/* -------------------------------------------------------------------------- */
/* Public function                                                            */
/* -------------------------------------------------------------------------- */

export async function notifyChannelNewPaper(params: {
  subjectId: string;
  year: string;
  medium: Medium;
  docType: DocType;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  // Telegram is not configured.
  if (!token || !channelId) {
    return;
  }

  const {
    subjectId,
    year,
    medium,
    docType,
  } = params;

  const subject = ALL_SUBJECTS.find(
    (item) => item.id === subjectId
  );

  const level =
    subject?.level === "AL"
      ? "A/L"
      : "O/L";

  const subjectName =
    SUBJECT_NAMES[subjectId] ||
    subjectId;

  const docLabel =
    docType === "marking"
      ? "Marking Scheme"
      : "Past Paper";

  const docLabelSi =
    docType === "marking"
      ? "පිළිතුරු පත්‍රය"
      : "ප්‍රශ්න පත්‍රය";


  /* ---------------------------------------------------------------------- */
  /* Paper URL                                                              */
  /* ---------------------------------------------------------------------- */

  const paperPageUrl =
    `${BASE_URL}/si/papers/` +
    `${subject?.level.toLowerCase() || "ol"}/` +
    `${subjectId}/` +
    `${year}/` +
    `${medium}` +
    `${docType === "marking" ? "?type=marking" : ""}`;


  /* ---------------------------------------------------------------------- */
  /* Discussion link                                                        */
  /* ---------------------------------------------------------------------- */

  const discussionLink =
    process.env.TELEGRAM_DISCUSSION_INVITE_LINK ||
    BASE_URL;


  /* ---------------------------------------------------------------------- */
  /* Caption                                                                */
  /* ---------------------------------------------------------------------- */

  const caption =
    `📝 *${year} ${level}*\n` +
    `*${subjectName}*\n\n` +
    `${MEDIUM_LABEL[medium]}\n` +
    `🗂️ ${docLabelSi} (${docLabel})\n\n` +
    `GCE ${level} ${subjectName} ` +
    `${docLabel} ${year} — ` +
    `${MEDIUM_LABEL[medium]}\n\n` +
    `Download now →`;


  /* ---------------------------------------------------------------------- */
  /* Buttons                                                                */
  /* ---------------------------------------------------------------------- */

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
          text: "🔗 Visit Site",
          url: BASE_URL,
        },
      ],
    ],
  };


  /* ---------------------------------------------------------------------- */
  /* Dynamic graphic                                                        */
  /* ---------------------------------------------------------------------- */

  const graphic = createDynamicGraphic({
    subject: subjectName,
    year,
    medium: MEDIUM_LABEL[medium],
    level,
    docType,
  });


  /* ---------------------------------------------------------------------- */
  /* Send Telegram post                                                     */
  /* ---------------------------------------------------------------------- */

  try {
    /*
     * Try dynamic SVG graphic first.
     */
    await telegram(token, "sendPhoto", {
      chat_id: channelId,

      photo: svgDataUrl(graphic),

      caption,

      parse_mode: "Markdown",

      reply_markup: replyMarkup,
    });

    return;

  } catch (graphicError) {

    /*
     * If Telegram does not accept the generated graphic,
     * fall back to the normal site logo.
     *
     * This ensures that uploading a paper NEVER fails just because
     * the Telegram graphic renderer has an issue.
     */

    console.error(
      "Dynamic Telegram graphic failed:",
      graphicError
    );

    try {

      await telegram(token, "sendPhoto", {
        chat_id: channelId,

        photo: `${BASE_URL}/logo.png`,

        caption,

        parse_mode: "Markdown",

        reply_markup: replyMarkup,
      });

      return;

    } catch (photoError) {

      console.error(
        "Telegram logo fallback failed:",
        photoError
      );

      /*
       * Final fallback:
       * send a text-only Telegram post.
       */

      await telegram(token, "sendMessage", {
        chat_id: channelId,

        text: caption,

        parse_mode: "Markdown",

        disable_web_page_preview: true,

        reply_markup: replyMarkup,
      });
    }
  }
}