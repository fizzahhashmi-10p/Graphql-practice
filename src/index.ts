import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';

import { typeDefs } from './schema.js';
import data  from './data.js'
import { Author, Book } from './type.js';

const resolvers = {
  Query: {
    authors: (): Author[] => data.authors,
    books: (): Book[] => data.books,
    author: (_ ,args): Author => data.authors.find(author => author.id === args.id),
    book: (_ ,args): Book => data.books.find(book => book.id === args.id)
  },
  Book: {
      // variable book is actually parent object
      author: (book: Book): Author => data.authors.find(author => author.id === book.author_id)
  },
  Author: {
      books: (author: Author): Book[] => data.books.filter(book => author.book_ids.includes(book.id))
  },
  Mutation: {
      deleteBook: (_, args): Book[] => {
          data.books = data.books.filter(book => book.id !== args.id)
          return data.books
      },
      addBook: (_, args): Book => {
            let author = data.authors.find(author => author.id === args.book.author_id)
            if(! author){
                throw new Error(`Author with id ${args.book.author_id} does not exist`)
            }
            let newGame = {...args.book, id: uuidv4()}
            data.books.push(newGame)
            return newGame
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