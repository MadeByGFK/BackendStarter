import { registerUser, loginUser } from "../../auth/auth.service";
import { requireAuth, requireRole } from "../../auth/auth.guard";
import { prisma } from "../../prisma/prisma.client";
import type { GraphQLContext } from "../../auth/auth.context";

export const userTypeDefs = `#graphql
  enum Role {
    USER
    ADMIN
    MANAGER
    MEMBER
  }

  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;

export const userResolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      const authUser = requireAuth(context);

      return prisma.user.findUnique({
        where: { id: authUser.id },
      });
    },

    users: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      requireRole(context, ["ADMIN"]);

      return prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    register: async (
      _parent: unknown,
      args: { input: { email: string; password: string; name?: string } }
    ) => {
      return registerUser(args.input);
    },

    login: async (
      _parent: unknown,
      args: { input: { email: string; password: string } }
    ) => {
      return loginUser(args.input);
    },
  },
};