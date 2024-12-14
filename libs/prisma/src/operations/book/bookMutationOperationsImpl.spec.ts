// libs/prisma/src/operations/book/bookMutationOperationsImpl.spec.ts
import {
  prismaBookMutationOperations
} from './bookMutationOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock, describe, it, expect } from 'vitest';
import type { Book, User } from '@prisma/client';
import {
  PrismaOperationError
} from '../../errors/prisma-errors';
import { Prisma } from '@prisma/client';
import { PrismaAddBookParams, PrismaRemoveBookByIdParams, PrismaUpdateBookParams } from '../../shared/types/book.types';

// Mocking Prisma client
vi.mock('../../client', () => ({
  prisma: {
    book: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
    userFavorites: {
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const bookCreatedAt = new Date();

const bookData: Book = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  imageId: null,
  createdAt: bookCreatedAt,
  updatedAt: null
};

const userData: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '',
  lastLoggedIn: null,
  createdAt: bookCreatedAt,
  updatedAt: null
};

describe('Prisma Book Mutations', () => {
  describe('Successful Operations', () => {
    it('should add a new book', async () => {
      // Mocking the implementation for the create method
      (prisma.book.create as Mock).mockResolvedValue(bookData);

      const params: PrismaAddBookParams = { ...bookData };
      const result = await prismaBookMutationOperations.addBook(params);
      // Check if the result matches expected data, excluding updatedAt
      const { createdAt, ...expectedResult } = bookData;
      // Since the timestamp can be off by milliseconds we need to remove the timestamp information from the test
      expect(result.book).toEqual(expect.objectContaining(expectedResult));
      expect(result).toEqual(
        { book: bookData }
      );
      expect(prisma.book.create).toHaveBeenCalledWith({
        data: {
          ...bookData,
          createdAt: expect.any(String)
        }
      });
    });

    it('should update a book', async () => {
      const updatedBook = { ...bookData, title: 'Updated Book Title' }; //updatedAt is automatically applied in the function
      (prisma.book.update as Mock).mockResolvedValue(updatedBook);

      const params: PrismaUpdateBookParams = {
        where: { id: bookData.id },
        data: { title: 'Updated Book Title' }
      };
      const result = await prismaBookMutationOperations.updateBook(params);

      // Check if the result matches expected data, excluding updatedAt
      // Since the timestamp can be off by milliseconds we need to remove the timestamp information from the test
      const { updatedAt, ...expectedResult } = updatedBook;
      expect(result.book).toEqual(expect.objectContaining(expectedResult));
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: bookData.id },
        data: {
          title: 'Updated Book Title',
          updatedAt: expect.any(String)
        }
      });
    });

    it('should remove a book by ID', async () => {
      (prisma.book.delete as Mock).mockResolvedValue(bookData);

      const params: PrismaRemoveBookByIdParams = { id: bookData.id };
      const result = await prismaBookMutationOperations.removeBookById(params);

      expect(result).toEqual({ book: bookData });
      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: bookData.id } });
    });
  });

  describe('Error Handling', () => {
    it('should throw PrismaOperationError when creating a book with duplicate title', async () => {
      // Simulate unique constraint violation
      const duplicateTitleError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: 'P2002', clientVersion: '4.16.1' }
      );

      (prisma.book.create as Mock).mockRejectedValue(duplicateTitleError);

      const params: PrismaAddBookParams = { ...bookData };

      await expect(prismaBookMutationOperations.addBook(params))
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when updating a non-existent book', async () => {
      // Simulate record not found error
      const notFoundError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '4.16.1' }
      );

      (prisma.book.update as Mock).mockRejectedValue(notFoundError);

      const params: PrismaUpdateBookParams = {
        where: { id: 999 },
        data: { title: 'Updated Title' }
      };

      await expect(prismaBookMutationOperations.updateBook(params))
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when removing a book with existing relationships', async () => {
      // Simulate foreign key constraint violation
      const relationshipError = new Prisma.PrismaClientKnownRequestError(
        'Foreign key constraint failed',
        { code: 'P2003', clientVersion: '4.16.1' }
      );

      (prisma.book.delete as Mock).mockRejectedValue(relationshipError);

      const params: PrismaRemoveBookByIdParams = { id: 1 };

      await expect(prismaBookMutationOperations.removeBookById(params))
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError for unexpected database errors', async () => {
      // Simulate an unexpected database error
      const unexpectedError = new Error('Unexpected database error');

      (prisma.book.update as Mock).mockRejectedValue(unexpectedError);

      const params: PrismaUpdateBookParams = {
        where: { id: 1 },
        data: { description: 'Updated Description' }
      };

      await expect(prismaBookMutationOperations.updateBook(params))
        .rejects
        .toThrow(PrismaOperationError);
    });
  });
  describe('Favorite Book Operations', () => {
    it('should add a book to user favorites', async () => {
      // Mock book and user existence
      (prisma.book.findUnique as Mock).mockResolvedValue(bookData);
      (prisma.user.findUnique as Mock).mockResolvedValue(userData);

      // Mock successful create
      (prisma.userFavorites.create as Mock).mockResolvedValue(null);

      const result = await prismaBookMutationOperations.addUserToFavoriteBook({
        userId: userData.id,
        bookId: bookData.id
      });

      expect(result).toEqual({ book: bookData });
      expect(prisma.userFavorites.create).toHaveBeenCalledWith({
        data: { userId: userData.id, bookId: bookData.id }
      });
    });

    it('should remove a book from user favorites', async () => {
      // Mock book existence
      (prisma.book.findUnique as Mock).mockResolvedValue(bookData);

      // Mock successful delete
      (prisma.userFavorites.delete as Mock).mockResolvedValue(null);

      const result = await prismaBookMutationOperations.removeBookFromFavorites({
        userId: userData.id,
        bookId: bookData.id
      });

      expect(result).toEqual({ book: bookData });
      expect(prisma.userFavorites.delete).toHaveBeenCalledWith({
        where: {
          userId_bookId: {
            userId: userData.id,
            bookId: bookData.id
          }
        }
      });
    });

    it('should throw PrismaOperationError when adding a non-existent book to favorites', async () => {
      // Mock book not existing
      (prisma.book.findUnique as Mock).mockResolvedValue(null);

      await expect(prismaBookMutationOperations.addUserToFavoriteBook({
        userId: userData.id,
        bookId: 999
      })).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when adding a book to a non-existent user', async () => {
      // Mock book existing, but user not existing
      (prisma.book.findUnique as Mock).mockResolvedValue(bookData);
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      await expect(prismaBookMutationOperations.addUserToFavoriteBook({
        userId: 999,
        bookId: bookData.id
      })).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when adding a book already in favorites', async () => {
      // Mock book and user existence
      (prisma.book.findUnique as Mock).mockResolvedValue(bookData);
      (prisma.user.findUnique as Mock).mockResolvedValue(userData);

      // Simulate unique constraint violation
      const duplicateError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: 'P2002', clientVersion: '4.16.1' }
      );
      (prisma.userFavorites.create as Mock).mockRejectedValue(duplicateError);

      await expect(prismaBookMutationOperations.addUserToFavoriteBook({
        userId: userData.id,
        bookId: bookData.id
      })).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when removing a book not in favorites', async () => {
      // Mock book existence
      (prisma.book.findUnique as Mock).mockResolvedValue(bookData);

      // Simulate record not found error
      const notFoundError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '4.16.1' }
      );
      (prisma.userFavorites.delete as Mock).mockRejectedValue(notFoundError);

      await expect(prismaBookMutationOperations.removeBookFromFavorites({
        userId: userData.id,
        bookId: bookData.id
      })).rejects.toThrow(PrismaOperationError);
    });
  });
});