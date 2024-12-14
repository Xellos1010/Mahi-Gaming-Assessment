import {
  prismaUserMutationOperations
} from './userMutationOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import { Prisma, type User } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.
import { PrismaAddUserParams, PrismaRemoveUserByIdParams, PrismaSetLastLoggedInNowParams, PrismaSetLastLoggedInParams, PrismaSetUserPasswordParams } from '../../shared/types/user.types';
import { PrismaOperationError, UserNotFoundError } from '../../errors/prisma-errors';
import { PrismaAddUserResponse, PrismaRemoveUserByIdResponse, PrismaUpdateUserResponse } from '../../interfaces/user/user.mutation.operations.interface';

// Mocking Prisma client
vi.mock('../../client', () => ({
  prisma: {
    user: {
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const userData: User = {
  id: 0,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  lastLoggedIn: null,
  createdAt: new Date(),
  updatedAt: null
};

describe('Prisma User Mutations', () => {
  it('should add a new user', async () => {
    // Mocking the implementation for the create method
    const mockResponse: PrismaAddUserResponse = { user: userData};
    (prisma.user.create as Mock).mockResolvedValue(mockResponse.user);

    const params: PrismaAddUserParams = {
      ...userData
    } as PrismaAddUserParams;

    const result: PrismaAddUserResponse = await prismaUserMutationOperations.addUser(params);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
  });

  it('should remove a user by ID', async () => {
    const mockResponse: PrismaRemoveUserByIdResponse = { user: userData };
    const { id } = mockResponse.user;
    // Mocking the implementation for the delete method
    (prisma.user.delete as Mock).mockResolvedValue(mockResponse.user);

    const removeUserByIdParams: PrismaRemoveUserByIdParams = { id }
    const result = await prismaUserMutationOperations.removeUserById(removeUserByIdParams);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update a user password', async () => {
    const { id } = userData;
    const newPassword = 'newPassword123';
    const mockResponse: PrismaUpdateUserResponse = { user: { ...userData, password: newPassword } };

    // Mocking the implementation for the update method
    (prisma.user.update as Mock).mockResolvedValue(mockResponse.user);

    const params: PrismaSetUserPasswordParams = {
      where: { id },
      password: newPassword
    };

    const result = await prismaUserMutationOperations.setUserPassword(params);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id }, data: { password: newPassword } });
  });

  it('should set the last logged-in date for a user', async () => {
    const { id } = userData;
    const lastLoggedIn = new Date('2024-12-07T12:00:00Z');
    const mockResponse = { user: { ...userData, lastLoggedIn } };

    // Mocking the implementation for the update method
    (prisma.user.update as Mock).mockResolvedValue(mockResponse.user);

    const params: PrismaSetLastLoggedInParams = {
      where: { id },
      lastLoggedIn
    };

    const result = await prismaUserMutationOperations.setLastLoggedIn(params);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id }, data: { lastLoggedIn } });
  });

  it('should set the last logged-in date for a user to Now', async () => {
    const { id } = userData;
    const lastLoggedIn = new Date('2024-12-07T12:00:00Z');
    const mockResponse = { user: { ...userData, lastLoggedIn } };

    // Mocking the implementation for the update method
    (prisma.user.update as Mock).mockResolvedValue(mockResponse.user);

    const params: PrismaSetLastLoggedInNowParams = {
      where: { id }
    };

    const result = await prismaUserMutationOperations.setLastLoggedInNow(params);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id }, data: { lastLoggedIn } });
  });
  describe('Error Handling', () => {
    it('should throw PrismaOperationError when creating a user with duplicate email', async () => {
      // Simulate unique constraint violation
      const duplicateEmailError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: 'P2002', clientVersion: '4.16.1' }
      );

      (prisma.user.create as Mock).mockRejectedValue(duplicateEmailError);

      const params: PrismaAddUserParams = { ...userData };

      await expect(prismaUserMutationOperations.addUser(params))
        .rejects
        .toThrow(PrismaOperationError);
    });

    it('should throw UserNotFoundError when updating a non-existent user', async () => {
      // Simulate record not found error
      const notFoundError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '4.16.1' }
      );

      (prisma.user.update as Mock).mockRejectedValue(notFoundError);

      const params = {
        where: { id: 999 },
        data: { name: 'Updated Name' }
      };

      await expect(prismaUserMutationOperations.updateUser(params))
        .rejects
        .toThrow(UserNotFoundError);
    });

    it('should throw UserNotFoundError when removing a non-existent user', async () => {
      // Simulate record not found error
      const notFoundError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '4.16.1' }
      );

      (prisma.user.delete as Mock).mockRejectedValue(notFoundError);

      const params: PrismaRemoveUserByIdParams = { id: 999 };

      await expect(prismaUserMutationOperations.removeUserById(params))
        .rejects
        .toThrow(UserNotFoundError);
    });

    it('should throw PrismaOperationError for unexpected database errors', async () => {
      // Simulate an unexpected database error
      const unexpectedError = new Error('Unexpected database error');

      (prisma.user.update as Mock).mockRejectedValue(unexpectedError);

      const params: PrismaSetUserPasswordParams = {
        where: { id: 1 },
        password: 'newPassword123'
      };

      await expect(prismaUserMutationOperations.setUserPassword(params))
        .rejects
        .toThrow(PrismaOperationError);
    });
  });
});

