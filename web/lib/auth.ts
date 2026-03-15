import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

export const isOAuthConfigured = !!(githubId && githubSecret);

export const authOptions: NextAuthOptions = {
  providers: [
    ...(isOAuthConfigured
      ? [GithubProvider({ clientId: githubId!, clientSecret: githubSecret! })]
      : []),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id?: string; sub?: string };
        token.id = u?.id || u?.sub || "";
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
