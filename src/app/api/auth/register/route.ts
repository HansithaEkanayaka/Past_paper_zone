import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "සියලුම කොටස් පුරවන්න." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "මුරපද දෙක නොගැලපේ." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "මුරපදය අකුරු 6 කට වඩා දිග විය යුතුය." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // This is the actual "create account" call - Supabase hashes the
    // password and stores the new user in its own managed database.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }, // saved alongside the user record
      },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    try {
      if (data.user) {
        await createAdminClient().from("paper_activity").insert({
          action: "signup",
          user_id: data.user.id,
        });
      }
    } catch (activityError) {
      console.error("Signup activity log error:", activityError);
    }

    return NextResponse.json(
      { message: "Account created successfully!", user: data.user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
