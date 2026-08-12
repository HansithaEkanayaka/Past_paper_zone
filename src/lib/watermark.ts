import { PDFDocument, PDFPage, PDFArray, PDFName, PDFString, StandardFonts, rgb } from "pdf-lib";
import { WATERMARK_LOGO_BASE64 } from "./watermarkAssets";

/**
 * Professional PDF watermarking for uploaded past papers.
 *
 * Adds three things to every page:
 *  1. A slim header line with the site address, in an elegant italic font.
 *  2. A matching footer line.
 *  3. A large, very faint center logo watermark.
 *
 * Every one of these is also a clickable link back to the site, so a reader
 * tapping the header/footer text or the center logo is taken to pastpaperzone.lk.
 * Everything is deliberately low-opacity / edge-placed so it never gets in the
 * way of the actual paper content.
 */

const SITE_URL = "https://www.pastpaperzone.lk";
const BRAND_TEXT = "Downloaded from: www.pastpaperzone.lk";

// Matches the blue used in the PastPaperZone logo/wordmark.
const BRAND_COLOR = rgb(0.145, 0.4, 0.68);

const HEADER_FONT_SIZE = 8.5;
const FOOTER_FONT_SIZE = 8.5;
const HEADER_Y_FROM_TOP = 20; // pt from the top edge
const FOOTER_Y_FROM_BOTTOM = 16; // pt from the bottom edge

// Center logo: kept faint and capped in size so it can never obscure content.
const LOGO_OPACITY = 0.08;
const LOGO_MAX_WIDTH_RATIO = 0.42; // of page width
const LOGO_MAX_HEIGHT_RATIO = 0.38; // of page height

function base64ToBytes(base64: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64, "base64"));
}

/**
 * Adds an invisible clickable "Link" annotation over a rectangular region of a page.
 * Wrapped defensively: if annotation construction ever fails for a given PDF, the
 * visual watermark still succeeds - only the click-through link is skipped.
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

    const existingAnnots = page.node.lookup(PDFName.of("Annots"), PDFArray);
    if (existingAnnots instanceof PDFArray) {
      existingAnnots.push(annotRef);
    } else {
      page.node.set(PDFName.of("Annots"), context.obj([annotRef]));
    }
  } catch (err) {
    console.error("Watermark: failed to add link annotation", err);
  }
}

export async function applyWatermark(pdfBytes: ArrayBuffer | Uint8Array): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const logoImage = await pdfDoc.embedPng(base64ToBytes(WATERMARK_LOGO_BASE64));
  const logoAspect = logoImage.height / logoImage.width;

  const headerTextWidth = italicFont.widthOfTextAtSize(BRAND_TEXT, HEADER_FONT_SIZE);
  const footerTextWidth = italicFont.widthOfTextAtSize(BRAND_TEXT, FOOTER_FONT_SIZE);

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();

    // --- Center logo watermark ---
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
      opacity: LOGO_OPACITY,
    });
    addLinkAnnotation(page, pdfDoc, [logoX, logoY, logoX + logoWidth, logoY + logoHeight], SITE_URL);

    // --- Header ---
    const headerX = (width - headerTextWidth) / 2;
    const headerY = height - HEADER_Y_FROM_TOP;
    page.drawText(BRAND_TEXT, {
      x: headerX,
      y: headerY,
      size: HEADER_FONT_SIZE,
      font: italicFont,
      color: BRAND_COLOR,
    });
    addLinkAnnotation(
      page,
      pdfDoc,
      [headerX - 2, headerY - 3, headerX + headerTextWidth + 2, headerY + HEADER_FONT_SIZE + 2],
      SITE_URL
    );

    // --- Footer ---
    const footerX = (width - footerTextWidth) / 2;
    const footerY = FOOTER_Y_FROM_BOTTOM;
    page.drawText(BRAND_TEXT, {
      x: footerX,
      y: footerY,
      size: FOOTER_FONT_SIZE,
      font: italicFont,
      color: BRAND_COLOR,
    });
    addLinkAnnotation(
      page,
      pdfDoc,
      [footerX - 2, footerY - 3, footerX + footerTextWidth + 2, footerY + FOOTER_FONT_SIZE + 2],
      SITE_URL
    );
  }

  return pdfDoc.save();
}
