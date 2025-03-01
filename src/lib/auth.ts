import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  //ts-ignore @next-auth/prisma-adapter
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    
  },
  cookies: {
  sessionToken: {
    name: process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    },
  },
},

  secret: process.env["AUTH_SECRET"],
  ...authConfig,
});
