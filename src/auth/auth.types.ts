export type Role = "USER" | "ADMIN" | "MANAGER" | "MEMBER";

export type JwtPayload = {
  userId: string;
  email: string;
  role: Role;
};

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};