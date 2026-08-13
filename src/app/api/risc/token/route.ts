import { NextResponse } from "next/server";
import { importPKCS8, SignJWT } from "jose";

export const runtime = "nodejs";

const RISC_AUDIENCE =
  "https://risc.googleapis.com/google.identity.risc.v1beta.RiscManagementService";

function getPrivateKey() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!key) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not configured"
    );
  }

  return key.replace(/\\n/g, "\n");
}

export async function POST(request: Request) {
  try {
    /*
     * Protect this endpoint.
     */
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
      request.headers.get("x-risc-admin-secret") || "";

    if (suppliedSecret !== adminSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    if (!clientEmail) {
      throw new Error(
        "GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured"
      );
    }

    const privateKey = await importPKCS8(
      getPrivateKey(),
      "RS256"
    );

    const now = Math.floor(Date.now() / 1000);

    /*
     * Google RISC documentation requires:
     *
     * iss = service account email
     * sub = service account email
     * aud = RISC management service
     * iat = current time
     * exp = current time + 3600
     */
    const token = await new SignJWT({})
      .setProtectedHeader({
        alg: "RS256",
        typ: "JWT",
      })
      .setIssuer(clientEmail)
      .setSubject(clientEmail)
      .setAudience(RISC_AUDIENCE)
      .setIssuedAt(now)
      .setExpirationTime(now + 3600)
      .sign(privateKey);

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