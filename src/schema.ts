export const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    authors: [Author!]!
    books: [Book!]!
    author(id: ID!): Author
    book(id: ID!): Book
  }

  type Mutation {
      addBook(book: AddBookInput!): Book
      deleteBook(id: ID!): [Book]
  }

  input AddBookInput {
      title: String!
      author_id: ID!
  }
`;