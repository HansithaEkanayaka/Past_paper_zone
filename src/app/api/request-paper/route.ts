import { NextResponse } from "next/server";

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

    // මෙතනදී ඔබට අවශ්‍ය නම් Telegram Bot එකකට/Discord Webhook එකකට හෝ Email එකකට Message එකක් Send වන ලෙස සකස් කළ හැක.

    return NextResponse.json({ success: true, message: "Request received" });
  } catch (error) {
    console.error("Request submit error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}