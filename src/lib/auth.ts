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
  secret: process.env["AUTH_SECRET"],
  ...authConfig,
});
