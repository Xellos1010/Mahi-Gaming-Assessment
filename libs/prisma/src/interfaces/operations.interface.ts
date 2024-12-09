import { IPrismaBookQueryOperations } from './book/book.query.operations.interface';
import { IPrismaUserQueryOperations } from './user/user.query.operations.interface';
import { IBookMutationOperations } from './book/book.mutation.operations.interface';
import { IPrismaUserMutationOperations } from './user/user.mutation.operations.interface';

export interface IPrismaOperations {
  bookQuery: IPrismaBookQueryOperations;
  userQuery: IPrismaUserQueryOperations;
  bookMutation: IBookMutationOperations;
  userMutation: IPrismaUserMutationOperations;
}