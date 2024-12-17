/**
 * @fileoverview
 * This file defines data transfer objects (DTOs) for managing user-related operations, such as user creation, updates, 
 * fetching user details, and managing user credentials. These DTOs include basic user information, user passwords, 
 * and user favorites like books.
 * 
 * The interfaces also help structure API responses for single users, lists of users, and users with their favorite books.
 */

import { Prisma } from '@prisma/client';
import type { Book, User } from '@prisma/client';
import { PrismaUserWithFavoriteBooks } from './types/user.types';

/**
 * Represents the base structure for a User ID.
 * This DTO is used to extract only the `id` field from a `User` object.
 * 
 * @type {object}
 */
export interface BaseUserIdDto extends Pick<User, 'id'> { }

/**
 * Represents the base structure for a User's password.
 * This DTO is used to extract the `password` field from a `User` object.
 * 
 * @type {object}
 */
export interface BaseUserPasswordDto extends Pick<User, 'password'> { }

/**
 * Represents the base structure for a User's email.
 * This DTO is used to extract the `email` field from a `User` object.
 * 
 * @type {object}
 */
export interface BaseEmailDto extends Pick<User, 'email'> { }

/**
 * Represents the base structure for a User's last logged-in time.
 * This DTO is used to extract the `lastLoggedIn` field from a `User` object.
 * 
 * @type {object}
 */
export interface BaseUserLastLoggedInDto extends Pick<User, 'lastLoggedIn'> { }

/**
 * Represents the structure for creating a new user in the database.
 * This DTO omits certain fields like `createdAt`, `updatedAt`, `lastLoggedIn`, and user relationships to allow flexible user creation.
 * 
 * @type {object}
 */
export interface BaseCreateUserRequestDto extends Omit<Prisma.UserCreateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> { }

/**
 * Represents the structure for updating an existing user's details, excluding certain fields.
 * This DTO omits fields like timestamps, `lastLoggedIn`, and user relationships during updates.
 * 
 * @type {object}
 */
export interface BaseUserUpdateDto extends Omit<Prisma.UserUpdateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> { }

/**
 * Represents the structure for setting a user's password.
 * This DTO combines the `BaseUserIdDto` and `BaseUserPasswordDto` to update the password of a specific user.
 * 
 * @param {BaseUserIdDto} userId - The ID of the user whose password is being set.
 * @param {BaseUserPasswordDto} password - The new password for the user.
 * 
 * @type {object}
 */
export interface BaseSetUserPasswordRequestDto extends BaseUserIdDto, BaseUserPasswordDto { }

/**
 * Represents the response structure for a single user.
 * The response contains the details of a single user.
 * 
 * @type {object}
 */
export interface SingleUserResponseDto {
  /**
   * The user object containing all the details of the user.
   *
   * @type {User}
   */
  user: User;
}

/**
 * Represents the response structure for a list of users.
 * The response contains an array of user objects.
 * 
 * @type {object}
 */
export interface UsersListResponseDto {
  /**
   * An array of users returned by the API. If no users are found, the array will be empty.
   *
   * @type {User[] | []}
   */
  users: User[];
}

/**
 * Represents the response structure for a single user, including their favorite books.
 * This response returns the user's details along with an array of their favorite books.
 * 
 * @type {object}
 */
export interface SingleUserResponseWithFavoriteBooksDto {
  /**
   * The user object with their favorite books included.
   *
   * @type {PrismaUserWithFavoriteBooks}
   */
  user: PrismaUserWithFavoriteBooks;
}

/**
 * Represents the response structure for a user, including their favorite books.
 * This interface combines the `User` object with an array of favorite books.
 * 
 * @type {object}
 */
export interface PrismaUserWithFavoriteBooksResponse {
  /**
   * The user object along with their list of favorite books.
   *
   * @type {User & { favoriteBooks: Book[] }}
   */
  user: User & { favoriteBooks: Book[] };
}

/**
 * Previous request DTOs for getting users by ID or email were defined but not implemented.
 * The decision was made to leave them out for lightweight code.
 * If required, they can be added by extending `BaseUserIdDto` or `BaseEmailDto`.
 * 
 * @type {object}
 */
// export interface BaseGetUserByIdRequestDto extends BaseUserIdDto {}
// export interface BaseGetUserByEmailRequestDto extends BaseEmailDto {}
