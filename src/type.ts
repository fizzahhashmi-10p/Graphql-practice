export type Author = {
  id: string;
  name: string;
  book_ids: string[];  // List of book IDs
  username: string;
  password: string;
};

export type Book = {
  id: string;
  title: string;
  author_id: string;  // Reference to Author
};

export type Token = {
    jwt: string;
}