import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getNoteById } from "./actions/notes.action";
import { getUser } from "./utils/getUser";

const AUTH_ROUTES = ["/auth/signup", "/auth/signin"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  if (AUTH_ROUTES.includes(pathname)) {
    const user = await getUser();
    if (user) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }

  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (pathname.startsWith("/notes/")) {
    const noteId: string = pathname.split("/")[2];

    if (!noteId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const note = await getNoteById(noteId);

    if (!note) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
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