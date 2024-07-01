import data  from '../data.js';
import { Author, Book } from '../type.js';


class AuthorService{
    getAuthors() : Author[] {
        return data.authors;
    }

    getAuthor(id: string): Author {
        return data.authors.find(author => author.id === id)
    }

    findAuthorByBook(book: Book): Author {
        return data.authors.find(author => author.id === book.author_id)
    }

    isValidAuthor(id: string) : boolean{
        let author = data.authors.find(author => author.id === id)
        if(! author){
            throw new Error(`Author with id ${args.book.author_id} does not exist`)
            return false
        }
        return true
    }
}

export const authorService = new AuthorService();