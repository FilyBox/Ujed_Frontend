import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { ac, roles } from "./permissions";

/**
 * Better Auth client. The auth server lives on the NestJS backend, so requests
 * are cross-origin and must send the session cookie (`credentials: "include"`).
 *
 * `NEXT_PUBLIC_BACKEND_URL` is `http://host/api`. The Better Auth client infers
 * its base path from the path in `baseURL`, so we point it straight at the auth
 * mount (`http://host/api/auth`); endpoints like `/sign-in/email` append to it.
 */
export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    adminClient({ ac, roles }),
    inferAdditionalFields({
      user: {
        roles: {
          type: "string[]", //
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

/** Better Auth's admin plugin stores roles on `user.role` as a string
 *  (comma-separated for multiple) or array. Normalize to a string[]. */
export function rolesOf(role: string | string[] | null | undefined): string[] {
  if (!role) return [];
  if (Array.isArray(role)) return role.filter(Boolean);
  return role
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
}
