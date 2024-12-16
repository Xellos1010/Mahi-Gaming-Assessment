import type { Book, User } from "@prisma/client";
import { PrismaUserWithFavoriteBooksResponse, SingleUserResponseWithFavoriteBooksDto } from "@prismaDist/dtos/lib/user.dto";
import { PrismaUserResponseWithFavoriteBooks } from "libs/dtos/src/lib/types/user.types";
import { PrismaUserWithFavoriteBooks } from "libs/prisma/src/dtos/lib/types/user.types";


export const mockUser: User = {
    id: 1,
    name: 'Test user',
    email: 'test@example.com',
    password: 'hashedPassword',
    lastLoggedIn: undefined,
    createdAt: new Date(),
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
    createdAt: new Date(),
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

export const mockUserWithBooks: PrismaUserWithFavoriteBooks = {
    ...mockUser,
    favoriteBooks
};
