import { IBookQueryOperations } from './book/book.query.operations.interface';
import { IUserQueryOperations } from './user/user.query.operations.interface';
import { IBookMutationOperations } from './book/book.mutation.operations.interface';
import { IUserMutationOperations } from './user/user.mutation.operations.interface';

export interface IOperations {
  bookQuery: IBookQueryOperations;
  userQuery: IUserQueryOperations;
  bookMutation: IBookMutationOperations;
  userMutation: IUserMutationOperations;
}