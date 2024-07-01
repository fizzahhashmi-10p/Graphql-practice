import data  from '../data.js';
import { Author, Book } from '../type.js';
import { v4 as uuidv4 } from 'uuid';

class BookService{
    getBooks() : Book[] {
        return data.books;
    }

    getBook(id: string): Book {
        return data.books.find(book => book.id === id)
    }

    findBooksByAuthor(author: Author): Book[] {
        return data.books.filter(book => author.book_ids.includes(book.id))
    }

    deleteBook(id: string): Book[] {
        data.books = data.books.filter(book => book.id !== id)
        return data.books
    }

    addBook(bookDetails): Book{
        let newGame = {...bookDetails, id: uuidv4()}
        data.books.push(newGame)
        return newGame
    }
}

export const bookService = new BookService();