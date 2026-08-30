"use client";

export type TelegramGraphicOptions = {
  subject: string;
  year: string;
  medium: "sinhala" | "english" | "tamil";
  level: "O/L" | "A/L";
  docType: "paper" | "marking";
  part?: "part1" | "part2" | "full";
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

const MEDIUM_LABEL: Record<
  TelegramGraphicOptions["medium"],
  string
> = {
  sinhala: "SINHALA MEDIUM",
  english: "ENGLISH MEDIUM",
  tamil: "TAMIL MEDIUM",
};

function getSubjectName(subject: string) {
  return SUBJECT_NAMES[subject] || subject;
}

function getDocumentLabel(options: TelegramGraphicOptions) {
  const base =
    options.docType === "marking"
      ? "MARKING SCHEME"
      : "QUESTION PAPER";

  if (options.part === "part1") {
    return `${base} • PART 1`;
  }

  if (options.part === "part2") {
    return `${base} • PART 2`;
  }

  return base;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error(`Unable to load image: ${src}`));

    image.src = src;
  });
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startingSize: number,
  minimumSize = 28
) {
  let size = startingSize;

  while (size > minimumSize) {
    ctx.font = `900 ${size}px Arial, Helvetica, sans-serif`;

    if (ctx.measureText(text).width <= maxWidth) {
      return size;
    }

    size -= 2;
  }

  return minimumSize;
}

function drawTextWithShadow(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  align: CanvasTextAlign = "left"
) {
  ctx.save();

  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";

  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 3;

  ctx.fillStyle = color;
  ctx.fillText(text, x, y);

  ctx.restore();
}

function drawRoundedBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: string,
  stroke?: string
) {
  ctx.save();

  ctx.beginPath();

  ctx.roundRect(
    x,
    y,
    width,
    height,
    radius
  );

  ctx.fillStyle = fill;
  ctx.fill();

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.restore();
}

async function renderGraphic(
  options: TelegramGraphicOptions
): Promise<HTMLCanvasElement> {
  const WIDTH = 1536;
  const HEIGHT = 1024;

  const canvas = document.createElement("canvas");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas is not supported.");
  }

  /*
   * ---------------------------------------------------------
   * 1. LOAD PREMIUM TEMPLATE
   * ---------------------------------------------------------
   */

  const template = await loadImage(
    "/telegram/past-paper-template.png"
  );

  /*
   * Draw template as the complete background.
   */

  ctx.drawImage(
    template,
    0,
    0,
    WIDTH,
    HEIGHT
  );

  /*
   * ---------------------------------------------------------
   * 2. DYNAMIC DATA
   * ---------------------------------------------------------
   */

  const subject = getSubjectName(options.subject);

  const medium =
    MEDIUM_LABEL[options.medium];

  const documentLabel =
    getDocumentLabel(options);

  /*
   * ---------------------------------------------------------
   * 3. LEFT SIDE INFORMATION
   * ---------------------------------------------------------
   */

  const leftX = 85;

  /*
   * Level badge
   */

  drawRoundedBox(
    ctx,
    leftX,
    300,
    155,
    75,
    18,
    "#F5A300"
  );

  drawTextWithShadow(
    ctx,
    options.level,
    leftX + 77,
    351,
    "900 40px Arial, Helvetica, sans-serif",
    "#03162F",
    "center"
  );

  /*
   * Year
   */

  drawTextWithShadow(
    ctx,
    options.year,
    leftX + 205,
    360,
    "900 82px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  /*
   * Orange divider
   */

  ctx.save();

  ctx.fillStyle = "#F5A300";

  ctx.fillRect(
    leftX,
    405,
    585,
    5
  );

  ctx.restore();

  /*
   * ---------------------------------------------------------
   * 4. SUBJECT
   * ---------------------------------------------------------
   */

  const subjectSize = fitText(
    ctx,
    subject,
    580,
    62,
    32
  );

  drawTextWithShadow(
    ctx,
    subject,
    leftX,
    485,
    `900 ${subjectSize}px Arial, Helvetica, sans-serif`,
    "#FFFFFF"
  );

  /*
   * ---------------------------------------------------------
   * 5. MEDIUM BOX
   * ---------------------------------------------------------
   */

  drawRoundedBox(
    ctx,
    leftX,
    525,
    585,
    72,
    15,
    "rgba(3, 22, 47, 0.92)",
    "#FFFFFF"
  );

  /*
   * Graduation-cap style icon
   */

  ctx.save();

  ctx.strokeStyle = "#F5A300";
  ctx.lineWidth = 5;

  ctx.beginPath();

  ctx.moveTo(
    leftX + 35,
    560
  );

  ctx.lineTo(
    leftX + 65,
    545
  );

  ctx.lineTo(
    leftX + 95,
    560
  );

  ctx.lineTo(
    leftX + 65,
    575
  );

  ctx.closePath();

  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(
    leftX + 50,
    570
  );

  ctx.lineTo(
    leftX + 50,
    585
  );

  ctx.quadraticCurveTo(
    leftX + 65,
    595,
    leftX + 80,
    585
  );

  ctx.lineTo(
    leftX + 80,
    570
  );

  ctx.stroke();

  ctx.restore();

  drawTextWithShadow(
    ctx,
    medium,
    leftX + 125,
    573,
    "900 26px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  /*
   * ---------------------------------------------------------
   * 6. DOCUMENT TYPE
   * ---------------------------------------------------------
   */

  drawTextWithShadow(
    ctx,
    "▣",
    leftX + 5,
    665,
    "900 48px Arial, Helvetica, sans-serif",
    "#F5A300"
  );

  const documentSize = fitText(
    ctx,
    documentLabel,
    500,
    30,
    20
  );

  drawTextWithShadow(
    ctx,
    documentLabel,
    leftX + 75,
    660,
    `900 ${documentSize}px Arial, Helvetica, sans-serif`,
    "#FFFFFF"
  );

  /*
   * ---------------------------------------------------------
   * 7. FINAL BRANDING
   * ---------------------------------------------------------
   */

  drawTextWithShadow(
    ctx,
    "pastpaperzone.lk",
    85,
    945,
    "700 22px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  /*
   * ---------------------------------------------------------
   * 8. FOOTER
   * ---------------------------------------------------------
   */

  drawTextWithShadow(
    ctx,
    "RELIABLE",
    90,
    980,
    "900 20px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  drawTextWithShadow(
    ctx,
    "FREE DOWNLOAD",
    430,
    980,
    "900 20px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  drawTextWithShadow(
    ctx,
    "100% SAFE",
    810,
    980,
    "900 20px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  drawTextWithShadow(
    ctx,
    "PAST PAPERS & MARKING SCHEMES",
    1080,
    980,
    "900 18px Arial, Helvetica, sans-serif",
    "#FFFFFF"
  );

  return canvas;
}

function canvasToPng(
  canvas: HTMLCanvasElement
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              "Could not create Telegram PNG."
            )
          );
          return;
        }

        resolve(blob);
      },
      "image/png",
      1
    );
  });
}

export async function createTelegramGraphic(
  options: TelegramGraphicOptions
): Promise<File> {
  const canvas =
    await renderGraphic(options);

  const blob =
    await canvasToPng(canvas);

  return new File(
    [blob],
    "telegram-post.png",
    {
      type: "image/png",
      lastModified: Date.now(),
    }
  );
}