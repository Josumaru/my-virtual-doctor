import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const session = await auth()
  if (request.nextUrl.pathname === "/signin" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
};

export { middleware };
