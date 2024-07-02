import { ApolloError } from 'apollo-server';

export class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

export class ValidationError extends ApolloError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }
}
