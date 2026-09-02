import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Block any attempt to access auth or internal portal routes on the public website
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/finance") ||
    pathname.startsWith("/director") ||
    pathname.startsWith("/operations") ||
    pathname.startsWith("/employee") ||
    pathname.startsWith("/portal")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/finance/:path*",
    "/director/:path*",
    "/operations/:path*",
    "/employee/:path*",
    "/portal/:path*",
  ],
};