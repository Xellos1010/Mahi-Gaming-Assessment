import {
  prismaBookQueryOperations
} from './bookQueryOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import { PrismaGetBookParams } from '../../interfaces/book/book.query.parameters.interface';
import { BookInterface } from '../../interfaces/book/book.interface';

// Mocking Prisma client
vi.mock('../../client', () => ({
  prisma: {
    book: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

const mockBook: BookInterface = {
  id: 1,
  title: 'Test Book',
  description: 'Test description',
  author: ''
};

const mockBooks: BookInterface[] = [
  {
    ...mockBook
  },
  {
    id: 2,
    title: 'Book 2',
    description: 'Description 2',
    author: ''
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

    const params: PrismaGetBookParams = mockBook as PrismaGetBookParams;
    // Mocking the implementation for the findUnique method
    (prisma.book.findUnique as Mock).mockResolvedValue(mockBook);

    const result = await prismaBookQueryOperations.getBook(params);
    expect(result).toEqual(mockBook);
    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: mockBook.id } });
  });
});
