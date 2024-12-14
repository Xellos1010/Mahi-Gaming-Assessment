import {
  prismaUserQueryOperations
} from './userQueryOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import type { Book, User } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.
import { PrismaGetUserByIdParams, PrismaGetUserByEmailParams, PrismaGetUserByIdFavoriteBooksParams} from '../../shared/types/user.types';
import { PrismaOperationError, UserNotFoundError } from '../../errors/prisma-errors';
import { PrismaGetAllUsersResponse, PrismaGetUserByEmailIncludeFavoriteBooksResponse, PrismaGetUserByEmailResponse, PrismaGetUserByIdResponse, PrismaGetUserFavoriteBooksResponse } from '../../interfaces/user/user.query.operations.interface';

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

//Favorite Bokos will be worked out after the first version of the front-end is implemented
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
  {
    ...mockUser
  },
  {
    ...mockUser,
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com'
  },
];
describe('Prisma User Queries', () => {
  it('should get all users', async () => {

    // Mocking the implementation for the findMany method
    (prisma.user.findMany as Mock).mockResolvedValue(mockUsers);
    const result = await prismaUserQueryOperations.getAllUsers();
    const expectedResults: PrismaGetAllUsersResponse = { users: mockUsers }
    expect(result).toEqual(expectedResults);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should get a user by ID', async () => {
    // Destructure the id from mockUser
    const { id } = mockUser;
    // Mocking the implementation for the findUnique method
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);

    const getUserFavoriteBooksParams: PrismaGetUserByIdParams = { id }
    const result = await prismaUserQueryOperations.getUserById(getUserFavoriteBooksParams);
    const expectedResult: PrismaGetUserByIdResponse = { user: mockUser };
    expect(result).toEqual(expectedResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should get a user by email', async () => {
    // Mocking the implementation for the findUnique method
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
    const params: PrismaGetUserByEmailParams = {
      ...mockUser
    } as PrismaGetUserByEmailParams
    const result = await prismaUserQueryOperations.getUserByEmail(params);
    const expectedResult: PrismaGetUserByEmailResponse = {
      user: mockUser
    }
    expect(result).toEqual(expectedResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockUser.email } });
  });

  it('should get a user by email including favorite books', async () => {
    // Mocking the implementation for the findUnique method
    const mockResult: PrismaGetUserByEmailIncludeFavoriteBooksResponse = {
      user: { ...mockUser, favoriteBooks: favoriteBooks }
    };
    const params: PrismaGetUserByEmailParams = {
      ...mockUser
    } as PrismaGetUserByEmailParams
    (prisma.user.findUnique as Mock).mockResolvedValue(mockResult.user);
    const result = await prismaUserQueryOperations.getUserByEmailIncludeFavoriteBooks(params);
    expect(result).toEqual(mockResult); //TODO: This result needs to include the favorite books...
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUser.email },
      include: { favoriteBooks: true }
    });
  });

  it('should get a user\'s favorite books', async () => {
    // Mocking the implementation for the findUnique method
    (prisma.user.findUnique as Mock).mockResolvedValue({
      mockUser,
      favoriteBooks: favoriteBooks, // Add favoriteBooks here
    });
    const getUserFavoriteBooksParams: PrismaGetUserByIdFavoriteBooksParams = mockUser as PrismaGetUserByIdFavoriteBooksParams
    const result = await prismaUserQueryOperations.getUserFavoriteBooks(getUserFavoriteBooksParams);
    const expectedResult: PrismaGetUserFavoriteBooksResponse = {
      books: favoriteBooks
    };
    expect(result).toEqual(expectedResult);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      select: { favoriteBooks: true },
    });
  });
  describe('Error Handling', () => {
    it('should throw PrismaOperationError when getting all users fails', async () => {
      // Simulate an unexpected database error
      const unexpectedError = new Error('Unexpected database error');

      (prisma.user.findMany as Mock).mockRejectedValue(unexpectedError);

      await expect(prismaUserQueryOperations.getAllUsers())
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw UserNotFoundError when getting a user by non-existent ID', async () => {
      // Simulate user not found
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      const params: PrismaGetUserByIdParams = { id: 999 };

      await expect(prismaUserQueryOperations.getUserById(params))
        .rejects
        .toThrow(UserNotFoundError);
    });

    it('should throw UserNotFoundError when getting a user by non-existent email', async () => {
      // Simulate user not found
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      const params: PrismaGetUserByEmailParams = { email: 'nonexistent@example.com' };

      await expect(prismaUserQueryOperations.getUserByEmail(params))
        .rejects
        .toThrow(UserNotFoundError);
    });

    it('should throw UserNotFoundError when getting user favorite books for non-existent user', async () => {
      // Simulate user not found
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      const params: PrismaGetUserByIdFavoriteBooksParams = { id: 999 };

      await expect(prismaUserQueryOperations.getUserFavoriteBooks(params))
        .rejects
        .toThrow(UserNotFoundError);
    });

    it('should throw PrismaOperationError for unexpected database errors in getUserByEmail', async () => {
      // Simulate an unexpected database error
      const unexpectedError = new Error('Unexpected database error');

      (prisma.user.findUnique as Mock).mockRejectedValue(unexpectedError);

      const params: PrismaGetUserByEmailParams = { email: 'test@example.com' };

      await expect(prismaUserQueryOperations.getUserByEmail(params))
        .rejects
        .toThrow(PrismaOperationError);
    });
  });
});
