import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { publicAuthRoutes } from "./lib/constants";

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const pathname = request.nextUrl.pathname;

  const userRoles = Array.isArray(token?.user?.roles) ? token.user.roles : [];
  const isCustomer = userRoles[0] === "customer";

  // Redirect unauthenticated or non-customers trying to access protected route
  if (pathname.startsWith("/my-account") && (!token || !isCustomer)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged-in customers away from public auth pages
  if (token && isCustomer && publicAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/my-account/orders", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
