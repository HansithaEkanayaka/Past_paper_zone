import { NextResponse } from "next/server";
import { sendSiteEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendSiteEmail({
      subject: `[PastPaperZone] Contact Form: ${subject || "New message"}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "-"}</p>
        <p><strong>Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
