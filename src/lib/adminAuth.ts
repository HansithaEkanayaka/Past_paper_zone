// Lightweight signed-cookie session for the /admin/dashboard area.
//
// There's no user database in this project, so this intentionally does NOT
// try to be a full auth system — it's a single shared admin password
// (ADMIN_PASSWORD env var) plus a signed, time-limited cookie so we don't
// have to send the password on every request.
//
// Built on the Web Crypto API (globalThis.crypto.subtle) rather than
// Node's `crypto` module / Buffer, so the exact same code runs in both
// middleware.ts (Edge runtime) and the API route handlers (Node runtime).

export const ADMIN_COOKIE_NAME = "pz_admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET (or at least ADMIN_PASSWORD) must be set to use admin auth."
    );
  }
  return secret;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Creates a new signed session token: "<expiryEpochMs>.<hmacHex>" */
export async function createAdminToken(): Promise<string> {
  const secret = getSecret();
  const expires = Date.now() + SESSION_DURATION_MS;
  const payload = String(expires);
  const sig = await hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

/** Verifies a session token's signature and expiry. */
export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = await hmacHex(payload, secret);
  if (!timingSafeEqual(expected, sig)) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return true;
}

/** Constant-time check of the submitted password against ADMIN_PASSWORD. */
export function isCorrectAdminPassword(candidate: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || typeof candidate !== "string") return false;
  return timingSafeEqual(candidate, adminPassword);
}
