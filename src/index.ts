import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import { authors, books } from './data.js'
import { Author, Book } from './type.js';

const resolvers = {
  Query: {
    authors: (): Author[] => authors,
    books: (): Book[] => books,
    author: (_ ,args): Author => authors.find(author => author.id === args.id),
    book: (_ ,args): Book => books.find(book => book.id === args.id)
  },
  Book: {
      // variable book is actually parent object
      author: (book: Book): Author => authors.find(author => author.id === book.author_id)
  },
  Author: {
      books: (author: Author): Book[] => books.filter(book => author.book_ids.includes(book.id))
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);