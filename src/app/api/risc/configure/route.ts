import { NextResponse } from "next/server";

import {
  checkRiscAdminSecret,
  createRiscAuthorizationToken,
  readResponseBody,
  RISC_DELIVERY_METHOD,
  RISC_EVENTS,
  RISC_RECEIVER_URL,
  RISC_STREAM_URL,
  RISC_UPDATE_URL,
  RISC_VERIFY_URL,
} from "@/lib/risc";

export const runtime = "nodejs";

/**
 * POST /api/risc/configure
 *
 * Registers / updates the Google RISC event stream.
 */
export async function POST(request: Request) {
  try {
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

    const body = {
      delivery: {
        delivery_method: RISC_DELIVERY_METHOD,
        url: RISC_RECEIVER_URL,
      },
      events_requested: RISC_EVENTS,
    };

    const response = await fetch(RISC_UPDATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const googleResponse = await readResponseBody(response);

    if (!response.ok) {
      console.error("Google RISC stream:update failed:", {
        status: response.status,
        response: googleResponse,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Google RISC stream configuration failed",
          google_status: response.status,
          google_response: googleResponse,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "RISC stream configured successfully",
      receiver: RISC_RECEIVER_URL,
      delivery_method: RISC_DELIVERY_METHOD,
      events: RISC_EVENTS,
      google_response: googleResponse,
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

/**
 * GET /api/risc/configure
 *
 * Returns the current Google RISC stream configuration.
 */
export async function GET(request: Request) {
  try {
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

    const response = await fetch(RISC_STREAM_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const googleResponse = await readResponseBody(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to read Google RISC stream configuration",
          google_status: response.status,
          google_response: googleResponse,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      google_response: googleResponse,
    });
  } catch (error) {
    console.error(
      "RISC stream configuration read failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to read RISC configuration",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/risc/configure
 *
 * Sends a verification request through Google's RISC stream.
 *
 * This is intentionally separate from POST because:
 *
 * POST = configure stream
 * PUT  = verify stream
 */
export async function PUT(request: Request) {
  try {
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

    const state =
      `pastpaperzone-risc-${Date.now()}-${crypto.randomUUID()}`;

    const response = await fetch(RISC_VERIFY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
      }),
      cache: "no-store",
    });

    const googleResponse = await readResponseBody(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Google RISC verification request failed",
          google_status: response.status,
          google_response: googleResponse,
          state,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "RISC verification request sent successfully",
      state,
      google_response: googleResponse,
    });
  } catch (error) {
    console.error(
      "RISC verification request failed:",
      error
    );

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