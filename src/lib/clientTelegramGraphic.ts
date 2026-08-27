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
  fill: string
) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
}

function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  stroke: string,
  lineWidth = 2
) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize = 24
) {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `900 ${size}px Arial, Helvetica, sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }
  return minSize;
}

function drawBookIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
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
  ctx.quadraticCurveTo(
    x + size * 0.77,
    y + size * 0.68,
    x + size * 0.52,
    y + size * 0.82
  );
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size * 0.5, y + size * 0.15);
  ctx.lineTo(x + size * 0.5, y + size * 0.82);
  ctx.stroke();

  ctx.restore();
}

function drawPaperIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.065);
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

function drawDownloadIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.save();
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y + 5);
  ctx.lineTo(x + size / 2, y + size * 0.62);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size * 0.28, y + size * 0.48);
  ctx.lineTo(x + size / 2, y + size * 0.68);
  ctx.lineTo(x + size * 0.72, y + size * 0.48);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + size * 0.22, y + size * 0.82);
  ctx.lineTo(x + size * 0.78, y + size * 0.82);
  ctx.stroke();
  ctx.restore();
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rows = 4,
  cols = 4
) {
  ctx.save();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = (row + col) % 3 === 0 ? "#ffffff" : "#f59e0b";
      ctx.beginPath();
      ctx.arc(x + col * 14, y + row * 14, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
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

function drawDownloadCorner(ctx: CanvasRenderingContext2D) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(855, 30);
  ctx.lineTo(1145, 30);
  ctx.lineTo(1145, 158);
  ctx.bezierCurveTo(1055, 158, 975, 123, 930, 78);
  ctx.bezierCurveTo(900, 48, 878, 34, 855, 30);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(900, 76, 22, 0, Math.PI * 2);
  ctx.fillStyle = "#f59e0b";
  ctx.fill();
  drawDownloadIcon(ctx, 885, 61, 30);

  ctx.fillStyle = "#071a35";
  ctx.font = "900 16px Arial, Helvetica, sans-serif";
  ctx.fillText("DOWNLOAD", 932, 70);

  ctx.fillStyle = "#f59e0b";
  ctx.font = "900 18px Arial, Helvetica, sans-serif";
  ctx.fillText("FREE PAST PAPERS", 932, 96);

  ctx.fillStyle = "#071a35";
  ctx.font = "700 13px Arial, Helvetica, sans-serif";
  ctx.fillText("pastpaperzone.lk", 932, 122);

  ctx.restore();
}

/**
 * Draws the main 3D-style book illustration.
 * This replaces the old globe illustration and gives every Telegram
 * post a more distinctive educational look.
 */
function drawBookStack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  subject: string,
  year: string,
  docType: "paper" | "marking"
) {
  const navy = "#071b35";
  const navyLight = "#12365b";
  const orange = "#f59e0b";
  const white = "#ffffff";
  const page = "#eef2f7";

  ctx.save();

  // Soft shadow.
  ctx.fillStyle = "rgba(0,0,0,0.30)";
  ctx.beginPath();
  ctx.ellipse(x + 280, y + 355, 245, 35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bottom book.
  const layers = [
    { top: y + 285, h: 54, w: 420, c: "#0d2949" },
    { top: y + 245, h: 52, w: 385, c: "#102f53" },
    { top: y + 205, h: 50, w: 350, c: "#071f3d" },
  ];

  layers.forEach((book, i) => {
    const bx = x + (420 - book.w) / 2;
    fillRoundedRect(ctx, bx, book.top, book.w, book.h, 7, book.c);

    ctx.fillStyle = i === 1 ? orange : "#dbe3ec";
    ctx.fillRect(bx + 14, book.top + 8, book.w - 28, 3);

    ctx.fillStyle = "#e6ebf2";
    ctx.beginPath();
    ctx.moveTo(bx + 8, book.top + 17);
    ctx.lineTo(bx + book.w - 8, book.top + 17);
    ctx.lineTo(bx + book.w - 8, book.top + book.h - 7);
    ctx.lineTo(bx + 8, book.top + book.h - 7);
    ctx.closePath();
    ctx.globalAlpha = 0.18;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Main standing book.
  const bx = x + 72;
  const by = y + 42;
  const bw = 315;
  const bh = 285;

  // Right page block.
  ctx.fillStyle = page;
  ctx.beginPath();
  ctx.moveTo(bx + bw - 12, by + 18);
  ctx.lineTo(bx + bw + 28, by + 28);
  ctx.lineTo(bx + bw + 28, by + bh - 18);
  ctx.lineTo(bx + bw - 12, by + bh - 8);
  ctx.closePath();
  ctx.fill();

  // Cover.
  const coverGradient = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
  coverGradient.addColorStop(0, "#173c63");
  coverGradient.addColorStop(0.55, navyLight);
  coverGradient.addColorStop(1, navy);

  ctx.fillStyle = coverGradient;
  ctx.beginPath();
  ctx.moveTo(bx, by + 18);
  ctx.quadraticCurveTo(bx + 8, by, bx + 25, by);
  ctx.lineTo(bx + bw - 10, by + 12);
  ctx.quadraticCurveTo(bx + bw, by + 15, bx + bw, by + 30);
  ctx.lineTo(bx + bw, by + bh - 15);
  ctx.quadraticCurveTo(bx + bw - 4, by + bh, bx + bw - 20, by + bh);
  ctx.lineTo(bx + 12, by + bh - 10);
  ctx.quadraticCurveTo(bx, by + bh - 12, bx, by + bh - 30);
  ctx.closePath();
  ctx.fill();

  // Orange spine.
  ctx.fillStyle = orange;
  ctx.fillRect(bx + 5, by + 35, 7, bh - 70);

  // Cover text.
  ctx.fillStyle = white;
  ctx.font = "900 38px Arial, Helvetica, sans-serif";
  ctx.fillText("PAST", bx + 38, by + 80);

  ctx.fillStyle = orange;
  ctx.font = "900 34px Arial, Helvetica, sans-serif";
  ctx.fillText("PAPER ZONE", bx + 38, by + 118);

  ctx.fillStyle = white;
  const subjectSize = fitText(ctx, subject.toUpperCase(), 245, 29, 18);
  ctx.font = `900 ${subjectSize}px Arial, Helvetica, sans-serif`;
  ctx.fillText(subject.toUpperCase(), bx + 38, by + 165);

  ctx.font = "900 24px Arial, Helvetica, sans-serif";
  ctx.fillStyle = orange;
  ctx.fillText(`${year} • ${docType === "marking" ? "MARKING" : "PAPER"}`, bx + 38, by + 201);

  // Small book/paper emblem.
  drawBookIcon(ctx, bx + 43, by + 225, 45, white);

  // Pencil beside the book.
  ctx.save();
  ctx.translate(bx + bw + 20, by + 188);
  ctx.rotate(0.13);

  ctx.fillStyle = orange;
  roundedRect(ctx, 0, 0, 20, 125, 6);
  ctx.fill();

  ctx.fillStyle = "#f7c86a";
  ctx.fillRect(3, 18, 14, 88);

  ctx.fillStyle = "#d7dde6";
  ctx.fillRect(3, 106, 14, 9);

  ctx.fillStyle = "#d7a277";
  ctx.beginPath();
  ctx.moveTo(3, 115);
  ctx.lineTo(17, 115);
  ctx.lineTo(10, 130);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ef6f51";
  ctx.fillRect(0, 0, 20, 17);
  ctx.restore();

  ctx.restore();
}

function drawFooter(ctx: CanvasRenderingContext2D) {
  const white = "#ffffff";
  const light = "#dce4ef";
  const orange = "#f59e0b";

  ctx.fillStyle = "#06162c";
  ctx.fillRect(38, 535, 1124, 65);

  ctx.fillStyle = "#60738c";
  ctx.fillRect(335, 548, 1, 35);
  ctx.fillRect(595, 548, 1, 35);
  ctx.fillRect(845, 548, 1, 35);

  // Reliable.
  ctx.fillStyle = orange;
  ctx.beginPath();
  ctx.arc(91, 568, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = white;
  ctx.font = "900 12px Arial, Helvetica, sans-serif";
  ctx.fillText("✓", 85, 573);

  ctx.fillStyle = white;
  ctx.font = "900 13px Arial, Helvetica, sans-serif";
  ctx.fillText("RELIABLE", 116, 558);
  ctx.fillStyle = light;
  ctx.font = "700 12px Arial, Helvetica, sans-serif";
  ctx.fillText("TRUSTED", 116, 579);

  // Free download.
  ctx.fillStyle = orange;
  ctx.beginPath();
  ctx.arc(390, 568, 17, 0, Math.PI * 2);
  ctx.fill();
  drawDownloadIcon(ctx, 378, 556, 24);
  ctx.fillStyle = white;
  ctx.font = "900 15px Arial, Helvetica, sans-serif";
  ctx.fillText("FREE DOWNLOAD", 420, 573);

  // Safe.
  ctx.fillStyle = orange;
  ctx.beginPath();
  ctx.arc(650, 568, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = white;
  ctx.font = "900 12px Arial, Helvetica, sans-serif";
  ctx.fillText("✓", 644, 573);
  ctx.fillStyle = white;
  ctx.font = "900 15px Arial, Helvetica, sans-serif";
  ctx.fillText("100% SAFE", 680, 573);

  // Past papers.
  ctx.fillStyle = orange;
  ctx.font = "900 13px Arial, Helvetica, sans-serif";
  ctx.fillText("PAST PAPERS", 880, 558);
  ctx.fillStyle = light;
  ctx.font = "700 12px Arial, Helvetica, sans-serif";
  ctx.fillText("& MARKING SCHEMES", 880, 579);
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
  const navy = "#06152d";
  const navy2 = "#0c2748";
  const white = "#ffffff";
  const light = "#dce4ef";

  // Outer background.
  ctx.fillStyle = "#020b18";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = orange;
  ctx.fillRect(0, 0, width, 10);
  ctx.fillRect(0, height - 10, width, 10);

  // Main rounded panel.
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.38)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 10;
  fillRoundedRect(ctx, 38, 30, 1124, 570, 20, navy2);
  ctx.restore();

  // Left orange accent.
  fillRoundedRect(ctx, 38, 30, 10, 570, 5, orange);

  // Decorative background glow.
  const glow = ctx.createRadialGradient(920, 330, 20, 920, 330, 330);
  glow.addColorStop(0, "rgba(245,158,11,0.18)");
  glow.addColorStop(1, "rgba(245,158,11,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(620, 60, 540, 470);

  ctx.strokeStyle = "rgba(245,158,11,0.08)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(900, 325, 185, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([5, 11]);
  ctx.strokeStyle = "rgba(245,158,11,0.08)";
  ctx.beginPath();
  ctx.arc(900, 325, 210, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  drawLogo(ctx);
  drawDownloadCorner(ctx);

  // Level badge.
  fillRoundedRect(ctx, 75, 195, 128, 64, 15, orange);
  ctx.fillStyle = navy;
  ctx.font = "900 31px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(options.level, 139, 238);
  ctx.textAlign = "left";

  // Year.
  ctx.fillStyle = white;
  ctx.font = "900 72px Arial, Helvetica, sans-serif";
  ctx.fillText(options.year, 228, 248);

  // Main title.
  ctx.fillStyle = orange;
  ctx.fillRect(75, 285, 580, 4);

  const subject = SUBJECT_NAMES[options.subject] || options.subject;
  const subjectSize = fitText(ctx, subject, 580, 58, 28);
  ctx.font = `900 ${subjectSize}px Arial, Helvetica, sans-serif`;
  ctx.fillStyle = white;
  ctx.fillText(subject, 75, 352);

  // Medium.
  fillRoundedRect(ctx, 75, 380, 580, 62, 14, "#102f53");
  strokeRoundedRect(ctx, 75, 380, 580, 62, 14, "rgba(245,158,11,0.8)", 1.5);
  drawBookIcon(ctx, 98, 395, 30, orange);
  ctx.fillStyle = light;
  ctx.font = "800 21px Arial, Helvetica, sans-serif";
  ctx.fillText(MEDIUM_LABEL[options.medium], 145, 420);

  // Document type.
  drawPaperIcon(ctx, 77, 470, 40, orange);
  ctx.fillStyle = white;
  ctx.font = "900 24px Arial, Helvetica, sans-serif";
  ctx.fillText(
    options.docType === "marking" ? "MARKING SCHEME" : "QUESTION PAPER",
    140,
    499
  );

  // Right illustration.
  drawDots(ctx, 755, 214, 3, 4);
  drawDots(ctx, 1015, 462, 4, 4);
  drawBookStack(
    ctx,
    700,
    115,
    subject,
    options.year,
    options.docType
  );

  drawFooter(ctx);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

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
