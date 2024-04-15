import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log(user);

        if (user.error) throw user;

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
    async jwt({ token, user }) {
      if (user) {
        token = {...token, ...user}; // Actualiza el token con la información del usuario al iniciar sesión
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirecciona errores de autenticación a la página de login

  },
});

export { handler as GET, handler as POST };
