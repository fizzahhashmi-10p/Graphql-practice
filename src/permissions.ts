import { rule, shield, allow, and, or, not } from 'graphql-shield';
import { Role } from './type.js'

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
    books: or(isWriter, isReviewer, isAdmin),
    book: or(or(isWriter, isReviewer), isAdmin),
    author: or(isWriter, isAdmin),
    authors: isAdmin,
    },
  Mutation: {
    deleteBook: isWriter,
    addBook: or(isWriter, isAdmin),
  }
});

export default permissions;