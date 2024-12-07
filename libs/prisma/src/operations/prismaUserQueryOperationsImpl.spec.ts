import {
    prismaUserQueryOperations
  } from './prismaUserQueryOperationsImpl';
  import { prisma } from '../client';
  import { vi, Mock } from 'vitest';
  
  // Mocking Prisma client
  vi.mock('../client', () => ({
    prisma: {
      user: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  }));
  
  describe('Prisma User Queries', () => {
    it('should get all users', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];
  
      // Mocking the implementation for the findMany method
      (prisma.user.findMany as Mock).mockResolvedValue(mockUsers);
  
      const result = await prismaUserQueryOperations.getAllUsers();
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  
    it('should get a user by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
  
      // Mocking the implementation for the findUnique method
      (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
  
      const result = await prismaUserQueryOperations.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should get a user by email', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
  
      // Mocking the implementation for the findUnique method
      (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
  
      const result = await prismaUserQueryOperations.getUserByEmail('john.doe@example.com');
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
  
      const result = await prismaUserQueryOperations.getUserFavoriteBooks(1);
      expect(result).toEqual(mockFavorites);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { favoriteBooks: true },
      });
    });
  });
  