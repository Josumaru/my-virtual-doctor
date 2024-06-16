import NextAuth, { AuthError, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { saltAndHashPassword } from "@/utils/password";
import { getUserFromDb } from "@/utils/getUserFromDb";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "@/lib/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  // Set specify the custom route
  pages: {
    signIn: "/signin"
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "string",
          placeholder: "virdo@virdo.org",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      
      authorize: async (credentials) => {
        let user = null;
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          user = await getUserFromDb(email, password);

          // logic to salt and hash password
          const pwHash = await saltAndHashPassword(password);

          // logic to verify if user exists
          console.log(`user === ${user}`);

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            // throw new Error("User not found.")
            user = await prisma.user.create({
              data: {
                email: email,
                name: email,
                password: pwHash,
                role: "patient",
              },
            });
            return user;
          }
          // return user object with the their profile data
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw new AuthError("error");
        }
        console.log(`user\n${user?.email}`);

        return user;
      },
    }),
    Google,
    Github,
  ],
  // callbacks: {
  //   async jwt({ user, token }) {
  //     console.log(`token\n\n${user.email}\n\n`);
      
  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: any) {
  //     session.user = token.user;
  //     return session;
  //   },
  // },
});
