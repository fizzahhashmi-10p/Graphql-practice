import data  from './data.js';
import { Author, Book, Token } from './type.js';
import { bookService } from './service/bookService.js';
import { authorService } from './service/authorService.js';
import { authenticationService } from './service/authenticationService.js';
import { NotFoundError, ValidationError } from './errors.js';

export const resolvers = {
  Query: {
    authors: async(): Promise<Author[]> => {
        const authors = await authorService.getAuthors()
        if(!authors){
            throw new NotFoundError(`Failed to fetch Authors!`)
        }
        return authors
        },
    books: async(): Promise<Book[]> => {
       const books = await bookService.getBooks()
       if(!books){
           throw new NotFoundError(`Failed to fetch Books!`)
       }
       return books
    },
    author: async(_ ,args, context): Promise<Author> => {
       if (!context.authorId) throw new NotFoundError(`Access Denied`);
       const author = await authorService.getAuthor(args.id)
       if(!author){
           throw new NotFoundError(`Author with id: ${args.id} does not exist!`)
       }
       return author
    },
    book: async(_ ,args): Promise<Book> => {
        const book = await bookService.getBook(args.id)
        if(!book){
            throw new NotFoundError(`Book with id: ${args.id} does not exist!`)
        }
        return book
    },
  },
  Book: {
      // variable book is actually parent object
      author: async (book: Book): Promise<Author> => await authorService.findAuthorByBook(book)
  },
  Author: {
      books: async (author: Author): Promise<Book[]> => await bookService.findBooksByAuthor(author)
  },
  Mutation: {
      deleteBook: (_, args): Book[] => {
            if (!bookService.getBook(args.id)){
                throw new NotFoundError(`Book with id: ${args.id} does not exist`)
            }
            return bookService.deleteBook(args.id)
      },
      addBook: (_, args): Book => {
            if(!args.book.title || !args.book.author_id){
                throw new ValidationError(`Missing value for a required field (title, author id).`)
            }
            if(!authorService.isValidAuthor(args.book.author_id)){
                throw new ValidationError(`Invalid Author id: ${args.book.author_id} provided!`)
            }
            return bookService.addBook(args.book)
      },
      login: (_, args): Token => {
            const { username, password } = args.login;
            // Replace `verifyUser` with the actual user verification logic
            const author = authorService.findAuthorByCredentials(username, password);
            if(!author){
                throw new ValidationError(`Invalid credentials provided!`);
            }
            return { jwt: authenticationService.generateToken(author) };
      },

  }
};