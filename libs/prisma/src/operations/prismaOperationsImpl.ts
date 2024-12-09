import { IPrismaOperations } from "../interfaces/operations.interface";
import { prismaBookQueryOperations } from "./book/bookQueryOperationsImpl";
import { prismaUserQueryOperations } from "./user/userQueryOperationsImpl";
import { prismaBookMutationOperations } from "./book/bookMutationOperationsImpl";
import { prismaUserMutationOperations } from "./user/userMutationOperationsImpl";

class PrismaOperationsImpl implements IPrismaOperations {
  bookQuery = prismaBookQueryOperations;
  userQuery = prismaUserQueryOperations;
  bookMutation = prismaBookMutationOperations;
  userMutation = prismaUserMutationOperations;
}

export const prismaOperations = new PrismaOperationsImpl();
