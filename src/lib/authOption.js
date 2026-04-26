import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect, collections } from "@/lib/dbConnect";
import bcrypt from 'bcryptjs';

async function ensureGoogleUser(user, account) {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const existingUser = await usersCollection.findOne({ email: user.email });

    const payload = {
      name: user.name,
      email: user.email,
      image: user.image || null,
      provider: account.provider,
      emailVerified: user.emailVerified ?? null,
      updatedAt: new Date(),
    };

    if (!existingUser) {
      await usersCollection.insertOne({
        ...payload,
        createdAt: new Date(),
      });
    } else {
      await usersCollection.updateOne(
        { email: user.email },
        { $set: payload }
      );
    }
  } catch (error) {
    console.error("Error saving Google user:", error);
  }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            const email = (credentials?.email || credentials?.username)?.toLowerCase();
            const password = credentials?.password;

            console.debug("Credentials authorize received:", { email, hasPassword: Boolean(password), keys: Object.keys(credentials || {}) });

            if (!email || !password) {
              throw new Error("Email and password are required.");
            }

            const usersCollection = await dbConnect(collections.USERS);
            const user = await usersCollection.findOne({ email });

            if (!user || !user.password) {
              throw new Error("No user found with this email.");
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
              throw new Error("Invalid password.");
            }

            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              image: user.image || null,
            };
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== 'production',
    callbacks: {
      async session({ session, token }) {
        if (session?.user) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
    events: {
      async signIn({ user, account }) {
        if (account.provider === "google") {
          await ensureGoogleUser(user, account);
        }
      },
    },
};