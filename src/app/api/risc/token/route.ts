import { NextResponse } from "next/server";
import {
  checkRiscAdminSecret,
  createRiscAuthorizationToken,
  RISC_AUDIENCE,
} from "@/lib/risc";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    /*
     * This endpoint creates a powerful RISC management
     * authorization token, so never expose it publicly.
     */
    if (!checkRiscAdminSecret(request)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const token = await createRiscAuthorizationToken();

    return NextResponse.json({
      success: true,
      token,
      token_type: "Bearer",
      expires_in: 3600,
      audience: RISC_AUDIENCE,
    });
  } catch (error) {
    console.error(
      "RISC authorization token generation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate RISC authorization token",
      },
      { status: 500 }
    );
  }
}