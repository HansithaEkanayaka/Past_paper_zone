import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Supabase client for use inside Route Handlers (app/api/**/route.ts) and
// Server Components. It reads the session from the request's cookies and
// writes any refreshed session back to the response's cookies, so the user
// stays logged in across requests.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll was called from a place that can't set cookies
            // (e.g. a Server Component render). Safe to ignore here -
            // the middleware below is responsible for refreshing sessions.
          }
        },
      },
    }
  );
}
