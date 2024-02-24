import { NextResponse } from "next/server";

export function middleware(request: any) {
  const Path = request.nextUrl.pathname;
  const PublicPath = Path === "/auth/login" || Path === "/auth/register";

  const token = request.cookies.get("AUTH_TOKEN");

  if (PublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // if(!PublicPath && !token){
  //   return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  // }
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register"],
};
