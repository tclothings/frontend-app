import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { publicAuthRoutes } from "./lib/constants";

// Make sure this matches what the backend uses
export default async function Middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("user")?.value;

  let parsedUser: any = null;
  let access_token: string | null = null;

  try {
    if (userCookie) {
      parsedUser = JSON.parse(userCookie);
      access_token = parsedUser?.access_token ?? null;
    }
  } catch (err) {
    console.error("Invalid user cookie:", err);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("user");
    return response;
  }

  // const role = "admin";
  const pathname = request.nextUrl.pathname;
  // Block unauthenticated users from protected routes
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) &&
    !access_token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Role-based route access
  if (access_token) {
    // try {
      const roles = parsedUser?.user?.roles || [];
      if (publicAuthRoutes.includes(pathname)) {
        const redirectPath =
          roles[0] === "admin" ? "/admin/orders" : "/my-account/orders";
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
      if (pathname.startsWith("/admin") && roles[0] !== "admin") {
        return NextResponse.redirect(
          new URL("/my-account/orders", request.url)
        );
      }

      if (pathname.startsWith("/my-account") && roles[0] === "admin") {
        return NextResponse.redirect(new URL("/admin/orders", request.url));
      }
    // } catch (err) {
    //   console.error("Invalid user cookie:", err);
    //   const response = NextResponse.redirect(new URL("/login", request.url));
    //   response.cookies.delete("user");
    //   return response;
    // }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
  // matcher: ["/admin/:path*", "/my-account/:path*"],
};
