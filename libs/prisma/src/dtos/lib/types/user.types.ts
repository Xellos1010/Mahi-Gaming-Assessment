/**
 * @fileoverview
 * This file defines the `PrismaUserWithFavoriteBooks` type which extends the `User` model from Prisma.
 * The type includes an additional property, `favoriteBooks`, which is an array of `Book` objects.
 * This is used for scenarios where we need to fetch a user along with their favorite books.
 * 
 * The `PrismaUserWithFavoriteBooks` type is commonly used in API responses or business logic
 * where both user information and associated favorite books need to be returned together.
 */

import type { User, Book } from "@prisma/client";

/**
 * Represents a `User` from Prisma along with their favorite books.
 * This type is a combination of the `User` model and an array of `Book` objects representing
 * the user's favorite books.
 * 
 * @type {object}
 * @property {User} user - The user object containing user details.
 * @property {Book[]} favoriteBooks - An array of books that are marked as the user's favorite.
 */
export type PrismaUserWithFavoriteBooks = User & {
  /**
   * List of books that the user has marked as their favorite.
   * This is an array of `Book` objects.
   *
   * @type {Book[]}
   */
  favoriteBooks: Book[];
};
