"use client";

export type TelegramGraphicOptions = {
  subject: string;
  year: string;
  medium: "sinhala" | "english" | "tamil";
  level: "O/L" | "A/L";
  docType: "paper" | "marking";
  part?: "part1" | "part2" | "full";
};

/*
|--------------------------------------------------------------------------
| Subject names
|--------------------------------------------------------------------------
*/

const SUBJECT_NAMES: Record<string, string> = {
  // O/L
  "ol-maths": "Mathematics",
  "ol-mathematics": "Mathematics",
  "ol-science": "Science",
  "ol-sinhala": "Sinhala",
  "ol-english": "English",
  "ol-history": "History",
  "ol-buddhism": "Buddhism",
  "ol-tamil": "Tamil",
  "ol-geography": "Geography",
  "ol-civic": "Civic Education",
  "ol-music": "Music",
  "ol-art": "Art",
  "ol-dancing": "Dancing",
  "ol-drama": "Drama & Theatre",
  "ol-ict": "ICT",
  "ol-agriculture": "Agriculture",
  "ol-health": "Health",

  // A/L
  "al-combined-maths": "Combined Mathematics",
  "al-combined-mathematics": "Combined Mathematics",
  "al-physics": "Physics",
  "al-chemistry": "Chemistry",
  "al-biology": "Biology",
  "al-ict": "Information Technology",
  "al-accounting": "Accounting",
  "al-business": "Business Studies",
  "al-econ": "Economics",
  "al-economics": "Economics",
  "al-agro": "Agricultural Science",
  "al-agriculture": "Agricultural Science",
  "al-et": "Engineering Technology",
  "al-bst": "Bio Systems Technology",
  "al-sft": "Science for Technology",
};

/*
|--------------------------------------------------------------------------
| Medium labels
|--------------------------------------------------------------------------
*/

const MEDIUM_LABEL: Record<
  TelegramGraphicOptions["medium"],
  string
> = {
  sinhala: "SINHALA MEDIUM",
  english: "ENGLISH MEDIUM",
  tamil: "TAMIL MEDIUM",
};

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function getSubjectName(subject: string): string {
  const knownName = SUBJECT_NAMES[subject];

  if (knownName) {
    return knownName;
  }

  /*
   * Fallback:
   * ol-maths -> Maths
   * al-physics -> Physics
   */
  return subject
    .replace(/^ol-/i, "")
    .replace(/^al-/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getDocumentLabel(
  options: TelegramGraphicOptions
): string {
  let label =
    options.docType === "marking"
      ? "MARKING SCHEME"
      : "QUESTION PAPER";

  if (options.part === "part1") {
    label += " • PART 1";
  }

  if (options.part === "part2") {
    label += " • PART 2";
  }

  return label;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(
        new Error(
          `Unable to load Telegram template image: ${src}`
        )
      );
    };

    image.src = src;
  });
}

/*
|--------------------------------------------------------------------------
| Find the largest font size that fits inside maxWidth
|--------------------------------------------------------------------------
*/

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startingSize: number,
  minimumSize = 18,
  fontWeight = 900
): number {
  let size = startingSize;

  while (size > minimumSize) {
    ctx.font = `${fontWeight} ${size}px Arial, Helvetica, sans-serif`;

    if (ctx.measureText(text).width <= maxWidth) {
      return size;
    }

    size -= 2;
  }

  return minimumSize;
}

/*
|--------------------------------------------------------------------------
| Draw centered text
|--------------------------------------------------------------------------
*/

function drawCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  baselineY: number,
  maxWidth: number,
  startingSize: number,
  color: string,
  fontWeight = 900,
  minimumSize = 18
) {
  const fontSize = fitText(
    ctx,
    text,
    maxWidth,
    startingSize,
    minimumSize,
    fontWeight
  );

  ctx.save();

  ctx.font = `${fontWeight} ${fontSize}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = color;

  /*
   * Small shadow for readability.
   */
  ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;

  ctx.fillText(
    text,
    centerX,
    baselineY,
    maxWidth
  );

  ctx.restore();
}

/*
|--------------------------------------------------------------------------
| Draw left aligned text
|--------------------------------------------------------------------------
*/

function drawLeftText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  centerY: number,
  maxWidth: number,
  startingSize: number,
  color: string,
  fontWeight = 900,
  minimumSize = 18
) {
  const fontSize = fitText(
    ctx,
    text,
    maxWidth,
    startingSize,
    minimumSize,
    fontWeight
  );

  ctx.save();

  ctx.font = `${fontWeight} ${fontSize}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  ctx.fillStyle = color;

  ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;

  ctx.fillText(
    text,
    x,
    centerY,
    maxWidth
  );

  ctx.restore();
}

/*
|--------------------------------------------------------------------------
| Cover an existing template area
|--------------------------------------------------------------------------
*/

function coverArea(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string
) {
  ctx.save();

  ctx.fillStyle = fill;

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.restore();
}

/*
|--------------------------------------------------------------------------
| Main renderer
|--------------------------------------------------------------------------
*/

async function renderGraphic(
  options: TelegramGraphicOptions
): Promise<HTMLCanvasElement> {
  /*
   * Template size
   */
  const WIDTH = 1536;
  const HEIGHT = 1024;

  const canvas = document.createElement("canvas");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error(
      "Canvas 2D context is not supported."
    );
  }

  /*
   * --------------------------------------------------------------
   * LOAD TEMPLATE
   * --------------------------------------------------------------
   */

  const template = await loadImage(
    "/telegram/past-paper-template.png"
  );

  /*
   * Draw the complete template.
   */

  ctx.drawImage(
    template,
    0,
    0,
    WIDTH,
    HEIGHT
  );

  /*
   * --------------------------------------------------------------
   * DATA
   * --------------------------------------------------------------
   */

  const subject =
    getSubjectName(options.subject);

  const medium =
    MEDIUM_LABEL[options.medium];

  const documentLabel =
    getDocumentLabel(options);

  /*
   * --------------------------------------------------------------
   * COLORS
   * --------------------------------------------------------------
   */

  const NAVY = "#03162F";
  const WHITE = "#FFFFFF";
  const ORANGE = "#F5A300";

  /*
   * --------------------------------------------------------------
   * 1. LEVEL
   *
   * Template currently has "O/L / A/L".
   *
   * We cover that area and draw ONLY the selected level.
   * --------------------------------------------------------------
   */

  /*
   * Orange level box from the template.
   *
   * Approximate position:
   * x = 45
   * y = 225
   * width = 122
   * height = 120
   */

  coverArea(
    ctx,
    47,
    226,
    118,
    117,
    ORANGE
  );

  drawCenteredText(
    ctx,
    options.level,
    106,
    284,
    105,
    42,
    NAVY,
    900,
    28
  );

  /*
   * --------------------------------------------------------------
   * 2. YEAR
   *
   * First large box
   * --------------------------------------------------------------
   */

  /*
   * First box:
   * x ≈ 275
   * y ≈ 225
   * width ≈ 410
   * height ≈ 120
   */

  drawCenteredText(
    ctx,
    options.year,
    480,
    285,
    350,
    68,
    WHITE,
    900,
    36
  );

  /*
   * --------------------------------------------------------------
   * 3. SUBJECT
   *
   * Second large box
   * --------------------------------------------------------------
   */

  /*
   * Subject box:
   * x ≈ 45
   * y ≈ 370
   * width ≈ 645
   * height ≈ 110
   *
   * The icon is on the left, so text starts after it.
   */

  drawLeftText(
    ctx,
    subject,
    180,
    425,
    470,
    48,
    WHITE,
    900,
    28
  );

  /*
   * --------------------------------------------------------------
   * 4. MEDIUM
   *
   * Third box
   * --------------------------------------------------------------
   */

  /*
   * Medium box:
   * x ≈ 143
   * y ≈ 500
   * width ≈ 545
   * height ≈ 75
   */

  drawLeftText(
    ctx,
    medium,
    195,
    538,
    450,
    28,
    WHITE,
    900,
    18
  );

  /*
   * --------------------------------------------------------------
   * 5. WEBSITE / BRAND
   *
   * Fourth box
   * --------------------------------------------------------------
   */

  /*
   * This template has a globe icon for this row.
   *
   * Use it for the website.
   */

  drawLeftText(
    ctx,
    "pastpaperzone.lk",
    195,
    665,
    450,
    30,
    WHITE,
    800,
    18
  );

  /*
   * --------------------------------------------------------------
   * 6. DOCUMENT TYPE
   *
   * Fifth box
   * --------------------------------------------------------------
   */

  drawLeftText(
    ctx,
    documentLabel,
    195,
    800,
    450,
    28,
    WHITE,
    900,
    17
  );

  /*
   * --------------------------------------------------------------
   * RETURN
   * --------------------------------------------------------------
   */

  return canvas;
}

/*
|--------------------------------------------------------------------------
| Canvas -> PNG
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Public API
|--------------------------------------------------------------------------
*/

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