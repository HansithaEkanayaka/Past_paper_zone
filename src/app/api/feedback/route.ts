import { NextResponse } from "next/server";
import { sendSiteEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, comment, rating } = body;

    if (!name || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailResult = await sendSiteEmail({
      subject: `[PastPaperZone] New Feedback (${rating ?? "?"}/5) from ${name}`,
      replyTo: email || undefined,
      html: `
        <h2>New Student Feedback</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Rating:</strong> ${rating ?? "-"} / 5</p>
        <p><strong>Comment:</strong><br/>${(comment || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (!emailResult.sent) {
      return NextResponse.json({ error: "Email service is not configured or rejected the message." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback submit error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
