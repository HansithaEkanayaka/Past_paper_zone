import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  console.log("--> [1] Upload API hit!");

  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const subjectId = formData.get("subjectId") as string;
    const year = formData.get("year") as string;
    const medium = formData.get("medium") as string;
    const docType = formData.get("docType") as string;

    if (!file) {
      console.log("--> [ERR] No file provided");
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    console.log("--> [2] Processing PDF with pdf-lib...");
    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();
      page.drawText("PASTPAPERZONE", {
        x: width / 2 - 150,
        y: height / 2,
        size: 36,
        color: rgb(0.85, 0.35, 0.15),
        opacity: 0.25,
        rotate: degrees(45),
      });
    }

    const modifiedPdfBytes = await pdfDoc.save();
    const buffer = Buffer.from(modifiedPdfBytes);
    console.log("--> [3] Watermark added successfully!");

    
    // -Date.now() කොටස ඉවත් කර static නමක් ලබා දෙන්න:
    const fileName = `papers/${subjectId}/${year}/${medium}/${docType}.pdf`;
    
    console.log("--> ENV CHECK:");
    console.log("Bucket:", process.env.R2_BUCKET_NAME);
    console.log("Account ID:", process.env.R2_ACCOUNT_ID ? "EXISTS" : "MISSING ❌");
    console.log("Access Key:", process.env.R2_ACCESS_KEY_ID ? "EXISTS" : "MISSING ❌");

    console.log("--> [4] Sending to Cloudflare R2...", fileName);

    // R2 Upload Request
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: "application/pdf",
      })
    );

    console.log("--> [5] Successfully uploaded to R2!");

    const fileUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`;
    return NextResponse.json({ success: true, url: fileUrl, key: fileName });

  } catch (error: any) {
    console.error("--> [R2 ERROR]:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Upload failed" }, { status: 500 });
  }
}