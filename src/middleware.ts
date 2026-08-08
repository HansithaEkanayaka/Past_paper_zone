import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
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