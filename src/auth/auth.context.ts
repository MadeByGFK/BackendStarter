import type { Request } from "express";
import { prisma } from "../prisma/prisma.client";
import { verifyToken } from "./auth.service";
import type { AuthUser } from "./auth.types";

export type GraphQLContext = {
  user: AuthUser | null;
};

export async function createGraphQLContext({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { user: null };
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.isActive) {
      return { user: null };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch {
    return { user: null };
  }
}