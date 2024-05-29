import { NextResponse } from "next/server";
import { verifyToken } from "./lib/VerifyToken";

export async function middleware(request) {
  const token = request.cookies.get("adventure_hub_jwt")?.value || "";

  const path = request.nextUrl.pathname;
  const isOnPublicPath = path === "/" || path === "/closetours";
  const isOnAdminPath = path.startsWith("/admin");

  const isOnAuthPath = path === "/auth/signin" || path === "/auth/signup";

  const adminToursPathRegex = /^\/admin\/tours\/.*$/;
  const isGuideHidden = adminToursPathRegex.test(path);

  const isOnAuthenticatedPath =
    path.startsWith("/tour") ||
    path.startsWith("/user/profile") ||
    path.startsWith("/user/tours") ||
    path.startsWith("/checkout");

  if (isOnPublicPath) {
    return NextResponse.next(); // Allow access to public paths
  }

  if (!token) {
    // If no token is found and the user is trying to access a restricted path, redirect to login
    if (isOnAuthenticatedPath || isOnAdminPath) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  if (token && isOnAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { isValid, userInfo } = await verifyToken();

  if (!isValid) {
    // If the token is invalid, redirect to login
    if (isOnAuthenticatedPath || isOnAdminPath) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  if (isValid) {
    if (userInfo?.role === "user" && isOnAdminPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isValid) {
    if (
      (userInfo?.role !== "admin" && path === "/admin/dashboard/newUser") ||
      path === "/admin/users"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (isValid) {
    if (userInfo?.role === "guide" && path === "/admin/dashboard/newTour") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (isValid) {
    if (userInfo?.role === "guide" && isGuideHidden) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (path === "/dashboard") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/checkout/:path*",
    "/tour/:path*",
    "/user/:path*",
  ],
};
