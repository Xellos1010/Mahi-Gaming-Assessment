import { IsString, IsObject, IsEmail } from 'class-validator';
import type { User } from '@prisma/client';
import { BasePasswordDto, UserWithFavoritesDatabaseResponseDto } from './user.dto';
import { BaseCreateUserDatabaseResponseDto, BaseLoginUserRequestDto, BaseLoginUserDatabaseResponseDto, SingleUserResponseWithFavoriteBooksDto } from '@prismaDist/dtos';
import { PrismaUserWithFavoriteBooks } from '@prismaDist/dtos/lib/types/user.types';

/**
 * @fileoverview
 * This file defines data transfer objects (DTOs) for user-related operations such as login, registration, and access token generation.
 * These DTOs are used to validate and structure the request and response data for user operations in the application.
 * It includes access token responses, user creation responses, and login-related responses.
 */

/**
 * Class representing the response structure for access token.
 * @class
 * @implements {BaseAccessTokenResponse}
 */
export class BaseAccessTokenResponse implements BaseAccessTokenResponse {
  /**
   * The access token string for user authentication.
   * @type {string}
   */
  @IsString()
  accessToken: string;

  /**
   * Creates an instance of BaseAccessTokenResponse.
   * @param {string} accessToken - The access token string to be returned to the client.
   */
  constructor( accessToken: string) {
    this.accessToken = accessToken;
  }
}

/**
 * Class representing the response structure when a user is created successfully.
 * Inherits from BaseAccessTokenResponse to include an access token with the response.
 * @class
 * @implements {BaseCreateUserDatabaseResponseDto}
 */
export class CreateUserDatabaseResponseDto extends BaseAccessTokenResponse implements BaseCreateUserDatabaseResponseDto{
  /**
   * The user object created in the database.
   * @type {User}
   */
  @IsObject()
  user: User;

  /**
   * Creates an instance of CreateUserDatabaseResponseDto.
   * @param {User} user - The created user object to include in the response.
   * @param {string} accessToken - The access token generated for the new user.
   */
  constructor( user: User, accessToken: string) {
    super(accessToken); // Call the constructor of the base class (BaseAccessTokenResponse)
    this.user = user;
  }
}

/**
 * Class representing the request structure for user login.
 * @class
 * @implements {BaseLoginUserRequestDto}
 */
export class LoginUserRequestDto extends BasePasswordDto implements BaseLoginUserRequestDto{
  /**
   * The email of the user attempting to log in.
   * @type {string}
   */
  @IsEmail()
  email: string;

  /**
   * Creates an instance of LoginUserRequestDto.
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The password provided by the user for authentication.
   */
  constructor(email: string, password: string) {
    super(password);  // Pass the password to the base class constructor (BasePasswordDto)
    this.email = email;  // Set the email property for login
  }
}

/**
 * Class representing the response structure for user login, including the access token and user information.
 * Inherits from BaseAccessTokenResponse to include an access token with the response.
 * @class
 * @implements {BaseLoginUserDatabaseResponseDto}
 */
export class LoginUserDatabaseResponseDto extends BaseAccessTokenResponse implements BaseLoginUserDatabaseResponseDto {
  /**
   * The user object returned after successful login, including user data and favorite books.
   * @type {PrismaUserWithFavoriteBooks}
   */
  @IsObject()
  user: PrismaUserWithFavoriteBooks;

  /**
   * Creates an instance of LoginUserDatabaseResponseDto.
   * @param {PrismaUserWithFavoriteBooks} user - The user object, including favorite books, returned after successful login.
   * @param {string} accessToken - The access token generated after successful authentication.
   */
  constructor(user: PrismaUserWithFavoriteBooks, accessToken: string) {
    super(accessToken); // Call the constructor of the base class (BaseAccessTokenResponse)
    this.user = user; // Set the user object for the response
  }
}
