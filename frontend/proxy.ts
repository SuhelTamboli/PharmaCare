import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // Define paths that authenticated users should NOT see
  const authRoutes = ["/", "/sign-in", "/register"];

  // Define protected paths that require a login
  const protectedRoutes = [
    "/dashboard",
    "/inventory",
    "/prescription",
    "/analytics",
    "/orders",
  ];

  // 1. Redirect logged-in users away from Public/Auth pages
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Redirect logged-out users away from Protected pages
  // We use .some and startsWith to catch sub-routes (e.g., /dashboard/settings)
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Ensure the matcher includes all relevant paths
export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/register",
    "/dashboard/:path*",
    "/inventory/:path*",
    "/prescription/:path*",
    "/analytics/:path*",
    "/orders/:path*",
  ],
};
