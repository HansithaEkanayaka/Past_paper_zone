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
  "ol-maths": "Mathematics", "ol-science": "Science", "ol-sinhala": "Sinhala Language",
  "ol-english": "English Language", "ol-history": "History", "ol-buddhism": "Buddhism",
  "ol-tamil": "Tamil Language", "ol-geography": "Geography", "ol-civic": "Civic Education",
  "ol-music": "Music", "ol-art": "Art", "ol-dancing": "Dancing", "ol-drama": "Drama & Theatre",
  "ol-ict": "ICT", "ol-agriculture": "Agriculture", "ol-health": "Health",
  "al-combined-maths": "Combined Mathematics", "al-physics": "Physics", "al-chemistry": "Chemistry",
  "al-biology": "Biology", "al-ict": "Information Technology", "al-accounting": "Accounting",
  "al-business": "Business Studies", "al-econ": "Economics", "al-agro": "Agricultural Technology",
  "al-et": "Engineering Technology", "al-bst": "Bio Systems Technology", "al-sft": "Science for Technology",
};

const ORANGE = "#f5a300";
const NAVY = "#03162f";
const NAVY2 = "#0a2a4d";
const WHITE = "#ffffff";
const MUTED = "#c9d5e5";

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function fillRound(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color: string) {
  roundedRect(ctx, x, y, w, h, r);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRound(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color: string, width = 2) {
  roundedRect(ctx, x, y, w, h, r);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, size: number, min = 24) {
  let s = size;
  while (s > min) {
    ctx.font = `900 ${s}px Arial, Helvetica, sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) return s;
    s -= 2;
  }
  return min;
}

function drawBookIcon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, size * .055);
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + size * .12);
  ctx.quadraticCurveTo(x + size * .25, y, x + size * .48, y + size * .14);
  ctx.lineTo(x + size * .48, y + size * .82);
  ctx.quadraticCurveTo(x + size * .23, y + size * .68, x, y + size * .82);
  ctx.closePath(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + size * .52, y + size * .14);
  ctx.quadraticCurveTo(x + size * .75, y, x + size, y + size * .12);
  ctx.lineTo(x + size, y + size * .82);
  ctx.quadraticCurveTo(x + size * .77, y + size * .68, x + size * .52, y + size * .82);
  ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + size * .5, y + size * .15); ctx.lineTo(x + size * .5, y + size * .82); ctx.stroke();
  ctx.restore();
}

function drawPaperIcon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = Math.max(2, size * .07); ctx.lineJoin = "round";
  roundedRect(ctx, x, y, size * .72, size, size * .08); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + size * .15, y + size * .3); ctx.lineTo(x + size * .55, y + size * .3);
  ctx.moveTo(x + size * .15, y + size * .5); ctx.lineTo(x + size * .55, y + size * .5);
  ctx.moveTo(x + size * .15, y + size * .7); ctx.lineTo(x + size * .45, y + size * .7);
  ctx.stroke(); ctx.restore();
}

function drawDots(ctx: CanvasRenderingContext2D, x: number, y: number) {
  for (let row = 0; row < 4; row++) for (let col = 0; col < 4; col++) {
    ctx.fillStyle = row === 1 && col === 3 ? WHITE : ORANGE;
    ctx.beginPath(); ctx.arc(x + col * 13, y + row * 13, 2.4, 0, Math.PI * 2); ctx.fill();
  }
}

function drawLogo(ctx: CanvasRenderingContext2D) {
  fillRound(ctx, 68, 58, 88, 88, 18, ORANGE);
  drawBookIcon(ctx, 88, 78, 48, NAVY);
  ctx.textAlign = "left";
  ctx.fillStyle = WHITE; ctx.font = "900 34px Arial, Helvetica, sans-serif"; ctx.fillText("PAST", 185, 92);
  ctx.fillStyle = ORANGE; ctx.fillText("PAPER", 185, 130);
  ctx.fillStyle = WHITE; ctx.fillText("ZONE", 365, 130);
  ctx.fillStyle = MUTED; ctx.font = "700 13px Arial, Helvetica, sans-serif"; ctx.fillText("YOUR PAST PAPERS, YOUR SUCCESS", 185, 154);
}

function drawDownloadCorner(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(980, 8); ctx.lineTo(1200, 8); ctx.lineTo(1200, 185);
  ctx.bezierCurveTo(1110, 187, 1030, 157, 980, 115);
  ctx.bezierCurveTo(950, 90, 930, 40, 980, 8); ctx.closePath();
  ctx.fillStyle = WHITE; ctx.fill();
  ctx.fillStyle = NAVY; ctx.font = "900 18px Arial, Helvetica, sans-serif"; ctx.fillText("DOWNLOAD", 1015, 60);
  ctx.fillStyle = ORANGE; ctx.font = "900 19px Arial, Helvetica, sans-serif"; ctx.fillText("FREE PAST PAPERS", 1015, 88);
  ctx.fillStyle = NAVY; ctx.font = "700 13px Arial, Helvetica, sans-serif"; ctx.fillText("pastpaperzone.lk", 1015, 116);
  ctx.restore();
}

function drawArtBook(ctx: CanvasRenderingContext2D, options: TelegramGraphicOptions) {
  // Large 3D book stack, intentionally drawn instead of the old globe.
  ctx.save();
  ctx.translate(790, 215);
  ctx.rotate(-0.035);

  // Back paper.
  ctx.fillStyle = "#f7f8fb"; ctx.strokeStyle = "#d5deea"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(370, 30); ctx.lineTo(500, 55); ctx.lineTo(465, 430); ctx.lineTo(335, 405); ctx.closePath(); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 7; i++) { ctx.strokeStyle = "#d8dee8"; ctx.beginPath(); ctx.moveTo(380, 100 + i * 38); ctx.lineTo(465, 116 + i * 38); ctx.stroke(); }

  // Bottom books.
  fillRound(ctx, 0, 395, 510, 72, 12, "#082a50");
  fillRound(ctx, 10, 458, 535, 68, 12, ORANGE);
  ctx.fillStyle = WHITE; ctx.font = "900 22px Arial, Helvetica, sans-serif"; ctx.fillText(options.subject.toUpperCase(), 45, 438);
  ctx.fillStyle = NAVY; ctx.font = "900 21px Arial, Helvetica, sans-serif"; ctx.fillText(`${options.level} ${options.year}`, 48, 502);

  // Main book cover.
  ctx.fillStyle = "#06377b"; ctx.strokeStyle = "#1c75d1"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(395, 0); ctx.lineTo(425, 390); ctx.lineTo(0, 390); ctx.closePath(); ctx.fill(); ctx.stroke();

  // Art paint strokes.
  ctx.strokeStyle = ORANGE; ctx.lineWidth = 16; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(55, 40); ctx.lineTo(110, 5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(315, 50); ctx.lineTo(370, 15); ctx.stroke();
  ctx.strokeStyle = "#1d8cff"; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(45, 330); ctx.lineTo(105, 300); ctx.stroke();

  ctx.fillStyle = WHITE; ctx.textAlign = "center";
  ctx.font = "900 28px Arial, Helvetica, sans-serif"; ctx.fillText(options.level, 210, 80);
  ctx.font = "900 56px Arial, Helvetica, sans-serif"; ctx.fillText(options.year, 210, 135);
  ctx.fillStyle = ORANGE; ctx.font = `900 ${fitText(ctx, SUBJECT_NAMES[options.subject] || options.subject, 310, 42, 25)}px Arial, Helvetica, sans-serif`;
  ctx.fillText(SUBJECT_NAMES[options.subject] || options.subject, 210, 190);
  ctx.fillStyle = WHITE; ctx.font = "900 25px Arial, Helvetica, sans-serif";
  ctx.fillText(options.docType === "marking" ? "MARKING SCHEME" : "QUESTION PAPER", 210, 230);

  // Palette + brush.
  ctx.fillStyle = WHITE; ctx.beginPath(); ctx.ellipse(185, 300, 52, 36, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0a3670"; ctx.beginPath(); ctx.arc(200, 300, 10, 0, Math.PI * 2); ctx.fill();
  for (const p of [[155,295,ORANGE],[175,315,"#246fd4"],[210,275,"#f6c744"],[225,305,"#f06b32"]] as const) { ctx.fillStyle = p[2]; ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = WHITE; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(235, 318); ctx.lineTo(305, 245); ctx.stroke();
  ctx.strokeStyle = ORANGE; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(285, 265); ctx.lineTo(318, 232); ctx.stroke();

  // Pencil and brushes.
  ctx.save(); ctx.translate(450, 245); ctx.rotate(0.22); ctx.fillStyle = ORANGE; ctx.fillRect(0, 0, 22, 230); ctx.fillStyle = "#f6d5b0"; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(11,-24); ctx.lineTo(22,0); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.strokeStyle = "#1f5b9d"; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(405, 365); ctx.lineTo(460, 280); ctx.stroke();
  ctx.strokeStyle = ORANGE; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(455, 365); ctx.lineTo(495, 300); ctx.stroke();
  ctx.restore();
}

function renderGraphic(options: TelegramGraphicOptions): HTMLCanvasElement {
  const width = 1200, height = 630;
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas is not supported by this browser.");

  ctx.fillStyle = "#020b18"; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = ORANGE; ctx.fillRect(0, 0, width, 9); ctx.fillRect(0, height - 9, width, 9);
  ctx.save(); ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 24; ctx.shadowOffsetY = 9; fillRound(ctx, 38, 30, 1124, 570, 20, NAVY2); ctx.restore();
  fillRound(ctx, 38, 30, 10, 570, 5, ORANGE);

  // Curved premium background shapes.
  const grad = ctx.createRadialGradient(930, 330, 20, 930, 330, 350);
  grad.addColorStop(0, "rgba(13,80,145,.42)"); grad.addColorStop(1, "rgba(13,80,145,0)");
  ctx.fillStyle = grad; ctx.fillRect(610, 80, 550, 450);
  ctx.fillStyle = "rgba(4,24,49,.65)"; ctx.beginPath(); ctx.arc(1020, 350, 250, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(245,163,0,.25)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1020, 350, 205, 0, Math.PI * 2); ctx.stroke();

  drawLogo(ctx); drawDownloadCorner(ctx); drawDots(ctx, 860, 155); drawDots(ctx, 1090, 510);

  fillRound(ctx, 68, 195, 145, 74, 17, ORANGE);
  ctx.fillStyle = NAVY; ctx.font = "900 34px Arial, Helvetica, sans-serif"; ctx.textAlign = "center"; ctx.fillText(options.level, 140, 244); ctx.textAlign = "left";
  ctx.fillStyle = WHITE; ctx.font = "900 76px Arial, Helvetica, sans-serif"; ctx.fillText(options.year, 245, 252);
  ctx.fillStyle = ORANGE; ctx.fillRect(68, 285, 585, 4);

  const subject = SUBJECT_NAMES[options.subject] || options.subject;
  const subjectSize = fitText(ctx, subject, 590, 60, 28);
  ctx.fillStyle = WHITE; ctx.font = `900 ${subjectSize}px Arial, Helvetica, sans-serif`; ctx.fillText(subject, 68, 352);

  fillRound(ctx, 68, 380, 585, 64, 15, "#0c3157"); strokeRound(ctx, 68, 380, 585, 64, 15, ORANGE, 1.5);
  drawBookIcon(ctx, 97, 396, 32, ORANGE);
  ctx.fillStyle = WHITE; ctx.font = "900 21px Arial, Helvetica, sans-serif"; ctx.fillText(MEDIUM_LABEL[options.medium], 150, 421);

  drawPaperIcon(ctx, 78, 470, 42, ORANGE);
  ctx.fillStyle = WHITE; ctx.font = "900 25px Arial, Helvetica, sans-serif"; ctx.fillText(options.docType === "marking" ? "MARKING SCHEME" : "QUESTION PAPER", 140, 500);

  drawArtBook(ctx, options);

  // Footer.
  ctx.fillStyle = "#04162d"; ctx.fillRect(38, 535, 1124, 65);
  ctx.fillStyle = "#5f738c"; ctx.fillRect(335, 548, 1, 35); ctx.fillRect(595, 548, 1, 35); ctx.fillRect(845, 548, 1, 35);
  ctx.fillStyle = WHITE; ctx.font = "900 13px Arial, Helvetica, sans-serif"; ctx.fillText("RELIABLE", 70, 558); ctx.fillStyle = MUTED; ctx.font = "700 12px Arial, Helvetica, sans-serif"; ctx.fillText("TRUSTED", 70, 579);
  ctx.fillStyle = WHITE; ctx.font = "900 15px Arial, Helvetica, sans-serif"; ctx.fillText("FREE DOWNLOAD", 382, 571); ctx.fillText("100% SAFE", 640, 571);
  ctx.font = "900 13px Arial, Helvetica, sans-serif"; ctx.fillText("PAST PAPERS", 880, 558); ctx.fillStyle = MUTED; ctx.font = "700 12px Arial, Helvetica, sans-serif"; ctx.fillText("& MARKING SCHEMES", 880, 579);
  return canvas;
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create Telegram PNG.")), "image/png", 1));
}

export async function createTelegramGraphic(options: TelegramGraphicOptions): Promise<File> {
  const blob = await canvasToPng(renderGraphic(options));
  return new File([blob], "telegram-post.png", { type: "image/png", lastModified: Date.now() });
}
