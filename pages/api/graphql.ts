import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import typeDefs from '../../graphql/schemas/questionsSchema';
import resolvers from '../../graphql/resolvers/questionsResolvers';


// Initialize Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({ path: process.env.NEXT_PUBLIC_GRAPHQL_API_URL })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};