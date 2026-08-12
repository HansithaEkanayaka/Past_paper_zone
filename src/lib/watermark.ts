import {
  PDFDocument,
  PDFPage,
  PDFArray,
  PDFName,
  PDFString,
  StandardFonts,
  rgb,
} from "pdf-lib";
import { WATERMARK_LOGO_BASE64 } from "./watermarkAssets";

/**
 * Professional PDF watermarking for uploaded past papers.
 *
 * Adds three things to every page:
 *  1. Header text with a yellow highlight.
 *  2. Footer text with a yellow highlight.
 *  3. A more visible center logo watermark.
 *
 * Header/footer and center logo are clickable and link to the website.
 */

const SITE_URL = "https://www.pastpaperzone.lk";
const BRAND_TEXT = "සියලුම විෂයන්ට අදාල ප්‍රශ්න පත්‍ර/පිළිතුරු පත්‍ර ලබා ගැනීමට www.pastpaperzone.lk වෙත පිවිසෙන්න";

// Brand text color
const BRAND_COLOR = rgb(0.145, 0.4, 0.68);

// Yellow highlight color
const HIGHLIGHT_COLOR = rgb(1, 0.92, 0.25);

// Highlight transparency.
// 0 = fully transparent, 1 = fully solid.
const HIGHLIGHT_OPACITY = 0.65;

const HEADER_FONT_SIZE = 8.5;
const FOOTER_FONT_SIZE = 8.5;

const HEADER_Y_FROM_TOP = 20;
const FOOTER_Y_FROM_BOTTOM = 16;

// ------------------------------------------------------------
// CENTER LOGO WATERMARK
// Increased from 0.08 so the logo is easier to see.
// ------------------------------------------------------------
const LOGO_OPACITY = 0.16;

const LOGO_MAX_WIDTH_RATIO = 0.42;
const LOGO_MAX_HEIGHT_RATIO = 0.38;

// Padding around the yellow highlight
const HIGHLIGHT_PADDING_X = 4;
const HIGHLIGHT_PADDING_Y = 2.5;

function base64ToBytes(base64: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64, "base64"));
}

/**
 * Adds an invisible clickable Link annotation over a rectangular
 * region of a PDF page.
 */
function addLinkAnnotation(
  page: PDFPage,
  doc: PDFDocument,
  rect: [number, number, number, number],
  url: string
) {
  try {
    const { context } = doc;

    const annotDict = context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: rect,
      Border: [0, 0, 0],
      A: {
        Type: "Action",
        S: "URI",
        URI: PDFString.of(url),
      },
    });

    const annotRef = context.register(annotDict);

    const existingAnnots = page.node.lookup(
      PDFName.of("Annots"),
      PDFArray
    );

    if (existingAnnots instanceof PDFArray) {
      existingAnnots.push(annotRef);
    } else {
      page.node.set(
        PDFName.of("Annots"),
        context.obj([annotRef])
      );
    }
  } catch (err) {
    console.error(
      "Watermark: failed to add link annotation",
      err
    );
  }
}

export async function applyWatermark(
  pdfBytes: ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Font
  const italicFont = await pdfDoc.embedFont(
    StandardFonts.TimesRomanItalic
  );

  // Logo
  const logoImage = await pdfDoc.embedPng(
    base64ToBytes(WATERMARK_LOGO_BASE64)
  );

  const logoAspect = logoImage.height / logoImage.width;

  // Text widths
  const headerTextWidth = italicFont.widthOfTextAtSize(
    BRAND_TEXT,
    HEADER_FONT_SIZE
  );

  const footerTextWidth = italicFont.widthOfTextAtSize(
    BRAND_TEXT,
    FOOTER_FONT_SIZE
  );

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();

    // ========================================================
    // CENTER LOGO WATERMARK
    // ========================================================

    let logoWidth = width * LOGO_MAX_WIDTH_RATIO;
    let logoHeight = logoWidth * logoAspect;

    if (logoHeight > height * LOGO_MAX_HEIGHT_RATIO) {
      logoHeight = height * LOGO_MAX_HEIGHT_RATIO;
      logoWidth = logoHeight / logoAspect;
    }

    const logoX = (width - logoWidth) / 2;
    const logoY = (height - logoHeight) / 2;

    page.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,

      // Increased visibility
      opacity: LOGO_OPACITY,
    });

    addLinkAnnotation(
      page,
      pdfDoc,
      [
        logoX,
        logoY,
        logoX + logoWidth,
        logoY + logoHeight,
      ],
      SITE_URL
    );

    // ========================================================
    // HEADER
    // ========================================================

    const headerX = (width - headerTextWidth) / 2;
    const headerY = height - HEADER_Y_FROM_TOP;

    // Yellow highlight rectangle
    const headerHighlightX =
      headerX - HIGHLIGHT_PADDING_X;

    const headerHighlightY =
      headerY - HIGHLIGHT_PADDING_Y;

    const headerHighlightWidth =
      headerTextWidth +
      HIGHLIGHT_PADDING_X * 2;

    const headerHighlightHeight =
      HEADER_FONT_SIZE +
      HIGHLIGHT_PADDING_Y * 2;

    page.drawRectangle({
      x: headerHighlightX,
      y: headerHighlightY,
      width: headerHighlightWidth,
      height: headerHighlightHeight,
      color: HIGHLIGHT_COLOR,
      opacity: HIGHLIGHT_OPACITY,
    });

    // Header text
    page.drawText(BRAND_TEXT, {
      x: headerX,
      y: headerY,
      size: HEADER_FONT_SIZE,
      font: italicFont,
      color: BRAND_COLOR,
    });

    // Clickable header area
    addLinkAnnotation(
      page,
      pdfDoc,
      [
        headerHighlightX,
        headerHighlightY,
        headerHighlightX + headerHighlightWidth,
        headerHighlightY + headerHighlightHeight,
      ],
      SITE_URL
    );

    // ========================================================
    // FOOTER
    // ========================================================

    const footerX = (width - footerTextWidth) / 2;
    const footerY = FOOTER_Y_FROM_BOTTOM;

    // Yellow highlight rectangle
    const footerHighlightX =
      footerX - HIGHLIGHT_PADDING_X;

    const footerHighlightY =
      footerY - HIGHLIGHT_PADDING_Y;

    const footerHighlightWidth =
      footerTextWidth +
      HIGHLIGHT_PADDING_X * 2;

    const footerHighlightHeight =
      FOOTER_FONT_SIZE +
      HIGHLIGHT_PADDING_Y * 2;

    page.drawRectangle({
      x: footerHighlightX,
      y: footerHighlightY,
      width: footerHighlightWidth,
      height: footerHighlightHeight,
      color: HIGHLIGHT_COLOR,
      opacity: HIGHLIGHT_OPACITY,
    });

    // Footer text
    page.drawText(BRAND_TEXT, {
      x: footerX,
      y: footerY,
      size: FOOTER_FONT_SIZE,
      font: italicFont,
      color: BRAND_COLOR,
    });

    // Clickable footer area
    addLinkAnnotation(
      page,
      pdfDoc,
      [
        footerHighlightX,
        footerHighlightY,
        footerHighlightX + footerHighlightWidth,
        footerHighlightY + footerHighlightHeight,
      ],
      SITE_URL
    );
  }

  return pdfDoc.save();
}