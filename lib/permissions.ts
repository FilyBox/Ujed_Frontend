import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

/**
 * Mirror of the backend `src/auth/permissions.ts`. The access-control
 * statements and role definitions must match the server so the admin client
 * can reason about roles/permissions consistently.
 */
const statement = {
  ...defaultStatements,
  report: ["create", "read", "update", "delete", "updateStatus", "updateDepartment"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  report: ["create", "read", "update", "delete"],
});

export const obras = ac.newRole({
  report: ["create", "read", "update", "delete"],
});

export const mantenimiento = ac.newRole({
  report: ["create", "read", "update", "delete"],
});

export const admin = ac.newRole({
  report: ["create", "read", "update", "delete", "updateStatus", "updateDepartment"],
  ...adminAc.statements,
});

export const superUser = ac.newRole({
  report: ["create", "read", "update", "delete", "updateStatus", "updateDepartment"],
  ...adminAc.statements,
});

export const roles = {
  admin,
  "super-user": superUser,
  obras,
  mantenimiento,
  user,
};
