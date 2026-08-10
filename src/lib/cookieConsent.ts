// Shared storage for cookie-consent preferences, used by both CookieBanner
// (the first-visit popup) and CookiePreferencesModal (the "Cookie Settings"
// link in the footer, so a visitor can change their mind later - this is
// the piece that was missing before: the footer link existed but pointed
// nowhere).

export interface CookiePreferences {
  necessary: true; // always on, cannot be disabled
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "pz_cookie_consent";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export function savePreferences(prefs: CookiePreferences): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  // Lets other mounted components (e.g. the banner and the footer modal on
  // the same page) pick up the change without a full reload.
  window.dispatchEvent(new Event("pz-cookie-consent-updated"));
}

export const acceptAllPreferences = (): CookiePreferences => ({
  necessary: true,
  analytics: true,
  marketing: true,
});

export const rejectAllPreferences = (): CookiePreferences => ({
  necessary: true,
  analytics: false,
  marketing: false,
});
