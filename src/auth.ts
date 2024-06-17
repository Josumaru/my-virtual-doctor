import { PrismaAdapter } from "@auth/prisma-adapter";
import { signInSchema } from "./lib/zod";
import { fetchUser } from "@/utils/fetchUser";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import NextAuth from "next-auth";
import prisma from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  // Set specify the custom route
  pages: {
    signIn: "/signin",
    newUser: "/",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        let user = null;
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          user = await fetchUser(email, password);

          // return user object with the their profile data
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }

        return user;
      },
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
});
