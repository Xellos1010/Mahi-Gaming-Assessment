import { IPrismaBookQueryOperations } from './prismaBookQueryOperations.interface';
import { IPrismaUserQueryOperations } from './prismaUserQueryOperations.interface';
import { IPrismaBookMutationOperations } from './prismaBookMutationOperations.interface';
import { IPrismaUserMutationOperations } from './prismaUserMutationOperations.interface';

export interface IPrismaOperations {
  bookQuery: IPrismaBookQueryOperations;
  userQuery: IPrismaUserQueryOperations;
  bookMutation: IPrismaBookMutationOperations;
  userMutation: IPrismaUserMutationOperations;
}