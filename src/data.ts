import { Role, Author, Book } from './type.js';

const authors: Author[] = [
  { id: '1', name: 'J.K. Rowling', book_ids: ['1'], username: 'jk', password: 'password', role: Role.ADMIN},
  { id: '2', name: 'J.R.R. Tolkien', book_ids: ['2','3'], username: 'jrr', password: 'pass', role: Role.WRITER},
];

const books: Book[] = [
  { id: '1', title: 'Harry Potter and the Philosopher\'s Stone', author_id: '1' },
  { id: '2', title: 'Harry Potter and the Chamber of Secrets', author_id: '2' },
  { id: '3', title: 'The Hobbit', author_id: '2' },
];

export default { authors, books }