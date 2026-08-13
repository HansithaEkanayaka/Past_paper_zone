import { importPKCS8, SignJWT } from "jose";

export const RISC_AUDIENCE =
  "https://risc.googleapis.com/google.identity.risc.v1beta.RiscManagementService";

export const RISC_UPDATE_URL =
  "https://risc.googleapis.com/v1beta/stream:update";

export const RISC_VERIFY_URL =
  "https://risc.googleapis.com/v1beta/stream:verify";

export const RISC_STREAM_URL =
  "https://risc.googleapis.com/v1beta/stream";

export const RISC_STATUS_UPDATE_URL =
  "https://risc.googleapis.com/v1beta/stream/status:update";

export const RISC_DELIVERY_METHOD =
  "https://schemas.openid.net/secevent/risc/delivery-method/push";

export const RISC_RECEIVER_URL =
  "https://pastpaperzone.lk/api/risc";

export const RISC_EVENTS = [
  "https://schemas.openid.net/secevent/risc/event-type/account-disabled",
  "https://schemas.openid.net/secevent/risc/event-type/account-enabled",
  "https://schemas.openid.net/secevent/risc/event-type/account-credential-change-required",
  "https://schemas.openid.net/secevent/risc/event-type/sessions-revoked",
  "https://schemas.openid.net/secevent/risc/event-type/verification",
];

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

function getPrivateKey(): string {
  return getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
    /\\n/g,
    "\n"
  );
}

export async function createRiscAuthorizationToken(): Promise<string> {
  const clientEmail = getRequiredEnv(
    "GOOGLE_SERVICE_ACCOUNT_EMAIL"
  );

  const privateKeyId = getRequiredEnv(
    "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID"
  );

  const privateKey = await importPKCS8(
    getPrivateKey(),
    "RS256"
  );

  const now = Math.floor(Date.now() / 1000);

  /*
   * Google RISC authorization token:
   *
   * iss = service account email
   * sub = service account email
   * aud = RISC Management Service
   * iat = current Unix time
   * exp = exactly one hour later
   *
   * kid = service account private_key_id
   */
  return await new SignJWT({})
    .setProtectedHeader({
      alg: "RS256",
      typ: "JWT",
      kid: privateKeyId,
    })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience(RISC_AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);
}

export function checkRiscAdminSecret(request: Request): boolean {
  const expected = process.env.RISC_ADMIN_SECRET;

  if (!expected) {
    return false;
  }

  const supplied = request.headers.get(
    "x-risc-admin-secret"
  );

  return supplied === expected;
}

export async function readResponseBody(
  response: Response
): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}