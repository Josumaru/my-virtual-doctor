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
  if (request.nextUrl.pathname.startsWith("/dashboard") && user?.role !== "doctor") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect /dashboard and its variants to /dashboard/assistant/assistant
  if ([
    "/dashboard",
    "/dashboard/",
    "/dashboard/assistant",
    "/dashboard/assistant/"
  ].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard/assistant/assistant", request.url));
  }

  // Protect /home/question/* route for non-authenticated users
  if (regexPattern.test(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Protect all /dashboard routes for non-authenticated users
  if (request.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
};

export { middleware };
