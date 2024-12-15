import type { Book, User } from "@prisma/client";
import { PrismaUserResponseWithFavoriteBooks } from "@prismaDist/interfaces/user/user.types";


export const mockUser: User = {
    id: 1,
    name: 'Test user',
    email: 'test@example.com',
    password: 'hashedPassword',
    lastLoggedIn: undefined,
    createdAt: undefined,
    updatedAt: undefined
};

export const mockUsers: User[] = [
    {
        ...mockUser
    },
];

export const mockBook: Book = {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    description: 'Test description',
    imageId: 'img1',
    createdAt: undefined,
    updatedAt: undefined
};

export const mockBooks: Book[] = [
    {
        ...mockBook
    },
];

export const favoriteBooks: Book[] = [
    {
        ...mockBook
    },
];

export const mockUserWithBooks: PrismaUserResponseWithFavoriteBooks = {
    ...mockUser,
    favoriteBooks
};
