import {
  PDFArray,
  PDFDocument,
  PDFName,
  PDFPage,
  PDFString,
  StandardFonts,
  rgb,
} from "pdf-lib";

const SITE_URL = "https://www.pastpaperzone.lk";
const BRAND_TEXT = "Downloaded from: www.pastpaperzone.lk";

const BRAND_COLOR = rgb(0.145, 0.4, 0.68);
const HIGHLIGHT_COLOR = rgb(1, 0.92, 0.25);
const HIGHLIGHT_OPACITY = 0.65;

const HEADER_FONT_SIZE = 8.5;
const FOOTER_FONT_SIZE = 8.5;
const HEADER_Y_FROM_TOP = 20;
const FOOTER_Y_FROM_BOTTOM = 16;

// Keep the logo visible but subtle.
const LOGO_OPACITY = 0.16;
const LOGO_MAX_WIDTH_RATIO = 0.34;
const LOGO_MAX_HEIGHT_RATIO = 0.30;

const HIGHLIGHT_PADDING_X = 4;
const HIGHLIGHT_PADDING_Y = 2.5;

let cachedLogoBytes: Uint8Array | null = null;

async function getWatermarkLogo(): Promise<Uint8Array> {
  if (cachedLogoBytes) return cachedLogoBytes;

  const response = await fetch("/watermark-logo.png", {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to load the watermark logo.");
  }

  cachedLogoBytes = new Uint8Array(await response.arrayBuffer());
  return cachedLogoBytes;
}

function addLinkAnnotation(
  page: PDFPage,
  doc: PDFDocument,
  rect: [number, number, number, number],
  url: string
) {
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
}

/**
 * Browser-side PDF watermarking.
 *
 * This intentionally runs in the admin browser instead of the Cloudflare
 * Worker. That keeps pdf-lib and the logo out of the Worker server bundle,
 * which is required for Cloudflare's Free 3 MiB Worker limit.
 */
export async function applyWatermarkInBrowser(
  pdfBytes: ArrayBuffer
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const logoBytes = await getWatermarkLogo();
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoAspect = logoImage.height / logoImage.width;

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

    addLinkAnnotation(page, pdfDoc, [
      logoX,
      logoY,
      logoX + logoWidth,
      logoY + logoHeight,
    ], SITE_URL);

    const headerX = (width - headerTextWidth) / 2;
    const headerY = height - HEADER_Y_FROM_TOP;
    const headerHighlightX = headerX - HIGHLIGHT_PADDING_X;
    const headerHighlightY = headerY - HIGHLIGHT_PADDING_Y;
    const headerHighlightWidth =
      headerTextWidth + HIGHLIGHT_PADDING_X * 2;
    const headerHighlightHeight =
      HEADER_FONT_SIZE + HIGHLIGHT_PADDING_Y * 2;

    page.drawRectangle({
      x: headerHighlightX,
      y: headerHighlightY,
      width: headerHighlightWidth,
      height: headerHighlightHeight,
      color: HIGHLIGHT_COLOR,
      opacity: HIGHLIGHT_OPACITY,
    });

    page.drawText(BRAND_TEXT, {
      x: headerX,
      y: headerY,
      size: HEADER_FONT_SIZE,
      font: italicFont,
      color: BRAND_COLOR,
    });

    addLinkAnnotation(page, pdfDoc, [
      headerHighlightX,
      headerHighlightY,
      headerHighlightX + headerHighlightWidth,
      headerHighlightY + headerHighlightHeight,
    ], SITE_URL);

    const footerX = (width - footerTextWidth) / 2;
    const footerY = FOOTER_Y_FROM_BOTTOM;
    const footerHighlightX = footerX - HIGHLIGHT_PADDING_X;
    const footerHighlightY = footerY - HIGHLIGHT_PADDING_Y;
    const footerHighlightWidth =
      footerTextWidth + HIGHLIGHT_PADDING_X * 2;
    const footerHighlightHeight =
      FOOTER_FONT_SIZE + HIGHLIGHT_PADDING_Y * 2;

    page.drawRectangle({
      x: footerHighlightX,
      y: footerHighlightY,
      width: footerHighlightWidth,
      height: footerHighlightHeight,
      color: HIGHLIGHT_COLOR,
      opacity: HIGHLIGHT_OPACITY,
    });

    page.drawText(BRAND_TEXT, {
      x: footerX,
      y: footerY,
      size: FOOTER_FONT_SIZE,
      font: italicFont,
      color: BRAND_COLOR,
    });

    addLinkAnnotation(page, pdfDoc, [
      footerHighlightX,
      footerHighlightY,
      footerHighlightX + footerHighlightWidth,
      footerHighlightY + footerHighlightHeight,
    ], SITE_URL);
  }

  return pdfDoc.save();
}
