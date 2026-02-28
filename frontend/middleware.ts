import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the session cookie your backend provides
  const token = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // 1. If logged in and trying to access landing/login, go to dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. If NOT logged in and trying to access dashboard, go to home
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Config limits the middleware to specific paths for better performance
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
