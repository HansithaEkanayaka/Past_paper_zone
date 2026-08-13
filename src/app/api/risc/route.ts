import { NextResponse } from "next/server";
import {
  createRemoteJWKSet,
  decodeProtectedHeader,
  jwtVerify,
} from "jose";

export const runtime = "nodejs";

const RISC_CONFIGURATION_URL =
  "https://accounts.google.com/.well-known/risc-configuration";

const VERIFICATION_EVENT =
  "https://schemas.openid.net/secevent/risc/event-type/verification";

const ACCOUNT_DISABLED_EVENT =
  "https://schemas.openid.net/secevent/risc/event-type/account-disabled";

const ACCOUNT_ENABLED_EVENT =
  "https://schemas.openid.net/secevent/risc/event-type/account-enabled";

const CREDENTIAL_CHANGE_REQUIRED_EVENT =
  "https://schemas.openid.net/secevent/risc/event-type/account-credential-change-required";

const SESSIONS_REVOKED_EVENT =
  "https://schemas.openid.net/secevent/risc/event-type/sessions-revoked";

type RiscConfiguration = {
  issuer: string;
  jwks_uri: string;
};

let configurationCache:
  | {
      value: RiscConfiguration;
      expiresAt: number;
    }
  | null = null;

async function getGoogleRiscConfiguration(): Promise<RiscConfiguration> {
  const now = Date.now();

  /*
   * Cache Google configuration for 1 hour.
   *
   * We still fetch it again periodically so key/configuration
   * changes are picked up automatically.
   */
  if (
    configurationCache &&
    configurationCache.expiresAt > now
  ) {
    return configurationCache.value;
  }

  const response = await fetch(
    RISC_CONFIGURATION_URL,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Unable to load Google RISC configuration (${response.status})`
    );
  }

  const data = (await response.json()) as Partial<RiscConfiguration>;

  if (
    typeof data.issuer !== "string" ||
    typeof data.jwks_uri !== "string"
  ) {
    throw new Error(
      "Google RISC configuration is missing issuer or jwks_uri"
    );
  }

  const configuration: RiscConfiguration = {
    issuer: data.issuer,
    jwks_uri: data.jwks_uri,
  };

  configurationCache = {
    value: configuration,
    expiresAt: now + 60 * 60 * 1000,
  };

  return configuration;
}

function getClientIds(): string[] {
  const raw = process.env.GOOGLE_RISC_CLIENT_IDS;

  if (!raw) {
    throw new Error(
      "GOOGLE_RISC_CLIENT_IDS is not configured"
    );
  }

  const clientIds = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (clientIds.length === 0) {
    throw new Error(
      "GOOGLE_RISC_CLIENT_IDS does not contain any client IDs"
    );
  }

  return clientIds;
}

function getSubjectSub(
  eventData: unknown
): string | null {
  if (!eventData || typeof eventData !== "object") {
    return null;
  }

  const data = eventData as {
    subject?: {
      sub?: unknown;
    };
  };

  if (
    data.subject &&
    typeof data.subject.sub === "string"
  ) {
    return data.subject.sub;
  }

  return null;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service:
      "Google Cross-Account Protection RISC receiver",
  });
}

export async function POST(request: Request) {
  try {
    /*
     * Google sends the Security Event Token as the raw JWT body.
     *
     * DO NOT use request.json().
     */
    const token = (await request.text()).trim();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing security event token",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Read Google's official RISC configuration document.
     *
     * This gives us:
     * - issuer
     * - jwks_uri
     */
    const configuration =
      await getGoogleRiscConfiguration();

    /*
     * Read the JWT header before verification only to
     * make sure it has a key ID.
     *
     * We DO NOT trust any decoded values until the
     * cryptographic verification succeeds.
     */
    const protectedHeader =
      decodeProtectedHeader(token);

    if (protectedHeader.alg !== "RS256") {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported RISC signing algorithm",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof protectedHeader.kid !== "string" ||
      !protectedHeader.kid
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "RISC token is missing kid",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Dynamically use Google's official JWKS endpoint.
     *
     * jose automatically selects the key using JWT "kid"
     * and refreshes keys when required.
     */
    const googleJWKS = createRemoteJWKSet(
      new URL(configuration.jwks_uri)
    );

    const clientIds = getClientIds();

    /*
     * Validate:
     *
     * - RS256 signature
     * - issuer
     * - audience
     *
     * RISC event tokens represent security events and can
     * be delivered after the original event occurred, so
     * we don't apply a short-lived expiration requirement.
     */
    const { payload } = await jwtVerify(
      token,
      googleJWKS,
      {
        algorithms: ["RS256"],
        issuer: configuration.issuer,
        audience: clientIds,
        clockTolerance: 60,
      }
    );

    /*
     * The token is now cryptographically trusted.
     */
    console.log("Valid Google RISC event received", {
      issuer: payload.iss,
      audience: payload.aud,
      issuedAt: payload.iat,
      jwtId: payload.jti,
    });

    const events =
      payload.events &&
      typeof payload.events === "object"
        ? (payload.events as Record<string, unknown>)
        : {};

    for (const [
      eventType,
      eventData,
    ] of Object.entries(events)) {
      const subjectSub =
        getSubjectSub(eventData);

      /*
       * Verification event
       */
      if (eventType === VERIFICATION_EVENT) {
        console.log(
          "RISC verification event received",
          {
            state: eventData,
          }
        );

        continue;
      }

      /*
       * Account disabled
       *
       * IMPORTANT:
       * Replace the TODO with your actual local-user
       * session/account disabling logic.
       */
      if (eventType === ACCOUNT_DISABLED_EVENT) {
        console.log(
          "RISC account-disabled event",
          {
            googleSub: subjectSub,
            eventData,
          }
        );

        /*
         * Example:
         *
         * await disableGoogleUser(subjectSub);
         */
        continue;
      }

      /*
       * Account enabled
       */
      if (eventType === ACCOUNT_ENABLED_EVENT) {
        console.log(
          "RISC account-enabled event",
          {
            googleSub: subjectSub,
            eventData,
          }
        );

        /*
         * Example:
         *
         * await enableGoogleUser(subjectSub);
         */
        continue;
      }

      /*
       * Credential change required
       */
      if (
        eventType ===
        CREDENTIAL_CHANGE_REQUIRED_EVENT
      ) {
        console.log(
          "RISC credential-change-required event",
          {
            googleSub: subjectSub,
            eventData,
          }
        );

        /*
         * Example:
         *
         * await revokeGoogleSessions(subjectSub);
         */
        continue;
      }

      /*
       * Sessions revoked
       */
      if (
        eventType === SESSIONS_REVOKED_EVENT
      ) {
        console.log(
          "RISC sessions-revoked event",
          {
            googleSub: subjectSub,
            eventData,
          }
        );

        /*
         * Example:
         *
         * await revokeLocalSessions(subjectSub);
         */
        continue;
      }

      /*
       * Unknown event types should not crash the receiver.
       */
      console.log(
        "Unhandled RISC event type",
        {
          eventType,
          eventData,
        }
      );
    }

    /*
     * Google expects a successful receiver to return
     * HTTP 202.
     */
    return new NextResponse(null, {
      status: 202,
    });
  } catch (error) {
    console.error(
      "RISC security event validation failed:",
      error
    );

    /*
     * Never treat an invalid/unverified JWT as a valid
     * security event.
     */
    return NextResponse.json(
      {
        success: false,
        error: "Invalid RISC security event token",
      },
      {
        status: 400,
      }
    );
  }
}