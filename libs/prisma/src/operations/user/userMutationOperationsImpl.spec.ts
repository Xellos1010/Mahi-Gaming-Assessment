import {
  prismaUserMutationOperations
} from './userMutationOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import type { User } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.
import { AddUserParams, RemoveUserByIdParams, SetUserPasswordParams, SetLastLoggedInParams } from '../../shared/types/user.types';

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
  lastLoggedIn: null
};

describe('Prisma User Mutations', () => {
  it('should add a new user', async () => {


    // Mocking the implementation for the create method
    (prisma.user.create as Mock).mockResolvedValue(userData);

    const params: AddUserParams = {
      ...userData
    } as AddUserParams;

    const result = await prismaUserMutationOperations.addUser(params);
    expect(result).toEqual(userData);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
  });

  it('should remove a user by ID', async () => {
    const mockResponse = userData;
    const { id } = mockResponse;
    // Mocking the implementation for the delete method
    (prisma.user.delete as Mock).mockResolvedValue(mockResponse);

    const removeUserByIdParams: RemoveUserByIdParams = { id }
    const result = await prismaUserMutationOperations.removeUserById(removeUserByIdParams);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update a user password', async () => {
    const { id } = userData;
    const newPassword = 'newPassword123';
    const mockResponse = { ...userData, password: newPassword };

    // Mocking the implementation for the update method
    (prisma.user.update as Mock).mockResolvedValue(mockResponse);

    const params: SetUserPasswordParams = {
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
    const mockResponse = { ...userData, lastLoggedIn };

    // Mocking the implementation for the update method
    (prisma.user.update as Mock).mockResolvedValue(mockResponse);

    const params: SetLastLoggedInParams = {
      where: { id },
      lastLoggedIn
    };
    
    const result = await prismaUserMutationOperations.setLastLoggedIn(params);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id }, data: { lastLoggedIn } });
  });
});
