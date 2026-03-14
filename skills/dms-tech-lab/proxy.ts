import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { checkRateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export default withAuth(
  async function proxy(req) {
    const { pathname } = req.nextUrl;

    // Login page - skip rate limiting and other checks
    if (pathname === "/auth/signin") {
      return NextResponse.next();
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
    const ip = firstForwardedIp || req.headers.get("x-real-ip") || "unknown";

    // Robust cookie detection
    const secureCookie = req.cookies.get('__Secure-next-auth.session-token');
    const cookieName = secureCookie ? '__Secure-next-auth.session-token' : 'next-auth.session-token';

    // Get token directly from JWT
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: cookieName
    });

    const isAdmin = token?.role === "admin" || token?.email === process.env.ADMIN_EMAIL;

    // Rate limiting for admin routes - Use 'api' type for admin pages for more generous limits
    if (pathname.startsWith("/admin")) {
      const result = await checkRateLimit(ip, "api");
      if (!result.success) {
        return NextResponse.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }

      // Check if user is admin
      if (token) {
        if (!isAdmin) {
          return NextResponse.redirect(
            new URL("/unauthorized", req.url)
          );
        }
      }
    }

    // API routes - require rate limiting
    if (pathname.startsWith("/api")) {
      const result = await checkRateLimit(ip, "api");
      if (!result.success) {
        return NextResponse.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }
    }

    // Enforce admin authorization for all admin APIs
    if (pathname.startsWith("/api/admin") && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only check if token exists - admin check is done in middleware function above
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/upload/:path*",
  ],
};
