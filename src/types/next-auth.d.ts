import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface Account {
    password: string | null;
  }

  interface User {
    role: string | null;
    password: string | null;
  }
}
