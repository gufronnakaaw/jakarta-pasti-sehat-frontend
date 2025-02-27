import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET_KEY,
  });

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard/login")) {
    if (!token) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  const response = NextResponse.next();

  response.headers.set("access_token", token.access_token);
  response.headers.set("fullname", token.fullname);

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
