import type { NextAuthOptions } from "next-auth"
import OIDCProvider from "next-auth/providers/openid-connect"

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    OIDCProvider({
      id: "descope",
      name: "Descope",
      clientId: process.env.DESCOPE_CLIENT_ID!,
      clientSecret: process.env.DESCOPE_CLIENT_SECRET!,
      issuer: process.env.DESCOPE_AUTH_URL!.split("/authorize")[0],
      authorization: { url: process.env.DESCOPE_AUTH_URL!, params: { scope: "openid email profile" } },
      token: process.env.DESCOPE_TOKEN_URL!,
      userinfo: {
        url: `${process.env.DESCOPE_AUTH_URL!.split("/authorize")[0]}/userinfo`,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        }
      },
      checks: ["pkce", "state"],
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add user info from the profile to the token
      if (account && profile) {
        token.id = profile.sub
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Add user info from the token to the session
      if (token && session.user) {
        session.user.id = token.id as string
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

// Extend the Session type to include our custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
  }
}

// Extend the JWT type to include our custom fields
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    accessToken?: string
  }
}

