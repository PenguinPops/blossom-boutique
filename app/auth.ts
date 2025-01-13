import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { getUser } from "app/db";
import { authConfig } from "app/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // In NextAuth's authorize function:
      async authorize({ email, password }: any) {
        let user = await getUser(email);  // Fetch user from DB
        if (!user) return null;

        let passwordsMatch = await compare(password, user.password!);
        if (passwordsMatch) {
          // Ensure the username exists
          const name = user.name || "Default Username"; // Default fallback if name is missing
          const id = user.id.toString() || "0"; // Default fallback if id is missing
          return {
            ...user,
            id,
            name,  // Pass username to the session here
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Ensure that `username` is available in the session
      if (user?.name && session.user) {
        session.user.name = user.name;
      }
      return session;
    },
  },
});
