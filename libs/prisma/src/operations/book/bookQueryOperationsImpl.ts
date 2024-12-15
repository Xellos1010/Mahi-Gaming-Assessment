// libs/prisma/src/operations/book/bookQueryOperationsImpl.ts
import { prisma } from "../../client";
import {
  PrismaGetAllBooksResponse,
  PrismaGetBookByIdResponse,
  IBookQueryOperations
} from "../../interfaces/book/book.query.operations.interface";
import {
  PrismaGetBookByIdParams
} from "../../shared/types/book.types";
import {
  PrismaOperationError,
  logPrismaError
} from "../../errors/prisma-errors";

class PrismaBookQueryOperationsImpl implements IBookQueryOperations {
  async getAllBooks(): Promise<PrismaGetAllBooksResponse> {
    try {
      const books = await prisma.book.findMany();
      return { books };
    } catch (error) {
      const operationError = new PrismaOperationError(
        'Failed to retrieve books',
        'Get All Books',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async getBook({ id }: PrismaGetBookByIdParams): Promise<PrismaGetBookByIdResponse> {
    try {
      const book = await prisma.book.findUnique({ where: { id } });
      if (!book) {
        const operationError = new PrismaOperationError(
          `Book not found with ID: ${id}`,
          'Get Book By ID',
          new Error('Book not found')
        );
        logPrismaError(operationError);
        throw operationError;
      }
      return { book };
    } catch (error) {
      // If it's already a PrismaOperationError, rethrow
      if (error instanceof PrismaOperationError) {
        throw error;
      }
      const operationError = new PrismaOperationError(
        'Failed to retrieve book by ID',
        'Get Book By ID',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }
}

export const prismaBookQueryOperations = new PrismaBookQueryOperationsImpl();