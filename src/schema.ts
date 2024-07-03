export const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
    username: String!
    password: String!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Token{
    jwt: String!
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
      login(login: LoginInput): Token
  }

  input AddBookInput {
      title: String
      author_id: ID
  }

  input LoginInput{
      username: String
      password: String
  }
`;