import { NextResponse } from "next/server";
import { importPKCS8, SignJWT } from "jose";

export const runtime = "nodejs";

const RISC_AUDIENCE =
  "https://risc.googleapis.com/google.identity.risc.v1beta.RiscManagementService";

export async function POST(request: Request) {
  try {
    const adminSecret = process.env.RISC_ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "RISC_ADMIN_SECRET is not configured",
        },
        { status: 500 }
      );
    }

    const suppliedSecret =
      request.headers.get("x-risc-admin-secret")?.trim() || "";

    if (!suppliedSecret || suppliedSecret !== adminSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const clientEmail =
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    const privateKeyRaw =
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    const privateKeyId =
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID;

    if (!clientEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured",
        },
        { status: 500 }
      );
    }

    if (!privateKeyRaw) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not configured",
        },
        { status: 500 }
      );
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

    const signingKey = await importPKCS8(
      privateKey,
      "RS256"
    );

    const now = Math.floor(Date.now() / 1000);

    const jwt = new SignJWT({})
      .setProtectedHeader({
        alg: "RS256",
        typ: "JWT",
        ...(privateKeyId ? { kid: privateKeyId } : {}),
      })
      .setIssuer(clientEmail)
      .setSubject(clientEmail)
      .setAudience(RISC_AUDIENCE)
      .setIssuedAt(now)
      .setExpirationTime(now + 3600);

    const token = await jwt.sign(signingKey);

    return NextResponse.json({
      success: true,
      token,
      token_type: "Bearer",
      expires_in: 3600,
      audience: RISC_AUDIENCE,
    });
  } catch (error) {
    console.error("RISC authorization token error:", error);

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