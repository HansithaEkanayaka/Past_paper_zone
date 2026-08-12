import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "./lib/adminAuth";

const intlMiddleware = createMiddleware(routing);

// Matches "/admin/dashboard" whether or not a locale prefix is present
// (e.g. "/admin/dashboard", "/en/admin/dashboard", "/si/admin/dashboard/...").
const ADMIN_DASHBOARD_PATTERN = /^\/(?:(?:en|si|ta)\/)?admin\/dashboard(?:\/|$)/;

export default async function proxy(request: NextRequest) {
  // 0. Gate the admin dashboard before anything else runs. Previously the
  // dashboard page itself had no server-side check at all - only the
  // upload/delete API calls it makes were protected - so the page (its
  // layout, buttons, etc.) rendered for literally anyone who typed in the
  // URL, admin password or not. This is the only place that stops that.
  const { pathname } = request.nextUrl;
  if (ADMIN_DASHBOARD_PATTERN.test(pathname)) {
    const isAuthed = await verifyAdminToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
    if (!isAuthed) {
      const localeMatch = pathname.match(/^\/(en|si|ta)(?=\/|$)/);
      const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";
      const loginUrl = new URL(`${localePrefix}/admin/login`, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 1. Run the existing language-routing middleware first, as before.
  const response = intlMiddleware(request);

  // 2. Refresh the user's Supabase login session on every request. Without
  // this, a logged-in user's session can silently expire while browsing.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // api, _next, static files, sitemap.xml සහ robots.txt middleware එකෙන් bypass කිරීම
    '/((?!api|_next|_vercel|.*\\..*|sitemap\\.xml|robots\\.txt).*)',
  ],
};