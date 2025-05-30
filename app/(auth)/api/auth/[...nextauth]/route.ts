import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🔧 Step one: Replace this with your real login logic
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password123"
        ) {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com",
          };
        }

        return null; // ❌ This will cause CredentialsSignin error if no match
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});