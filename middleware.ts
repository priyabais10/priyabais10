import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ✅ If visiting the login page while already logged in, redirect to dashboard
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // ✅ Protect admin pages (requires valid token)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// ✅ Apply middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
