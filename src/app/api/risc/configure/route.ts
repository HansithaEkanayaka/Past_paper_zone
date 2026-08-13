import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RISC_UPDATE_URL =
  "https://risc.googleapis.com/v1beta/stream:update";

const RISC_VERIFY_URL =
  "https://risc.googleapis.com/v1beta/stream:verify";

const DELIVERY_METHOD =
  "https://schemas.openid.net/secevent/risc/delivery-method/push";

const RECEIVER_URL =
  "https://pastpaperzone.lk/api/risc";

const EVENTS = [
  "https://schemas.openid.net/secevent/risc/event-type/account-disabled",
  "https://schemas.openid.net/secevent/risc/event-type/account-enabled",
  "https://schemas.openid.net/secevent/risc/event-type/account-credential-change-required",
  "https://schemas.openid.net/secevent/risc/event-type/sessions-revoked",
  "https://schemas.openid.net/secevent/risc/event-type/verification",
];

async function getAuthorizationToken() {
  const adminSecret = process.env.RISC_ADMIN_SECRET;

  if (!adminSecret) {
    throw new Error("RISC_ADMIN_SECRET is not configured");
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!clientEmail) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured"
    );
  }

  const privateKeyRaw =
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!privateKeyRaw) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not configured"
    );
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  const { importPKCS8, SignJWT } = await import("jose");

  const key = await importPKCS8(privateKey, "RS256");

  const now = Math.floor(Date.now() / 1000);

  return await new SignJWT({})
    .setProtectedHeader({
      alg: "RS256",
      typ: "JWT",
    })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience(
      "https://risc.googleapis.com/google.identity.risc.v1beta.RiscManagementService"
    )
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);
}

async function checkAdmin(request: Request) {
  const expected = process.env.RISC_ADMIN_SECRET;

  if (!expected) {
    return false;
  }

  return (
    request.headers.get("x-risc-admin-secret") === expected
  );
}

export async function POST(request: Request) {
  try {
    if (!(await checkAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const token = await getAuthorizationToken();

    const response = await fetch(RISC_UPDATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delivery: {
          delivery_method: DELIVERY_METHOD,
          url: RECEIVER_URL,
        },
        events_requested: EVENTS,
      }),
    });

    const text = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) {
      console.error("Google RISC configuration failed:", {
        status: response.status,
        data,
      });

      return NextResponse.json(
        {
          success: false,
          google_status: response.status,
          google_response: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "RISC stream configured successfully",
      receiver: RECEIVER_URL,
      events: EVENTS,
      google_response: data,
    });
  } catch (error) {
    console.error("RISC configuration error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "RISC configuration failed",
      },
      { status: 500 }
    );
  }
}

/*
 * Optional verification endpoint.
 *
 * POST /api/risc/configure
 * does stream:update.
 *
 * GET /api/risc/configure
 * performs stream:verify.
 */
export async function GET(request: Request) {
  try {
    if (!(await checkAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const token = await getAuthorizationToken();

    const state =
      "pastpaper-risc-test-" +
      Date.now().toString();

    const response = await fetch(RISC_VERIFY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
      }),
    });

    const text = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          google_status: response.status,
          google_response: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Verification request sent. Check your deployment logs for the verification event.",
      state,
      google_response: data,
    });
  } catch (error) {
    console.error("RISC verification error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "RISC verification failed",
      },
      { status: 500 }
    );
  }
}