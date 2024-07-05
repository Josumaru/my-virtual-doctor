import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const middleware = async (request: NextRequest) => {
  const session = await auth();
  const user = session?.user;

  // Regex pattern to match /home/question/*
  const regexPattern = /^\/home\/question\/.*$/;

  // Protect signin route if already signed in
  if (request.nextUrl.pathname === "/signin" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect dashboard route for non-doctors
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    user?.role !== "doctor"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect /dashboard and its variants to /dashboard/assistant/assistant
  if (
    [
      "/dashboard",
      "/dashboard/",
      "/dashboard/assistant",
      "/dashboard/assistant/",
    ].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/assistant/assistant", request.url)
    );
  }

  // Protect /home/question/* route for non-authenticated users
  if (regexPattern.test(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Protect all /dashboard routes for non-authenticated users
  if (request.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Complete User Registration: If the user is signed in but doesn't have a name, redirect to /newuser
  // if (user && user.name === "") {
  //   console.log(user.name);
    
  //   if (!request.nextUrl.pathname.startsWith("/newuser")) {
  //     console.log(request.nextUrl.pathname);
  //     return NextResponse.redirect(new URL("/newuser", request.url));
  //   }
  // }

  // if (request.nextUrl.pathname.startsWith("/newuser") && !session) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/home/question/:path*",
    "/signin",
    "/newuser",
  ],
};

export { middleware };
