import { rule, shield, allow, and, or, not } from 'graphql-shield';
import { Role } from './type.js'
import { authenticationService } from './service/authenticationService.js'


// Rule to check if a JWT token is provided and valid
const isAuthenticated = rule()(async (parent, args, context, info) => {
  const authHeader = context.headers.authorization;
  const introspectionQuery = info.operation.operation === 'query' &&
                             info.fieldName === '__schema';

  if (!authHeader && !introspectionQuery) {
    return new Error('jwt must be provided');
  }

  if (introspectionQuery) {
    return true;
  }


  try {
    context.role = authenticationService.verifyToken(authHeader).role;
    return true;
  } catch (err) {
    return new Error('Invalid token');
  }
});

const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx): Promise<boolean> => {
  return ctx.role === Role.ADMIN;
});

const isWriter = rule({ cache: 'contextual' })(async  (_, __, ctx): Promise<boolean> => {
  return ctx.role === Role.WRITER;
});

const isReviewer = rule({ cache: 'contextual' })(async  (_, __, ctx): Promise<boolean> => {
  return ctx.role === Role.REVIEWER;
});

// Define permissions
const permissions = shield({
  Query: {
    books: and(isAuthenticated, or(or(isWriter, isReviewer), isAdmin)),
    book: and(isAuthenticated, or(or(isWriter, isReviewer), isAdmin)),
    author: and(isAuthenticated, or(isWriter, isAdmin)),
    authors: and(isAuthenticated, isAdmin),
    },
  Mutation: {
    deleteBook: and(isAuthenticated, isWriter),
    addBook: and(isAuthenticated, or(isWriter, isAdmin)),
  }
});

export default permissions;