import {
  prismaUserQueryOperations
} from './userQueryOperationsImpl';
import { prisma } from '../../client';
import { vi, Mock } from 'vitest';
import type { User } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.
import { GetUserByIdParams, GetUserByEmailParams, GetUserFavoriteBooksParams } from '../../shared/types/user.types';

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
};

//Favorite Bokos will be worked out after the first version of the front-end is implemented
const favoriteBooks = [
  {
    id: 1,
    title: 'Favorite Book 1',
    author: ''
  },
  {
    id: 2,
    title: 'Favorite Book 2',
    author: ''
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
    expect(result).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should get a user by ID', async () => {
    // Destructure the id from mockUser
    const { id } = mockUser;
    // Mocking the implementation for the findUnique method
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);

    const getUserFavoriteBooksParams: GetUserByIdParams = { id }
    const result = await prismaUserQueryOperations.getUserById(getUserFavoriteBooksParams);
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should get a user by email', async () => {
    // Mocking the implementation for the findUnique method
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
    const params: GetUserByEmailParams = {
      ...mockUser
    } as GetUserByEmailParams
    const result = await prismaUserQueryOperations.getUserByEmail(params);
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockUser.email } });
  });

  it('should get a user\'s favorite books', async () => {
    // Mocking the implementation for the findUnique method
    (prisma.user.findUnique as Mock).mockResolvedValue({
      mockUser,
      favoriteBooks: favoriteBooks, // Add favoriteBooks here
    });
    const getUserFavoriteBooksParams: GetUserFavoriteBooksParams = mockUser as GetUserFavoriteBooksParams
    const result = await prismaUserQueryOperations.getUserFavoriteBooks(getUserFavoriteBooksParams);
    expect(result).toEqual(favoriteBooks);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      select: { favoriteBooks: true },
    });
  });
});
