import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";


async function refreshAccessToken(token: any) {
  const data = {
   refresh_token: token.refresh_token,
  }
  const resp = await fetch(`http://localhost:8083/auth/refresh`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    method: "POST",
  });
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;
  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8083/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      if (user) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        token.decoded = jwtDecode(user.access_token);
        token.access_token = user.access_token;
        token.id_token = token.decoded.jti;
        token.expires_in = Math.floor(Date.now() / 1000) + user.expires_in;
        token.refresh_token = user.refresh_token;
        token.name = token.decoded.given_name
        token.picture = ""
        token.email = "Campinas.ets@bosch.com"
        token.sub = token.decoded.sub
        token.group_id = token.decoded.group_id;
        return token;
      } else if (nowTimeStamp < (token.expires_in)) {
        // token has not expired yet, return it
        return token;

      } else {
        // token is expired, try to refresh it
        console.log("Token has expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          cookies().set({
            name: 'access_token',
            value: refreshedToken,
            httpOnly: true,
            path: '/',
          })
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token; // see utils/sessionTokenAccessor.js
      session.id_token =token.id_token; // see utils/sessionTokenAccessor.js
      session.roles = token.decoded.realm_access.roles;
      session.group_id = token.decoded.group_id;
      session.error = token.error;
      return session;
    },

  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
