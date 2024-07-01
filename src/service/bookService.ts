import data  from '../data.js';
import { Author, Book } from '../type.js';


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

    addBook(bookDetails): Book[]{
        let newGame = {...bookDetails, id: uuidv4()}
        return data.books.push(newGame)

    }
}

export const bookService = new BookService();