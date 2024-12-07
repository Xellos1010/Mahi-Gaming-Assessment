import {
    getAllBooks,
    getBook,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserFavoriteBooks,
  } from './queries';
  import { prisma } from '../client';
  import { vi, Mock } from 'vitest';
  
  // Mocking Prisma client
  vi.mock('../client', () => ({
    prisma: {
      book: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      user: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  }));
  
  describe('Prisma Queries', () => {
    it('should get all books', async () => {
      const mockBooks = [
        { id: 1, name: 'Book 1', description: 'Description 1' },
        { id: 2, name: 'Book 2', description: 'Description 2' },
      ];
  
      // Mocking the implementation for the findMany method
      (prisma.book.findMany as Mock).mockResolvedValue(mockBooks);
  
      const result = await getAllBooks();
      expect(result).toEqual(mockBooks);
      expect(prisma.book.findMany).toHaveBeenCalled();
    });
  
    it('should get a specific book by ID', async () => {
      const mockBook = { id: 1, name: 'Test Book', description: 'Test description' };
  
      // Mocking the implementation for the findUnique method
      (prisma.book.findUnique as Mock).mockResolvedValue(mockBook);
  
      const result = await getBook(1);
      expect(result).toEqual(mockBook);
      expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should get all users', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];
  
      // Mocking the implementation for the findMany method
      (prisma.user.findMany as Mock).mockResolvedValue(mockUsers);
  
      const result = await getAllUsers();
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  
    it('should get a user by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
  
      // Mocking the implementation for the findUnique method
      (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
  
      const result = await getUserById(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should get a user by email', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
  
      // Mocking the implementation for the findUnique method
      (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
  
      const result = await getUserByEmail('john.doe@example.com');
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'john.doe@example.com' } });
    });
  
    it('should get a user\'s favorite books', async () => {
      const mockFavorites = {
        favoriteBooks: [
          { id: 1, name: 'Favorite Book 1' },
          { id: 2, name: 'Favorite Book 2' },
        ],
      };
  
      // Mocking the implementation for the findUnique method
      (prisma.user.findUnique as Mock).mockResolvedValue(mockFavorites);
  
      const result = await getUserFavoriteBooks(1);
      expect(result).toEqual(mockFavorites);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { favoriteBooks: true },
      });
    });
  });
  