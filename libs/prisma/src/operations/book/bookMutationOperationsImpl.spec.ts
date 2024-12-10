import {
    prismaBookMutationOperations
  } from './bookMutationOperationsImpl';
  import { prisma } from '../../client';
  import { vi, Mock } from 'vitest';
  import { PrismaAddBookParams, PrismaRemoveBookByIdParams, PrismaUpdateBookParams} from "../../interfaces/book/book.mutation.parameters.interface";
import { BookInterface } from '../../interfaces/book/book.interface';
  // Mocking Prisma client
  vi.mock('../../client', () => ({
    prisma: {
      book: {
        create: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
      },
    },
  }));

  const bookData : BookInterface= {
    id: 0,
    title: 'New Book', 
    description: 'A new book', 
    author: 'author',
  };

  describe('Prisma Book Mutations', () => {
    it('should add a new book', async () => {
      
      const params : PrismaAddBookParams = bookData;
      // Mocking the implementation for the create method
      (prisma.book.create as Mock).mockResolvedValue(bookData);
  
      const result = await prismaBookMutationOperations.addBook(params);
      expect(result).toEqual(bookData);
      expect(prisma.book.create).toHaveBeenCalledWith({ data: bookData });
    });
  
    it('should remove a book by ID', async () => {
      // Mocking the implementation for the delete method
      (prisma.book.delete as Mock).mockResolvedValue(bookData);
  
      const params : PrismaRemoveBookByIdParams = bookData as PrismaRemoveBookByIdParams;

      const result = await prismaBookMutationOperations.removeBookById(params);
      expect(result).toEqual(bookData);
      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: bookData.id } });
    });
  
    it('should update a book', async () => {
      const updateData = { title: 'Updated Book Title' };
      const mockResponse = { ...bookData,...updateData };
  
      // Mocking the implementation for the update method
      (prisma.book.update as Mock).mockResolvedValue(mockResponse);
      

      const params : PrismaUpdateBookParams = {
        id: bookData.id,
        data: {
          ...updateData
        }
      }
      const result = await prismaBookMutationOperations.updateBook(params);
      expect(result).toEqual(mockResponse);
      expect(prisma.book.update).toHaveBeenCalledWith({ where: { id: bookData.id }, data: updateData });
    });
  });
  