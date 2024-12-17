/**
 * @fileoverview
 * Defines various data transfer objects (DTOs) and types related to user authentication and
 * user management, including response structures for creating and logging in users, as well as
 * access token responses.
 */

import type { User } from '@prisma/client';
import { PrismaUserWithFavoriteBooks } from './types/user.types';
import { BaseApiResponseDto } from './base-api-response.dto';

/**
 * Response structure for returning an access token.
 * This response contains the access token for the user.
 */
export interface BaseAccessTokenResponse {
  /**
   * The access token issued to the user for authentication purposes.
   *
   * @type {string}
   */
  accessToken: string;
}

/**
 * Response structure for creating a new user in the database.
 * This extends the base access token response to include the user details.
 */
export interface BaseCreateUserDatabaseResponseDto extends BaseAccessTokenResponse {
  /**
   * The user object containing the details of the newly created user.
   *
   * @type {User}
   */
  user: User;
}

/**
 * Request data for logging in a user.
 * This contains the user's email and password to authenticate them.
 */
export interface BaseLoginUserRequestDto {
  /**
   * The email of the user attempting to log in.
   * This should be a valid email address associated with an existing user.
   *
   * @type {string}
   */
  email: string;

  /**
   * The password of the user attempting to log in.
   * This should match the password associated with the provided email.
   *
   * @type {string}
   */
  password: string;
}

/**
 * Response structure for logging in a user.
 * This includes the access token for authentication and the user's data,
 * including their favorite books.
 */
export interface BaseLoginUserDatabaseResponseDto extends BaseAccessTokenResponse {
  /**
   * The user object containing the details of the logged-in user, including their favorite books.
   *
   * @type {PrismaUserWithFavoriteBooks}
   */
  user: PrismaUserWithFavoriteBooks;
}

/**
 * API response structure for creating a user.
 * This extends the base API response to include the user creation details.
 */
export interface CreateUserApiResponseDto extends BaseApiResponseDto<BaseCreateUserDatabaseResponseDto> {}

/**
 * API response structure for logging in a user.
 * This extends the base API response to include the login details.
 */
export interface LoginUserApiResponseDto extends BaseApiResponseDto<BaseLoginUserDatabaseResponseDto> {}

/**
 * Structure of the authentication token payload.
 * This contains the user's ID, email, and optional fields for the issued time and expiration time.
 */
export interface AuthTokenPayload {
  /**
   * The user ID, which identifies the user within the system.
   *
   * @type {number}
   */
  sub: number;

  /**
   * The email address of the user.
   *
   * @type {string}
   */
  email: string;

  /**
   * The issued at time of the token (optional).
   * This is a timestamp representing when the token was created.
   *
   * @type {number | undefined}
   */
  iat?: number;

  /**
   * The expiration time of the token (optional).
   * This is a timestamp representing when the token will expire.
   *
   * @type {number | undefined}
   */
  exp?: number;
}
