// libs/prisma/src/operations/book/bookMutationOperationsImpl.ts
import { prisma } from "../../client";
import { Prisma } from "@prisma/client";
import {
  IBookMutationOperations,
  PrismaAddBookResponse,
  PrismaAddUserToFavoriteBookResponse,
  PrismaRemoveBookByIdResponse,
  PrismaRemoveBookFromFavoritesResponse,
  PrismaUpdateBookResponse
} from "../../interfaces/book/book.mutation.operations.interface";
import {
  PrismaAddBookParams,
  PrismaUpdateBookParams,
  PrismaRemoveBookByIdParams,
  PrismaAddUserToFavoriteBookParams,
  PrismaRemoveBookFromFavoritesParams
} from "../../shared/types/book.types";
import {
  PrismaOperationError,
  logPrismaError
} from "../../errors/prisma-errors";
import { convertDateTimeToDatabaseFormat } from "../../utilities/datetime";

class PrismaBookMutationOperationsImpl implements IBookMutationOperations {
  async addBook(data: PrismaAddBookParams): Promise<PrismaAddBookResponse> {
    try {
      const book = await prisma.book.create({
        data: {
          ...data,
          createdAt: convertDateTimeToDatabaseFormat(new Date()) // Ensuring the createdAt date is in correct format
        }
      });
      return { book };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation for title
        if (error.code === 'P2002') {
          const operationError = new PrismaOperationError(
            'A book with this title already exists',
            'Book Creation',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to create book',
        'Book Creation',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async updateBook({ where, data }: PrismaUpdateBookParams): Promise<PrismaUpdateBookResponse> {
    try {
      const book = await prisma.book.update({
        where,
        data: {
          ...data, updatedAt: convertDateTimeToDatabaseFormat(new Date())
        }
      });
      return { book };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found
        if (error.code === 'P2025') {
          const operationError = new PrismaOperationError(
            `Book not found with identifier: ${JSON.stringify(where)}`,
            'Book Update',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }

        // Unique constraint violation
        if (error.code === 'P2002') {
          const operationError = new PrismaOperationError(
            'A book with this title already exists',
            'Book Update',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to update book',
        'Book Update',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async removeBookById({ id }: PrismaRemoveBookByIdParams): Promise<PrismaRemoveBookByIdResponse> {
    try {
      const book = await prisma.book.delete({ where: { id } });
      return { book };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found
        if (error.code === 'P2025') {
          const operationError = new PrismaOperationError(
            `Book not found with ID: ${id}`,
            'Book Deletion',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }

        // Foreign key constraint violation (e.g., book is in user's favorites)
        if (error.code === 'P2003') {
          const operationError = new PrismaOperationError(
            `Cannot delete book. It is currently in a user's favorites.`,
            'Book Deletion',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to remove book',
        'Book Deletion',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async addUserToFavoriteBook({ userId, bookId }: PrismaAddUserToFavoriteBookParams): Promise<PrismaAddUserToFavoriteBookResponse> {
    try {
      // First, check if the book exists
      const book = await prisma.book.findUnique({ where: { id: bookId } });
      if (!book) {
        const operationError = new PrismaOperationError(
          `Book not found with ID: ${bookId}`,
          'Add to Favorites',
          new Error('Book does not exist')
        );
        logPrismaError(operationError);
        throw operationError;
      }

      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        const operationError = new PrismaOperationError(
          `User not found with ID: ${userId}`,
          'Add to Favorites',
          new Error('User does not exist')
        );
        logPrismaError(operationError);
        throw operationError;
      }

      // Try to create the favorite entry
      await prisma.userFavorites.create({ data: { userId, bookId } });

      return { book };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation (already in favorites)
        if (error.code === 'P2002') {
          const operationError = new PrismaOperationError(
            `Book is already in user's favorites`,
            'Add to Favorites',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }

        // Foreign key constraint violation
        if (error.code === 'P2003') {
          const operationError = new PrismaOperationError(
            `Invalid user or book reference`,
            'Add to Favorites',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to add book to favorites',
        'Add to Favorites',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async removeBookFromFavorites({ userId, bookId }: PrismaRemoveBookFromFavoritesParams): Promise<PrismaRemoveBookFromFavoritesResponse> {
    try {
      // First, check if the book exists
      const book = await prisma.book.findUnique({ where: { id: bookId } });
      if (!book) {
        const operationError = new PrismaOperationError(
          `Book not found with ID: ${bookId}`,
          'Remove from Favorites',
          new Error('Book does not exist')
        );
        logPrismaError(operationError);
        throw operationError;
      }

      // Try to remove the favorite entry
      await prisma.userFavorites.delete({
        where: {
          userId_bookId: { userId, bookId }
        }
      });

      return { book };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found (not in favorites)
        if (error.code === 'P2025') {
          const operationError = new PrismaOperationError(
            `Book not in user's favorites`,
            'Remove from Favorites',
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to remove book from favorites',
        'Remove from Favorites',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }
}

export const prismaBookMutationOperations = new PrismaBookMutationOperationsImpl();
