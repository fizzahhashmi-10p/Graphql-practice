import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import { resolvers } from './resolver.js'
import { authenticationService } from './service/authenticationService.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server,
    {
      context: async ({ req, res }) => {
            const token = req.headers.authorization || '';
            const authorId = await authenticationService.verifyToken(token).id;
            return { authorId };
          }
    }
);

console.log(`🚀  Server ready at: ${url}`);