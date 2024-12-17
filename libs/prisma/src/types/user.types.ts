/**
 * @fileoverview
 * This file defines the types and interfaces related to user operations in the Prisma database.
 * The types help structure the parameters for various user-related database operations, such as:
 * - Updating a user
 * - Setting a user's password
 * - Updating the last logged-in time
 * - Retrieving a user by a unique identifier
 * 
 * Additionally, it defines an interface for handling user records with their related favorite books.
 */

import { Prisma } from '@prisma/client';
import { Book, User } from "@prisma/client";

/**
 * @type PrismaDatabaseUpdateUserParams
 * 
 * This type defines the structure for the parameters required to update a user in the database.
 * 
 * @param {Prisma.UserWhereUniqueInput} where
 * A unique identifier for the user, typically the user's `id`, to locate the specific user record.
 * 
 * @param {Prisma.UserUpdateInput} data
 * The data to be updated for the user. This includes fields like name, email, etc., based on the `UserUpdateInput`
 * generated by Prisma. This allows updating any of the user's details.
 */
export type PrismaDatabaseUpdateUserParams = {
  where: Prisma.UserWhereUniqueInput;  // The unique identifier for the user, usually `id`.
  data: Prisma.UserUpdateInput;        // The data to update, based on Prisma's generated input type.
};

/**
 * @type PrismaDatabaseSetUserPasswordParams
 * 
 * This type defines the structure for the parameters required to set or update a user's password in the database.
 * 
 * @param {Prisma.UserWhereUniqueInput} where
 * A unique identifier for the user, usually the user's `id`, to locate the user record that will have its password set.
 * 
 * @param {string} password
 * The new password for the user, stored as a string.
 */
export type PrismaDatabaseSetUserPasswordParams = {
  where: Prisma.UserWhereUniqueInput; // The unique identifier for the user, usually `id`.
  password: string;                   // The new password to set for the user.
};

/**
 * @type PrismaDatabaseSetLastLoggedInParams
 * 
 * This type defines the structure for the parameters required to update the last logged-in time for a user.
 * 
 * @param {Prisma.UserWhereUniqueInput} where
 * A unique identifier for the user, typically the user's `id`, to locate the user record.
 * 
 * @param {Date} lastLoggedIn
 * The new `lastLoggedIn` date to set for the user. It is of type `Date` and represents the last time the user logged in.
 */
export type PrismaDatabaseSetLastLoggedInParams = {
  where: Prisma.UserWhereUniqueInput;  // The unique identifier for the user, usually `id`.
  lastLoggedIn: Date;                  // The `lastLoggedIn` date to update.
};

/**
 * @type PrismaDatabaseSetLastLoggedInNowParams
 * 
 * This type defines the structure for the parameters required to set the `lastLoggedIn` field to the current date and time.
 * 
 * @param {Prisma.UserWhereUniqueInput} where
 * A unique identifier for the user, typically the user's `id`, to locate the specific user record.
 * 
 * @remarks
 * This is a convenience type for updating the `lastLoggedIn` field with the current date and time.
 */
export type PrismaDatabaseSetLastLoggedInNowParams = {
  where: Prisma.UserWhereUniqueInput;  // The unique identifier for the user, usually `id`.
};

/**
 * @type PrismaDatabaseGetUserParams
 * 
 * This type defines the structure for the parameters required to retrieve a user from the database.
 * 
 * @param {Prisma.UserWhereUniqueInput} where
 * A unique identifier for the user, typically the user's `id`, to locate and retrieve the user record.
 */
export type PrismaDatabaseGetUserParams = {
  where: Prisma.UserWhereUniqueInput;  // The unique identifier for the user, usually `id`.
};

/**
 * @interface PrismaUserResponseWithFavoriteBooks
 * 
 * This interface extends the `User` model from Prisma and includes an additional `favoriteBooks` field.
 * The `favoriteBooks` field is an array of `Book` records, representing the books that are marked as favorites by the user.
 * 
 * @type {User} 
 * The base `User` type from Prisma, representing a user record in the database.
 * 
 * @type {Book[]} favoriteBooks
 * An array of `Book` objects that are associated with the user as their favorite books.
 * 
 * @remarks
 * This interface is useful when you want to retrieve a user along with their related favorite books, 
 * which Prisma doesn't automatically include unless explicitly configured.
 */
export interface PrismaUserResponseWithFavoriteBooks extends User {
  favoriteBooks: Book[]; // An array of favorite books related to the user.
}
