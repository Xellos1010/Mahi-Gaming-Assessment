import { IPrismaOperations } from "../interfaces/prismaOperations.interface";
import { prismaBookQueryOperations } from "./prismaBookQueryOperationsImpl";
import { prismaUserQueryOperations } from "./prismaUserQueryOperationsImpl";
import { prismaBookMutationOperations } from "./prismaBookMutationOperationsImpl";
import { prismaUserMutationOperations } from "./prismaUserMutationOperationsImpl";

class PrismaOperationsImpl implements IPrismaOperations {
  bookQuery = prismaBookQueryOperations;
  userQuery = prismaUserQueryOperations;
  bookMutation = prismaBookMutationOperations;
  userMutation = prismaUserMutationOperations;
}

export const prismaOperations = new PrismaOperationsImpl();
