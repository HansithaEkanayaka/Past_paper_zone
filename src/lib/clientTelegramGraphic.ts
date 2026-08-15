"use client";

export type TelegramGraphicOptions = {
  subject: string;
  year: string;
  medium: "sinhala" | "english" | "tamil";
  level: "O/L" | "A/L";
  docType: "paper" | "marking";
};

const MEDIUM_LABEL: Record<TelegramGraphicOptions["medium"], string> = {
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

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string
) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
  lineWidth = 2
) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize = 26
) {
  let size = startSize;

  while (size > minSize) {
    ctx.font = `900 ${size}px Arial, Helvetica, sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }

  return minSize;
}

function drawBookIcon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.055);
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.12);
  ctx.quadraticCurveTo(x + size * 0.25, y, x + size * 0.48, y + size * 0.14);
  ctx.lineTo(x + size * 0.48, y + size * 0.82);
  ctx.quadraticCurveTo(x + size * 0.23, y + size * 0.68, x, y + size * 0.82);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size * 0.52, y + size * 0.14);
  ctx.quadraticCurveTo(x + size * 0.75, y, x + size, y + size * 0.12);
  ctx.lineTo(x + size, y + size * 0.82);
  ctx.quadraticCurveTo(x + size * 0.77, y + size * 0.68, x + size * 0.52, y + size * 0.82);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size * 0.5, y + size * 0.15);
  ctx.lineTo(x + size * 0.5, y + size * 0.82);
  ctx.stroke();
  ctx.restore();
}

function drawPaperIcon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.07);
  ctx.lineJoin = "round";

  roundedRect(ctx, x, y, size * 0.72, size, size * 0.08);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size * 0.15, y + size * 0.3);
  ctx.lineTo(x + size * 0.55, y + size * 0.3);
  ctx.moveTo(x + size * 0.15, y + size * 0.5);
  ctx.lineTo(x + size * 0.55, y + size * 0.5);
  ctx.moveTo(x + size * 0.15, y + size * 0.7);
  ctx.lineTo(x + size * 0.45, y + size * 0.7);
  ctx.stroke();
  ctx.restore();
}

function drawGlobe(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  const orange = "#f59e0b";
  const white = "#ffffff";
  const inner = "#071a35";

  ctx.save();

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = orange;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius - 16, 0, Math.PI * 2);
  ctx.fillStyle = inner;
  ctx.fill();

  ctx.strokeStyle = white;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 0.58, radius * 0.82, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 0.28, radius * 0.82, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - radius * 0.58, cy);
  ctx.lineTo(cx + radius * 0.58, cy);
  ctx.stroke();

  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 0.58, radius * 0.36, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(cx, cy + radius * 0.82);
  ctx.lineTo(cx, cy + radius * 1.08);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - radius * 0.34, cy + radius * 1.08);
  ctx.lineTo(cx + radius * 0.34, cy + radius * 1.08);
  ctx.stroke();

  ctx.restore();
}

function drawLogo(ctx: CanvasRenderingContext2D) {
  const orange = "#f59e0b";
  const white = "#ffffff";
  const navy = "#06152d";

  fillRoundedRect(ctx, 75, 58, 72, 72, 16, orange);

  drawBookIcon(ctx, 91, 74, 40, navy);

  ctx.textBaseline = "alphabetic";
  ctx.font = "900 31px Arial, Helvetica, sans-serif";
  ctx.fillStyle = white;
  ctx.fillText("PAST", 166, 87);

  ctx.fillStyle = orange;
  ctx.fillText("PAPER", 166, 119);

  ctx.fillStyle = white;
  ctx.fillText("ZONE", 314, 119);

  ctx.font = "700 12px Arial, Helvetica, sans-serif";
  ctx.fillStyle = "#aebbd0";
  ctx.fillText("YOUR PAST PAPERS, YOUR SUCCESS", 166, 143);
}

function drawDots(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#f59e0b";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      ctx.beginPath();
      ctx.arc(x + col * 13, y + row * 13, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawDownloadCorner(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(850, 30);
  ctx.lineTo(1145, 30);
  ctx.lineTo(1145, 158);
  ctx.bezierCurveTo(1050, 158, 975, 122, 930, 77);
  ctx.bezierCurveTo(900, 47, 875, 34, 850, 30);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.fillStyle = "#071a35";
  ctx.font = "800 17px Arial, Helvetica, sans-serif";
  ctx.fillText("DOWNLOAD", 884, 70);

  ctx.fillStyle = "#f59e0b";
  ctx.font = "900 18px Arial, Helvetica, sans-serif";
  ctx.fillText("FREE PAST PAPERS", 884, 96);

  ctx.fillStyle = "#071a35";
  ctx.font = "700 13px Arial, Helvetica, sans-serif";
  ctx.fillText("pastpaperzone.lk", 884, 122);
  ctx.restore();
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  stroke?: string
) {
  fillRoundedRect(ctx, x, y, width, height, 14, fill);
  if (stroke) strokeRoundedRect(ctx, x, y, width, height, 14, stroke, 1.5);
}

function renderGraphic(options: TelegramGraphicOptions): HTMLCanvasElement {
  const width = 1200;
  const height = 630;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported by this browser.");

  const orange = "#f59e0b";
  const white = "#ffffff";
  const light = "#dce4ef";
  const muted = "#aebbd0";
  const navy = "#06152d";
  const navy2 = "#0c2748";
  const footer = "#06162c";

  // Background.
  ctx.fillStyle = "#020b18";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = orange;
  ctx.fillRect(0, 0, width, 10);
  ctx.fillRect(0, height - 10, width, 10);

  // Main card with subtle shadow.
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.38)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 10;
  fillRoundedRect(ctx, 38, 30, 1124, 570, 20, navy2);
  ctx.restore();

  fillRoundedRect(ctx, 38, 30, 10, 570, 5, orange);

  // Soft radial-like decoration.
  const glow = ctx.createRadialGradient(900, 315, 10, 900, 315, 260);
  glow.addColorStop(0, "rgba(245,158,11,0.16)");
  glow.addColorStop(1, "rgba(245,158,11,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(650, 70, 500, 500);

  ctx.strokeStyle = "rgba(245,158,11,0.08)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(895, 330, 175, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([6, 12]);
  ctx.strokeStyle = "rgba(245,158,11,0.08)";
  ctx.beginPath();
  ctx.arc(895, 330, 195, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Brand.
  drawLogo(ctx);
  drawDownloadCorner(ctx);

  // Level badge.
  drawCard(ctx, 75, 195, 128, 64, orange);
  ctx.fillStyle = navy;
  ctx.font = "900 31px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(options.level, 139, 238);
  ctx.textAlign = "left";

  // Year.
  ctx.fillStyle = white;
  ctx.font = "900 72px Arial, Helvetica, sans-serif";
  ctx.fillText(options.year, 228, 248);

  // Subject.
  ctx.fillStyle = orange;
  ctx.fillRect(75, 285, 580, 4);

  const subject = SUBJECT_NAMES[options.subject] || options.subject;
  const subjectSize = fitText(ctx, subject, 590, 58, 30);
  ctx.font = `900 ${subjectSize}px Arial, Helvetica, sans-serif`;
  ctx.fillStyle = white;
  ctx.fillText(subject, 75, 352);

  // Medium card.
  drawCard(ctx, 75, 380, 580, 62, "#102f53", "rgba(245,158,11,0.8)");
  drawBookIcon(ctx, 98, 395, 30, orange);
  ctx.fillStyle = light;
  ctx.font = "800 21px Arial, Helvetica, sans-serif";
  ctx.fillText(MEDIUM_LABEL[options.medium], 145, 420);

  // Document type.
  drawPaperIcon(ctx, 77, 470, 40, orange);
  ctx.fillStyle = white;
  ctx.font = "900 24px Arial, Helvetica, sans-serif";
  ctx.fillText(options.docType === "marking" ? "MARKING SCHEME" : "QUESTION PAPER", 140, 499);

  // Globe.
  drawGlobe(ctx, 895, 325, 125);
  drawDots(ctx, 748, 218);
  drawDots(ctx, 1015, 470);

  // Footer.
  ctx.fillStyle = footer;
  ctx.fillRect(38, 535, 1124, 65);

  ctx.fillStyle = "#61738c";
  ctx.fillRect(335, 548, 1, 35);
  ctx.fillRect(595, 548, 1, 35);
  ctx.fillRect(845, 548, 1, 35);

  ctx.fillStyle = white;
  ctx.font = "900 13px Arial, Helvetica, sans-serif";
  ctx.fillText("RELIABLE", 70, 558);
  ctx.fillStyle = light;
  ctx.font = "700 12px Arial, Helvetica, sans-serif";
  ctx.fillText("TRUSTED", 70, 579);

  ctx.fillStyle = white;
  ctx.font = "900 15px Arial, Helvetica, sans-serif";
  ctx.fillText("FREE DOWNLOAD", 382, 571);
  ctx.fillText("100% SAFE", 640, 571);

  ctx.font = "900 13px Arial, Helvetica, sans-serif";
  ctx.fillText("PAST PAPERS", 880, 558);
  ctx.fillStyle = light;
  ctx.font = "700 12px Arial, Helvetica, sans-serif";
  ctx.fillText("& MARKING SCHEMES", 880, 579);

  ctx.textAlign = "left";
  return canvas;
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not create Telegram PNG."));
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
  const canvas = renderGraphic(options);
  const blob = await canvasToPng(canvas);

  return new File([blob], "telegram-post.png", {
    type: "image/png",
    lastModified: Date.now(),
  });
}
