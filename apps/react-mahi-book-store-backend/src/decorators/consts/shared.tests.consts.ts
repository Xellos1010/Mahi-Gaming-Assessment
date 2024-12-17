/**
 * @fileoverview 
 * This file contains mock data for testing or seeding purposes. 
 * It includes mock users, books, and user-book relationships.
 * These mock objects are used for testing API endpoints, 
 * service methods, and other application logic in a local or test environment.
 */

import type { Book, User } from "@prisma/client";
import { PrismaUserWithFavoriteBooks } from "libs/prisma/src/dtos/lib/types/user.types";

/**
 * Mock user object used for testing purposes.
 * @type {User}
 */
export const mockUser: User = {
    id: 1, 
    name: 'Test user', // Name of the user
    email: 'test@example.com', // Email of the user
    password: 'hashedPassword', // Hashed password of the user
    lastLoggedIn: undefined, // Last login date (undefined in this mock)
    createdAt: new Date(), // Creation timestamp for the user
    updatedAt: undefined // Update timestamp (undefined in this mock)
};

/**
 * Array of mock users, currently containing only one mock user.
 * @type {User[]}
 */
export const mockUsers: User[] = [
    {
        ...mockUser // Spread the mockUser object into the array
    },
];

/**
 * Mock book object used for testing purposes.
 * @type {Book}
 */
export const mockBook: Book = {
    id: 1, // Unique identifier for the book
    title: 'Book 1', // Title of the book
    author: 'Author 1', // Author of the book
    description: 'Test description', // Description of the book
    imageId: 'img1', // Image ID for the book cover
    createdAt: new Date(), // Creation timestamp for the book
    updatedAt: undefined // Update timestamp (undefined in this mock)
};

/**
 * Array of mock books, currently containing only one mock book.
 * @type {Book[]}
 */
export const mockBooks: Book[] = [
    {
        ...mockBook // Spread the mockBook object into the array
    },
];

/**
 * Mock favorite books list, representing a collection of books marked as favorites.
 * @type {Book[]}
 */
export const favoriteBooks: Book[] = [
    {
        ...mockBook // Spread the mockBook into the favorite books array
    },
];

/**
 * Mock user with a list of favorite books. 
 * This object combines a mock user with their favorite books.
 * @type {PrismaUserWithFavoriteBooks}
 */
export const mockUserWithBooks: PrismaUserWithFavoriteBooks = {
    ...mockUser, // Spread the mockUser object to include its properties
    favoriteBooks // Add the favoriteBooks list to the mock user
};
