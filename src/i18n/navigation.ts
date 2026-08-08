import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware drop-in replacements for next/link's Link and
// next/navigation's useRouter/usePathname/redirect.
//
// routing.ts doesn't set `localePrefix`, so next-intl defaults to "always"
// (every URL is prefixed, e.g. /en, /si, /ta).
//
// Any link built with plain next/link's `Link` (or a manual `router.push`)
// using an un-prefixed path like "/" or "/subject/xyz" is missing that
// prefix. The middleware then has to redirect it to the default locale,
// which drops the user's chosen language AND forces a full page reload
// instead of a soft client-side navigation.
//
// Importing Link/useRouter/usePathname from here instead of "next/link" /
// "next/navigation" fixes that at the source: every href is automatically
// prefixed with whatever locale is currently active.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
