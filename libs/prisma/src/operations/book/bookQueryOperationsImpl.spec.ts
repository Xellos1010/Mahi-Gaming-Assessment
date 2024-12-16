import {
  prismaBookQueryOperations
} from './bookQueryOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock, describe, it, expect } from 'vitest';
import { PrismaOperationError } from '../../errors/prisma-errors';
import type { Book } from '@prisma/client';
import {
  BooksListResponseDto,
  SingleBookResponseDto,
  BaseBookIdDto
} from '../../dtos/lib/book.dto';

vi.mock('../../client', () => ({
  prisma: {
    book: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

const bookData: Book = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  imageId: null,
  createdAt: new Date(),
  updatedAt: null
};

describe('Prisma Book Queries', () => {
  describe('Successful Operations', () => {

    it('should get all books', async () => {
      (prisma.book.findMany as Mock).mockResolvedValue([bookData]);

      const result: BooksListResponseDto = await prismaBookQueryOperations.getAllBooks();

      expect(result).toEqual({ books: [bookData] });
      expect(prisma.book.findMany).toHaveBeenCalled();
    });

    it('should get a book by ID', async () => {
      (prisma.book.findUnique as Mock).mockResolvedValue(bookData);

      const params: BaseBookIdDto = { id: bookData.id };
      const result: SingleBookResponseDto = await prismaBookQueryOperations.getBook(params);

      expect(result).toEqual({ book: bookData });
      expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: bookData.id } });
    });
  });

  describe('Error Handling', () => {

    it('should throw PrismaOperationError when failing to retrieve all books', async () => {
      const unexpectedError = new Error('Unexpected error');

      (prisma.book.findMany as Mock).mockRejectedValue(unexpectedError);

      await expect(prismaBookQueryOperations.getAllBooks())
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when retrieving a book by a non-existent ID', async () => {
      (prisma.book.findUnique as Mock).mockResolvedValue(null);

      const params: BaseBookIdDto = { id: 999 };
      await expect(prismaBookQueryOperations.getBook(params))
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError for unexpected database errors when getting a book by ID', async () => {
      const unexpectedError = new Error('Database error');

      (prisma.book.findUnique as Mock).mockRejectedValue(unexpectedError);

      const params: BaseBookIdDto = { id: bookData.id };

      await expect(prismaBookQueryOperations.getBook(params))
        .rejects
        .toThrow(PrismaOperationError);
    });
  });
});
