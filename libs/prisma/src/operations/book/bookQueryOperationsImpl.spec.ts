import {
  prismaBookQueryOperations
} from './bookQueryOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import type { Book } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.
import { GetBookParams } from '../../shared/types/book.types';

// Mocking Prisma client
vi.mock('../../client', () => ({
  prisma: {
    book: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

const mockBook: Book = {
  id: 1,
  title: 'Test Book',
  description: 'Test description',
  author: '',
  imageId: null
};

const mockBooks: Book[] = [
  {
    ...mockBook
  },
  {
    id: 2,
    title: 'Book 2',
    description: 'Description 2',
    author: '',
    imageId: null
  },
];
describe('Prisma Book Queries', () => {
  it('should get all books', async () => {

    // Mocking the implementation for the findMany method
    (prisma.book.findMany as Mock).mockResolvedValue(mockBooks);

    const result = await prismaBookQueryOperations.getAllBooks();
    expect(result).toEqual(mockBooks);
    expect(prisma.book.findMany).toHaveBeenCalled();
  });

  it('should get a specific book by ID', async () => {

    const params: GetBookParams = mockBook as GetBookParams;
    // Mocking the implementation for the findUnique method
    (prisma.book.findUnique as Mock).mockResolvedValue(mockBook);

    const result = await prismaBookQueryOperations.getBook(params);
    expect(result).toEqual(mockBook);
    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: mockBook.id } });
  });
});
