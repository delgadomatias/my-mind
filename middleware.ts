import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_ROUTES, PRIVATE_ROUTES, SIGN_IN_ROUTE } from "./utils";
import { isAuthenticated } from "./utils/isAuthenticated";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // First, handle auth routes
  if (AUTH_ROUTES.includes(pathname)) {
    const isLogged = await isAuthenticated();
    if (!isLogged) return res;
    return NextResponse.redirect(new URL("/", req.url));
  }

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (PRIVATE_ROUTES.includes(pathname) && !session) {
    return NextResponse.redirect(new URL(SIGN_IN_ROUTE, req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/notes/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
