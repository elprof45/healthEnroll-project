import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, getUserById } from "./actions/actions";
import { authConfig } from "./auth.config";
import { verifyPassword } from "./lib/hash";
import { User } from "./lib/types";
import { signInSchema } from "./lib/zod";

declare module "next-auth" {
  interface Session {
    user: {
      role?: boolean | null;
      specialty?: string | null;
      id?: string | null;
      about?: string | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const existing_user = await getUserByEmail(email);

        if (!existing_user) return null;

        const passwordsMatch = await verifyPassword(
          password,
          existing_user.password
        );

        if (!passwordsMatch) return null;

        return existing_user as User;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.role = token.role as boolean;
        session.user.specialty = token.specialty as string;
        session.user.about = token.about as string
      }
      return session;
    },
    async jwt({ token, trigger, session, user, account }) {
      try {
        if (!token.sub) return token;
        let existingUser = null;
        if (trigger === "signIn") {
          // console.table({ trigger, session, user, account });
          existingUser = await getUserById(token.sub);
        } else {
          existingUser = await getUserById(token.sub);
        }
        if (!existingUser) return token;
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        token.specialty = existingUser.specialty;
        token.about = existingUser.about;
      } catch (error) {
        console.log('Error ');
      }
      return token;
    },
  },
});
