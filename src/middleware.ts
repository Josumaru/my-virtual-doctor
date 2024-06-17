import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const session = await auth();
  const user = session?.user;
  if (request.nextUrl.pathname === "/signin" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname === "/dashboard" &&
    user?.role !== "doctor"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
};

export { middleware };
