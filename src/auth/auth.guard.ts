import type { GraphQLContext } from "./auth.context";
import type { Role } from "./auth.types";

export function requireAuth(context: GraphQLContext) {
  if (!context.user) {
    throw new Error("You must be logged in.");
  }

  return context.user;
}

export function requireRole(context: GraphQLContext, allowedRoles: Role[]) {
  const user = requireAuth(context);

  if (!allowedRoles.includes(user.role)) {
    throw new Error("You do not have permission to perform this action.");
  }

  return user;
}