import { NextResponse } from "next/server";
import { sendSiteEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, topic, message } = body;

    console.log("--> New Paper Request Received:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Topic: ${topic}`);
    console.log(`Message: ${message}`);

    await sendSiteEmail({
      subject: `[PastPaperZone] Missing Paper Request: ${subject || "Untitled"}`,
      replyTo: email,
      html: `
        <h2>New Missing Paper / Subject Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Request received" });
  } catch (error) {
    console.error("Request submit error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}