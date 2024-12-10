import {
  prismaUserMutationOperations
} from './userMutationOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import { PrismaAddUserParams, PrismaRemoveUserByIdParams, PrismaSetLastLoggedInParams, PrismaSetUserPasswordParams } from '../../interfaces/user/user.mutation.parameters.interface';
import { UserInterface } from '../../interfaces/user/user.interface';

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

const userData: UserInterface = {
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

    const params: PrismaAddUserParams = {
      ...userData
    } as PrismaAddUserParams;

    const result = await prismaUserMutationOperations.addUser(params);
    expect(result).toEqual(userData);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
  });

  it('should remove a user by ID', async () => {
    const mockResponse = userData;
    const { id } = mockResponse;
    // Mocking the implementation for the delete method
    (prisma.user.delete as Mock).mockResolvedValue(mockResponse);

    const removeUserByIdParams: PrismaRemoveUserByIdParams = { id }
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

    const params: PrismaSetUserPasswordParams = {
      ...mockResponse
    } as PrismaSetUserPasswordParams;

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

    const params: PrismaSetLastLoggedInParams = {
      ...mockResponse
    } as PrismaSetLastLoggedInParams;
    
    const result = await prismaUserMutationOperations.setLastLoggedIn(params);
    expect(result).toEqual(mockResponse);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id }, data: { lastLoggedIn } });
  });
});
