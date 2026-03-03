import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const role = request.cookies.get("userRole")?.value; // Get the role cookie

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
    "/products",
  ];

  // 1. Redirect logged-in users away from Auth pages (Sign-in/Register)
  if (token && authRoutes.includes(pathname)) {
    const target = role === "Pharmacist" ? "/dashboard" : "/products";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // Security Check: Is the user trying to access a protected route?
  // Redirect logged-out users away from Protected pages
  // We use .some and startsWith to catch sub-routes (e.g., /dashboard/settings)
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Role-Based Access Control (RBAC)
  if (token && isProtectedRoute) {
    // Customer Restrictions: Can ONLY access /products and /orders
    const isCustomerAllowed =
      pathname.startsWith("/products") || pathname.startsWith("/orders");

    if (role === "Customer" && !isCustomerAllowed) {
      return NextResponse.redirect(new URL("/products", request.url));
    }

    // Pharmacist has access to everything in protectedRoutes, so no extra check needed.
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
    "/products/:path*",
  ],
};
