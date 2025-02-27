import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AdminLogin = {
  admin_id: string;
  fullname: string;
  access_token: string;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 * 6,
  },
  pages: {
    signIn: "/dashboard/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        access_key: { label: "access_key" },
        admin_id: { label: "admin_id" },
        password: { label: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response: SuccessResponse<AdminLogin> = await fetcher({
            endpoint: "/auth/login",
            method: "POST",
            data: credentials,
          });

          return response.data;
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.admin_id = user.admin_id;
        token.access_token = user.access_token;
        token.fullname = user.fullname;
      }
      return token;
    },

    session({ session, token }) {
      session.user.admin_id = token.admin_id;
      session.user.fullname = token.fullname;
      session.user.access_token = token.access_token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
