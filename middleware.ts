import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function Middleware(request: NextRequest) {
//   const token = request.cookies.get("tpkem")?.value;
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
  const role = "admin";
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    pathname.startsWith("/my-account") &&
    ["admin", "superadmin"].includes(role)
  ) {
    return NextResponse.redirect(new URL("/admin/orders", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*"],
};
