import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Bucket, getR2BucketName, getR2S3Client } from "@/lib/r2";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const subjectId = String(formData.get("subjectId") || "");
    const year = String(formData.get("year") || "");
    const medium = String(formData.get("medium") || "");
    const docType = String(formData.get("docType") || "");

    if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });
    if (!subjectId || !year || !medium || !docType) {
      return NextResponse.json({ error: "subjectId, year, medium and docType are required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    for (const page of pdfDoc.getPages()) {
      const { width, height } = page.getSize();
      page.drawText("PASTPAPERZONE", {
        x: width / 2 - 150, y: height / 2, size: 36,
        color: rgb(0.85, 0.35, 0.15), opacity: 0.25, rotate: degrees(45),
      });
    }

    const buffer = Buffer.from(await pdfDoc.save());
    const key = `papers/${subjectId}/${year}/${medium}/${docType}.pdf`;
    const bucket = await getR2Bucket();

    if (bucket) {
      await bucket.put(key, buffer, { httpMetadata: { contentType: "application/pdf" } });
    } else {
      await getR2S3Client().send(new PutObjectCommand({
        Bucket: getR2BucketName(), Key: key, Body: buffer, ContentType: "application/pdf",
      }));
    }

    return NextResponse.json({ success: true, key });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
