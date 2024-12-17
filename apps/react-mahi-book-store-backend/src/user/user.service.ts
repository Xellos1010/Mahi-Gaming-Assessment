// apps/react-mahi-book-store-backend/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import {
  CreateUserRequestDto,
  BaseUserDatabaseResponseDto,
  BaseUsersDatabaseResponseDto,
  BaseGetUserByEmailRequestDto,
  UserWithFavoritesDatabaseResponseDto,
  SetUserPasswordRequestDto,
  GetUserByIdRequestDto,
  BaseUserEmailDto
} from '@nestDtos/user.dto';
import { IUserServiceInterface } from '../interfaces/databaseService/user.service.interface';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import { SingleUserResponseWithFavoriteBooksDto } from '@prismaDist/dtos/lib/user.dto';
import { LogAll } from '@shared-decorators';

@Injectable()
export class UserService implements IUserServiceInterface {

  /**
   * @fileoverview
   * This service provides methods to interact with the user data stored in the database.
   * It includes methods for fetching, adding, removing, and updating user information,
   * as well as managing user passwords and favorite books.
   */
  
  /**
   * Retrieves all users from the database.
   * @returns {Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>>} - A promise that resolves to an API response containing all users' data.
   */
  @HandleServiceError()
  @LogAll()
  async getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUsersDatabaseResponseDto>(await prismaOperations.userQuery.getAllUsers() as BaseUsersDatabaseResponseDto);
  }

  /**
   * Retrieves a user by their ID from the database.
   * @param {GetUserByIdRequestDto} params - The request DTO containing the user ID to search for.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the user's data.
   * @throws {NotFoundException} - If no user is found with the given ID.
   */
  @HandleServiceError()
  @LogAll()
  async getUserById({ id }: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    const user = await prismaOperations.userQuery.getUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(user as BaseUserDatabaseResponseDto);
  }

  /**
   * Retrieves a user by their email, including their favorite books.
   * @param {BaseUserEmailDto} params - The request DTO containing the user's email to search for.
   * @returns {Promise<ApiResponseDto<SingleUserResponseWithFavoriteBooksDto>>} - A promise that resolves to an API response containing the user's data along with their favorite books.
   * @throws {NotFoundException} - If no user is found with the given email.
   */
  @HandleServiceError()
  @LogAll()
  async getUserByEmailIncludeFavoriteBooks(params: BaseUserEmailDto): Promise<ApiResponseDto<SingleUserResponseWithFavoriteBooksDto>> {
    const user = await prismaOperations.userQuery.getUserByEmailIncludeFavoriteBooks(params);
    if (!user) {
      throw new NotFoundException(`User with email ${params.email}  not found`);
    }
    return wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(user as SingleUserResponseWithFavoriteBooksDto);
  }

  /**
   * Adds a new user to the database.
   * @param {CreateUserRequestDto} data - The data required to create a new user.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the newly created user's data.
   */
  @HandleServiceError()
  @LogAll()
  async addUser(data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(await prismaOperations.userMutation.addUser(data as CreateUserRequestDto) as BaseUserDatabaseResponseDto);
  }

  /**
   * Removes a user from the database by their ID.
   * @param {GetUserByIdRequestDto} params - The request DTO containing the user ID to delete.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the deleted user's data.
   * @throws {NotFoundException} - If no user is found with the given ID.
   */
  @HandleServiceError()
  @LogAll()
  async removeUserById({ id }: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    const user = await prismaOperations.userMutation.removeUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(user as BaseUserDatabaseResponseDto);
  }

  /**
   * Updates the password for a user in the database.
   * @param {SetUserPasswordRequestDto} params - The request DTO containing the user ID and the new password.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the updated user's data.
   */
  @HandleServiceError()
  @LogAll()
  async setUserPassword({ id, password }: SetUserPasswordRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    const params = {
      where: { id },
      password: password
    };
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(
      await prismaOperations.userMutation.setUserPassword(params) as BaseUserDatabaseResponseDto
    );
  }

  /**
   * Updates the last logged-in time for a user in the database.
   * @param {GetUserByIdRequestDto} params - The request DTO containing the user ID to update.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the updated user's data.
   */
  @HandleServiceError()
  @LogAll()
  async setLastLoggedInNow(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(
      await prismaOperations.userMutation.setLastLoggedIn(params) as BaseUserDatabaseResponseDto
    );
  }

  /**
   * Fetches the favorite books of a user by their ID.
   * @param {GetUserByIdRequestDto} params - The request DTO containing the user ID to search for.
   * @returns {Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>} - A promise that resolves to an API response containing the user's favorite books.
   * @throws {NotFoundException} - If no favorite books are found for the user.
   */
  @HandleServiceError()
  @LogAll()
  async getUserFavoriteBooks(params: GetUserByIdRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    const userWithBooks = await prismaOperations.userQuery.getUserFavoriteBooks(params) as SingleUserResponseWithFavoriteBooksDto;
    console.log('User with Books returned from database: ', userWithBooks);
    if (!userWithBooks || (!Array.isArray(userWithBooks.user.favoriteBooks))) {
      throw new NotFoundException(`No favorite books found for user with ID  ${params.id} `);
    }
    return wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(userWithBooks as UserWithFavoritesDatabaseResponseDto);
  }
}
