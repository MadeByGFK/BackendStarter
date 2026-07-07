import { userTypeDefs, userResolvers } from "../modules/user/user.graphql";

export const typeDefs = `#graphql
  ${userTypeDefs}
`;

export const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};