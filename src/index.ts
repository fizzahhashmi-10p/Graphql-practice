import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';

import { typeDefs } from './schema.js';
import { resolvers } from './resolver.js'
import { authenticationService } from './service/authenticationService.js'
import permissions from './permissions.js'

const app = express();


const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(executableSchema, permissions);

app.use('/graphql', express.json(),

graphqlHTTP((req) => ({
  schema: schemaWithMiddleware,
  graphiql: true,
  context: { role: authenticationService.verifyToken(req.headers.authorization || '')},
})));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
