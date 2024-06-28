const authors = [
  { id: '1', name: 'J.K. Rowling', books: null },
  { id: '2', name: 'J.R.R. Tolkien', books: null },
];

const books = [
  { id: '1', title: 'Harry Potter and the Philosopher\'s Stone', author: authors[0] },
  { id: '2', title: 'Harry Potter and the Chamber of Secrets', author: authors[0] },
  { id: '3', title: 'The Hobbit', author: authors[1] },
];

authors[0].books = [books[0], books[1]];
authors[1].books = [books[2]];

export { authors, books }