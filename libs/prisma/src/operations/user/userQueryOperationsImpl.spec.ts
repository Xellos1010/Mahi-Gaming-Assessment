import {
  prismaUserQueryOperations
} from './userQueryOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock, describe, it, expect } from 'vitest';
import type { User, Book } from '@prisma/client';
import {
  PrismaOperationError
} from '../../errors/prisma-errors';
import { UsersListResponseDto, SingleUserResponseDto, PrismaUserWithFavoriteBooksResponse, BaseUserIdDto, BaseEmailDto } from '../../dtos';

// Mocking Prisma client 
vi.mock('../../client', () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '',
  lastLoggedIn: null,
  createdAt: new Date(),
  updatedAt: null
};

const favoriteBooks: Book[] = [
  {
    id: 1,
    title: 'Favorite Book 1',
    author: '',
    description: null,
    imageId: null,
    createdAt: new Date(),
    updatedAt: null
  },
  {
    id: 2,
    title: 'Favorite Book 2',
    author: '',
    description: null,
    imageId: null,
    createdAt: new Date(),
    updatedAt: null
  },
];

const mockUsers: User[] = [
  { ...mockUser },
  {
    ...mockUser,
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com'
  },
];

describe('Prisma User Queries', () => {

  it('should get all users', async () => {
    (prisma.user.findMany as Mock).mockResolvedValue(mockUsers);

    const result: UsersListResponseDto = await prismaUserQueryOperations.getAllUsers();
    const expectedResults: UsersListResponseDto = { users: mockUsers };

    expect(result).toEqual(expectedResults);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should get a user by ID', async () => {
    const { id } = mockUser;
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);

    const params: BaseUserIdDto = { id };
    const result: SingleUserResponseDto = await prismaUserQueryOperations.getUserById(params);
    const expectedResult: SingleUserResponseDto = { user: mockUser };

    expect(result).toEqual(expectedResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should get a user by email', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);

    const params: BaseEmailDto = { email: mockUser.email };
    const result: SingleUserResponseDto = await prismaUserQueryOperations.getUserByEmail(params);
    const expectedResult: SingleUserResponseDto = { user: mockUser };

    expect(result).toEqual(expectedResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockUser.email } });
  });

  it('should get a user by email including favorite books', async () => {
    const mockResult: PrismaUserWithFavoriteBooksResponse = {
      user: { ...mockUser, favoriteBooks }
    };

    (prisma.user.findUnique as Mock).mockResolvedValue(mockResult.user);

    const params: BaseEmailDto = { email: mockUser.email };
    const result: PrismaUserWithFavoriteBooksResponse = await prismaUserQueryOperations.getUserByEmailIncludeFavoriteBooks(params);

    expect(result).toEqual(mockResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUser.email },
      include: { favoriteBooks: true }
    });
  });

  it('should get a user\'s favorite books', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue({
      ...mockUser,
      favoriteBooks
    });

    const params: BaseUserIdDto = { id: mockUser.id };
    const result: PrismaUserWithFavoriteBooksResponse = await prismaUserQueryOperations.getUserFavoriteBooks(params);

    const expectedResult: PrismaUserWithFavoriteBooksResponse = {
      user: { ...mockUser, favoriteBooks }
    };

    expect(result).toEqual(expectedResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      select: { favoriteBooks: true },
    });
  });

  describe('Error Handling', () => {

    it('should throw PrismaOperationError when getting all users fails', async () => {
      const unexpectedError = new Error('Unexpected database error');
      (prisma.user.findMany as Mock).mockRejectedValue(unexpectedError);

      await expect(prismaUserQueryOperations.getAllUsers()).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when getting a user by non-existent ID', async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      const params: BaseUserIdDto = { id: 999 };

      await expect(prismaUserQueryOperations.getUserById(params)).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when getting a user by non-existent email', async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      const params: BaseEmailDto = { email: 'nonexistent@example.com' };

      await expect(prismaUserQueryOperations.getUserByEmail(params)).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError when getting user favorite books for non-existent user', async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      const params: BaseUserIdDto = { id: 999 };

      await expect(prismaUserQueryOperations.getUserFavoriteBooks(params)).rejects.toThrow(PrismaOperationError);
    });

    it('should throw PrismaOperationError for unexpected database errors in getUserByEmail', async () => {
      const unexpectedError = new Error('Unexpected database error');
      (prisma.user.findUnique as Mock).mockRejectedValue(unexpectedError);

      const params: BaseEmailDto = { email: 'test@example.com' };

      await expect(prismaUserQueryOperations.getUserByEmail(params)).rejects.toThrow(PrismaOperationError);
    });
  });
});
