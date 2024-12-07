import {
    prismaBookQueryOperations
  } from './prismaBookQueryOperationsImpl';
  import { prisma } from '../client';
  import { vi, Mock } from 'vitest';
  
  // Mocking Prisma client
  vi.mock('../client', () => ({
    prisma: {
      book: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  }));
  
  describe('Prisma Book Queries', () => {
    it('should get all books', async () => {
      const mockBooks = [
        { id: 1, name: 'Book 1', description: 'Description 1' },
        { id: 2, name: 'Book 2', description: 'Description 2' },
      ];
  
      // Mocking the implementation for the findMany method
      (prisma.book.findMany as Mock).mockResolvedValue(mockBooks);
  
      const result = await prismaBookQueryOperations.getAllBooks();
      expect(result).toEqual(mockBooks);
      expect(prisma.book.findMany).toHaveBeenCalled();
    });
  
    it('should get a specific book by ID', async () => {
      const mockBook = { id: 1, name: 'Test Book', description: 'Test description' };
  
      // Mocking the implementation for the findUnique method
      (prisma.book.findUnique as Mock).mockResolvedValue(mockBook);
  
      const result = await prismaBookQueryOperations.getBook(1);
      expect(result).toEqual(mockBook);
      expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
  