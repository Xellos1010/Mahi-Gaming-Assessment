import {
    prismaUserMutationOperations
  } from './prismaUserMutationOperationsImpl';
  import { prisma } from '../client';
  import { vi, Mock } from 'vitest';
  
  // Mocking Prisma client
  vi.mock('../client', () => ({
    prisma: {
      user: {
        create: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
      },
    },
  }));
  
  describe('Prisma User Mutations', () => {
    it('should add a new user', async () => {
      const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
      const mockUser = { id: 1, ...userData };
  
      // Mocking the implementation for the create method
      (prisma.user.create as Mock).mockResolvedValue(mockUser);
  
      const result = await prismaUserMutationOperations.addUser(userData);
      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
    });
  
    it('should remove a user by ID', async () => {
      const mockResponse = { id: 1, name: 'John Doe' };
  
      // Mocking the implementation for the delete method
      (prisma.user.delete as Mock).mockResolvedValue(mockResponse);
  
      const result = await prismaUserMutationOperations.removeUserById(1);
      expect(result).toEqual(mockResponse);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should update a user password', async () => {
      const userId = 1;
      const newPassword = 'newPassword123';
      const mockResponse = { id: userId, password: newPassword };
  
      // Mocking the implementation for the update method
      (prisma.user.update as Mock).mockResolvedValue(mockResponse);
  
      const result = await prismaUserMutationOperations.setUserPassword(userId, newPassword);
      expect(result).toEqual(mockResponse);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: userId }, data: { password: newPassword } });
    });
  
    it('should set the last logged-in date for a user', async () => {
      const userId = 1;
      const lastLoggedIn = new Date('2024-12-07T12:00:00Z');
      const mockResponse = { id: userId, lastLoggedIn };
  
      // Mocking the implementation for the update method
      (prisma.user.update as Mock).mockResolvedValue(mockResponse);
  
      const result = await prismaUserMutationOperations.setLastLoggedIn(userId, lastLoggedIn);
      expect(result).toEqual(mockResponse);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: userId }, data: { lastLoggedIn } });
    });
  });
  