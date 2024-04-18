import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      id: string;
      roles: string[]
      token: string;
    };
  }
}
