import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!backendUrl) {
          throw new Error("Backend URL is not configured");
        }

        const res = await fetch(`${backendUrl}/users/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email?.trim().toLowerCase(),
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log(user);

        if (!res.ok || user.error) {
          throw new Error(user.message ?? "Credentials are not valid");
        }

        return user;
      },
    }),
  ],
  session: {
    maxAge: 7200
  },
  jwt: {
    maxAge: 7200
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = {...token, ...user}; // Actualiza el token con la información del usuario al iniciar sesión
      }
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name

      }
      return token;
    },
    async session({ session,user, token, trigger, newSession }) {
      session.user = token as any;
      if (trigger === "update" && newSession?.name) {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
        user.name = newSession.name
      }
      
      return session;

      
    },
          // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
      
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirecciona errores de autenticación a la página de login

  },
});

export { handler as GET, handler as POST };
