import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const runtime = "nodejs";

const GOOGLE_RISC_CONFIG_URL =
  "https://accounts.google.com/.well-known/risc-configuration";

const googleJWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);

const RISC_ISSUER = "https://accounts.google.com/";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "Google Cross-Account Protection RISC receiver",
  });
}

export async function POST(request: Request) {
  try {
    /*
     * Google sends the Security Event Token as a signed JWT.
     *
     * IMPORTANT:
     * Do not use request.json() here.
     */
    const token = (await request.text()).trim();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing security event token",
        },
        { status: 400 }
      );
    }

    const clientIds = (process.env.GOOGLE_RISC_CLIENT_IDS || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (clientIds.length === 0) {
      console.error("GOOGLE_RISC_CLIENT_IDS is not configured");

      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_RISC_CLIENT_IDS is not configured",
        },
        { status: 500 }
      );
    }

    /*
     * Verify:
     * - JWT signature
     * - issuer
     * - audience
     *
     * Google says RISC event tokens should have their
     * expiration check disabled because they represent
     * historical security events.
     */
    const { payload } = await jwtVerify(token, googleJWKS, {
      algorithms: ["RS256"],
      issuer: RISC_ISSUER,
      audience: clientIds,
      clockTolerance: 60,
    });

    console.log("Valid Google RISC security event:", {
      iss: payload.iss,
      aud: payload.aud,
      iat: payload.iat,
      jti: payload.jti,
      events: payload.events,
    });

    /*
     * Handle the events here.
     */
    const events = payload.events as
      | Record<string, unknown>
      | undefined;

    if (events) {
      for (const [eventType, eventData] of Object.entries(events)) {
        console.log("RISC event:", eventType, eventData);

        /*
         * Example:
         *
         * account-disabled
         * -----------------
         * You can find the Google user ID from:
         *
         * eventData.subject.sub
         *
         * and then revoke/disable the corresponding
         * session in your database.
         */

        if (
          eventType ===
          "https://schemas.openid.net/secevent/risc/event-type/verification"
        ) {
          console.log("RISC verification event received:", eventData);
        }

        if (
          eventType ===
          "https://schemas.openid.net/secevent/risc/event-type/account-disabled"
        ) {
          console.log("Google account-disabled event:", eventData);

          // TODO:
          // Find the user by Google "sub"
          // and revoke/disable their local sessions.
        }

        if (
          eventType ===
          "https://schemas.openid.net/secevent/risc/event-type/account-enabled"
        ) {
          console.log("Google account-enabled event:", eventData);

          // TODO:
          // Re-enable the user's Google Sign-In if appropriate.
        }

        if (
          eventType ===
          "https://schemas.openid.net/secevent/risc/event-type/sessions-revoked"
        ) {
          console.log("Google sessions-revoked event:", eventData);

          // TODO:
          // Revoke the user's local sessions.
        }
      }
    }

    /*
     * Google expects HTTP 202 for a valid security event token.
     */
    return new NextResponse(null, {
      status: 202,
    });
  } catch (error) {
    console.error("RISC token validation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid RISC security event token",
      },
      { status: 400 }
    );
  }
}