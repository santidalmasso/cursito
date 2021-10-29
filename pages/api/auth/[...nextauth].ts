import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  debug: process.env.NODE_ENV === "development",
  session: {
    jwt: true,
    maxAge: 60 * 15, // 15 min
  },
  jwt: {
    encryption: true,
    encryptionKey: process.env.AUTH_JWT_ENCRYPTION_KEY,
    secret: process.env.AUTH_JWT_SECRET,
    signingKey: process.env.AUTH_JWT_SIGNING_KEY,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "basic",
      credentials: {
        email: { label: "Email...", type: "email" },
        password: { label: "Password...", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
});