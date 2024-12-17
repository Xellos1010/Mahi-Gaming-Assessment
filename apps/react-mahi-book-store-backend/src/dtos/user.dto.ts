import { User } from '@prisma/client';
import { PrismaUserWithFavoriteBooks } from '@prismaDist/dtos/lib/types/user.types';
import { BaseCreateUserRequestDto, BaseEmailDto, BaseSetUserPasswordRequestDto, BaseUserIdDto, BaseUserLastLoggedInDto, BaseUserPasswordDto, PrismaUserWithFavoriteBooksResponse, SingleUserResponseDto, SingleUserResponseWithFavoriteBooksDto, UsersListResponseDto } from '@prismaDist/dtos/lib/user.dto';
import { IsString, IsDate, IsNumber, IsArray, IsEmail, IsObject, MinLength } from 'class-validator';

/**
 * @fileoverview
 * This file contains DTO (Data Transfer Object) classes related to user management, including:
 * - User creation, password setting, updating the last login date, and retrieving users by email or ID.
 * - DTOs for returning user data with or without associated favorite books.
 * - These DTOs are used for validating and transferring data related to user operations.
 */

/**
 * Base DTO for user ID.
 * This class is used for transferring a user ID in request data.
 */
export class BaseDecoratedUserIdDto implements BaseUserIdDto {
  /**
   * The unique ID of the user.
   * @type {number}
   */
  @IsNumber()
  id: number;

  /**
   * Creates an instance of BaseDecoratedUserIdDto.
   * @param {number} id - The unique ID of the user.
   */
  constructor(id: number) {
    this.id = id;
  }
}

/**
 * Base DTO for user email.
 * This class is used for transferring and validating a user's email address.
 */
export class BaseUserEmailDto implements BaseEmailDto {
  /**
   * The email address of the user.
   * @type {string}
   */
  @IsString()
  @IsEmail()
  email: string;

  /**
   * Creates an instance of BaseUserEmailDto.
   * @param {string} email - The email address of the user.
   */
  constructor(email: string) {
    this.email = email;
  }
}

/**
 * Base DTO for user password.
 * This class is used for transferring and validating the user's password.
 */
export class BasePasswordDto implements BaseUserPasswordDto {
  /**
   * The user's password.
   * @type {string}
   * @minLength 6 - Password must be at least 6 characters long.
   */
  @IsString()
  @MinLength(6)
  password: string;

  /**
   * Creates an instance of BasePasswordDto.
   * @param {string} password - The password to be validated and transferred.
   */
  constructor(password: string) {
    this.password = password;
  }
}

/**
 * DTO for getting a user by email.
 * This class is a specialized version of BaseUserEmailDto used for retrieving a user by email.
 */
export class BaseGetUserByEmailRequestDto extends BaseUserEmailDto {}

/**
 * DTO for getting a user by ID.
 * This class is a specialized version of BaseDecoratedUserIdDto used for retrieving a user by ID.
 */
export class GetUserByIdRequestDto extends BaseDecoratedUserIdDto {}

/**
 * DTO for setting a user's password.
 * This class combines the user's ID with the new password for updating the user's password.
 */
export class SetUserPasswordRequestDto extends BasePasswordDto implements BaseSetUserPasswordRequestDto {
  /**
   * The unique ID of the user whose password is being updated.
   * @type {number}
   */
  id: number;

  /**
   * Creates an instance of SetUserPasswordRequestDto.
   * @param {number} id - The ID of the user whose password is being updated.
   * @param {string} password - The new password for the user.
   */
  constructor(id: number, password: string) {
    super(password);  // Pass the password to the base class constructor
    const userIdDto = new BaseDecoratedUserIdDto(id);
    this.id = userIdDto.id; // Extract the validated `id` from the instance
  }
}

/**
 * DTO for updating the last login date of a user.
 * This class is used to transfer the last login date for a user.
 */
export class UpdateUserLastLoggedInDto implements BaseUserLastLoggedInDto {
  /**
   * The date when the user last logged in.
   * @type {Date}
   */
  @IsDate()
  lastLoggedIn: Date;

  /**
   * Creates an instance of UpdateUserLastLoggedInDto.
   * @param {Date} lastLoggedIn - The new last login date for the user.
   */
  constructor(lastLoggedIn: Date) {
    this.lastLoggedIn = lastLoggedIn;
  }
}

/**
 * DTO for creating a new user.
 * This class is used when a new user is being created, validating user data like name, email, and password.
 */
export class CreateUserRequestDto extends BasePasswordDto implements BaseCreateUserRequestDto {
  /**
   * The name of the user.
   * @type {string}
   */
  @IsString()
  name: string;

  /**
   * The email address of the user.
   * @type {string}
   */
  @IsEmail()
  email: string;

  /**
   * Creates an instance of CreateUserRequestDto.
   * @param {string} name - The name of the new user.
   * @param {string} email - The email address of the new user.
   * @param {string} password - The password of the new user.
   */
  constructor(name: string, email: string, password: string) {
    super(password);
    this.name = name;
    this.email = email;
  }
}

/**
 * DTO for returning a user with their favorite books in the database response.
 * This class is used to return user data along with their favorite books.
 */
export class UserWithFavoritesDatabaseResponseDto implements SingleUserResponseWithFavoriteBooksDto {
  /**
   * The user with their associated favorite books.
   * @type {PrismaUserWithFavoriteBooks}
   */
  @IsObject()
  user: PrismaUserWithFavoriteBooks;

  /**
   * Creates an instance of UserWithFavoritesDatabaseResponseDto.
   * @param {PrismaUserWithFavoriteBooks} user - The user object with their favorite books.
   */
  constructor(user: PrismaUserWithFavoriteBooks) {
    this.user = user;
  }
}

/**
 * DTO for returning a user in the database response.
 * This class is used to return user data without additional associations such as favorite books.
 */
export class BaseUserDatabaseResponseDto implements SingleUserResponseDto {
  /**
   * The user data.
   * @type {User}
   */
  @IsObject()
  user: User;

  /**
   * Creates an instance of BaseUserDatabaseResponseDto.
   * @param {User} user - The user object to include in the response.
   */
  constructor(user: User) {
    this.user = user;
  }
}

/**
 * DTO for returning a list of users in the database response.
 * This class is used to return multiple user objects in a response.
 */
export class BaseUsersDatabaseResponseDto implements UsersListResponseDto {
  /**
   * The list of users.
   * @type {User[]}
   */
  @IsArray()
  users: User[];

  /**
   * Creates an instance of BaseUsersDatabaseResponseDto.
   * @param {User[]} users - The list of users to include in the response.
   */
  constructor(users: User[]) {
    this.users = users;
  }
}
