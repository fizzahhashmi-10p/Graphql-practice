import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';

import { typeDefs } from './schema.js';
import data  from './data.js';
import { Author, Book } from './type.js';
import { bookService } from './service/bookService.js';
import { authorService } from './service/authorService.js';

const resolvers = {
  Query: {
    authors: (): Author[] => authorService.getAuthors(),
    books: () => bookService.getBooks(),
    author: (_ ,args): Author => authorService.getAuthor(args.id),
    book: (_ ,args): Book => bookService.getBook(args.id)
  },
  Book: {
      // variable book is actually parent object
      author: (book: Book): Author => authorService.findAuthorByBook(book)
  },
  Author: {
      books: (author: Author): Book[] => bookService.findBooksByAuthor(author)
  },
  Mutation: {
      deleteBook: (_, args): Book[] => {
            return bookService.deleteBook(args.id)
      },
      addBook: (_, args): Book => {
            if(authorService.isValidAuthor(args.book.author_id){
                return bookService.addBook(args.book)
            }
            return null
      }
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