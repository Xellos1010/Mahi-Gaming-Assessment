import {
    prismaBookMutationOperations
  } from './prismaBookMutationOperationsImpl';
  import { prisma } from '../client';
  import { vi, Mock } from 'vitest';
  
  // Mocking Prisma client
  vi.mock('../client', () => ({
    prisma: {
      book: {
        create: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
      },
    },
  }));
  
  describe('Prisma Book Mutations', () => {
    it('should add a new book', async () => {
      const bookData = { name: 'New Book', description: 'A new book' };
      const mockBook = { id: 1, ...bookData };
  
      // Mocking the implementation for the create method
      (prisma.book.create as Mock).mockResolvedValue(mockBook);
  
      const result = await prismaBookMutationOperations.addBook(bookData);
      expect(result).toEqual(mockBook);
      expect(prisma.book.create).toHaveBeenCalledWith({ data: bookData });
    });
  
    it('should remove a book by ID', async () => {
      const mockResponse = { id: 1, name: 'Test Book' };
  
      // Mocking the implementation for the delete method
      (prisma.book.delete as Mock).mockResolvedValue(mockResponse);
  
      const result = await prismaBookMutationOperations.removeBookById(1);
      expect(result).toEqual(mockResponse);
      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should update a book', async () => {
      const bookId = 1;
      const updateData = { name: 'Updated Book' };
      const mockResponse = { id: bookId, ...updateData };
  
      // Mocking the implementation for the update method
      (prisma.book.update as Mock).mockResolvedValue(mockResponse);
  
      const result = await prismaBookMutationOperations.updateBook(bookId, updateData);
      expect(result).toEqual(mockResponse);
      expect(prisma.book.update).toHaveBeenCalledWith({ where: { id: bookId }, data: updateData });
    });
  });
  