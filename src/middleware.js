import { NextResponse } from "next/server";

export function middleware(request) {
  const protectedPaths = ["/user-crm"];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const token = request.cookies.get("token")?.value;
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user-crm/:path*", "/user-crm"],
};
