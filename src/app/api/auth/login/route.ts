import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email සහ password දෙකම දෙන්න." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        return NextResponse.json(
          {
            message:
              "ඔබේ email එක තවම confirm කරලා නෑ. Inbox එකේ (spam folder එකත් බලන්න) Supabase එකෙන් එවපු confirmation email එක check කරලා link එක click කරන්න.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { message: error.message || "Email එක හෝ password එක වැරදියි." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Successfully logged in!", user: data.user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
