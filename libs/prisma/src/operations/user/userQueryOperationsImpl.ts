/**
 * @fileoverview
 * This file contains the implementation of user query operations using Prisma.
 * It defines methods to retrieve user data from the database, such as getting all users,
 * retrieving a user by ID or email, and fetching users' favorite books.
 * Each method is wrapped with a custom `@HandleDatabaseError` decorator for graceful error handling.
 */

import { prisma } from "../../client";
import { IUserQueryOperations } from "../../interfaces/user/user.query.operations.interface";
import {
  SingleUserResponseDto,
  BaseUserIdDto,
  BaseEmailDto,
  PrismaUserWithFavoriteBooksResponse,
  UsersListResponseDto
} from "../../dtos";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";

/**
 * @class PrismaUserQueryOperationsImpl
 * Implements the `IUserQueryOperations` interface, which provides methods for querying user data.
 * These methods include fetching all users, retrieving a user by ID or email, and fetching a user's 
 * favorite books from the database.
 */
export class PrismaUserQueryOperationsImpl implements IUserQueryOperations {

  /**
   * @function getAllUsers
   * Retrieves all users from the database.
   * 
   * @returns {Promise<UsersListResponseDto>} A promise that resolves with a list of all users.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Get All Users')
  async getAllUsers(): Promise<UsersListResponseDto> {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Return the list of users
    return { users };
  }

  /**
   * @function getUserById
   * Retrieves a user from the database by their unique ID.
   * 
   * @param {BaseUserIdDto} params - The ID of the user to be retrieved.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the user details.
   * @throws {Error} If the user is not found, an error is thrown.
   */
  @HandleDatabaseError('Get User By ID')
  async getUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    // Fetch the user by their unique ID
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error(`User not found with ID: ${params.id}`);
    }

    // Return the user details
    return { user };
  }

  /**
   * @function getUserByEmail
   * Retrieves a user from the database by their email address.
   * 
   * @param {BaseEmailDto} params - The email address of the user to be retrieved.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the user details.
   * @throws {Error} If the user is not found, an error is thrown.
   */
  @HandleDatabaseError('Get User By Email')
  async getUserByEmail(params: BaseEmailDto): Promise<SingleUserResponseDto> {
    // Fetch the user by their email address
    const user = await prisma.user.findUnique({
      where: { email: params.email }
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error(`User not found with email: ${params.email}`);
    }

    // Return the user details
    return { user };
  }

  /**
   * @function getUserFavoriteBooks
   * Retrieves a user's favorite books from the database.
   * 
   * @param {BaseUserIdDto} params - The ID of the user whose favorite books are to be retrieved.
   * @returns {Promise<PrismaUserWithFavoriteBooksResponse>} A promise that resolves with the user's favorite books.
   * @throws {Error} If the user is not found, an error is thrown.
   */
  @HandleDatabaseError('Get User Favorite Books')
  async getUserFavoriteBooks(params: BaseUserIdDto): Promise<PrismaUserWithFavoriteBooksResponse> {
    // Fetch the user's favorite books by their ID
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { favoriteBooks: true }, // Only retrieve the favoriteBooks field
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error(`User not found with ID: ${params.id}`);
    }

    // Return the user's favorite books
    return {
      user
    } as PrismaUserWithFavoriteBooksResponse;
  }

  /**
   * @function getUserByEmailIncludeFavoriteBooks
   * Retrieves a user by their email address, including their favorite books.
   * 
   * @param {BaseEmailDto} params - The email address of the user to be retrieved.
   * @returns {Promise<PrismaUserWithFavoriteBooksResponse>} A promise that resolves with the user and their favorite books.
   * @throws {Error} If the user is not found, an error is thrown.
   */
  @HandleDatabaseError('Get User By Email with Favorite Books')
  async getUserByEmailIncludeFavoriteBooks(
    params: BaseEmailDto
  ): Promise<PrismaUserWithFavoriteBooksResponse> {
    // Fetch the user by their email, including their favorite books
    const user = await prisma.user.findUnique({
      where: { email: params.email },
      include: { favoriteBooks: true } // Include the favoriteBooks relation
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error(`User not found with email: ${params.email}`);
    }

    // Return the user with their favorite books
    return { user };
  }
}

// Export an instance of PrismaUserQueryOperationsImpl
export const prismaUserQueryOperations = new PrismaUserQueryOperationsImpl();
