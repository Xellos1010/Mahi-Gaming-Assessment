/**
 * @fileoverview
 * This file contains the implementation of book mutation operations using Prisma. 
 * It defines methods for adding, removing, and updating books, as well as adding 
 * and removing books from user favorites. These methods use Prisma's ORM to interact 
 * with the database and perform operations such as creating, updating, and deleting books.
 * 
 * The operations are wrapped with a custom error handling decorator `@HandleDatabaseError` 
 * that logs and handles database-related errors.
 */

import { prisma } from "../../client";
import { IBookMutationOperations } from "../../interfaces/book/book.mutation.operations.interface";
import {
  BaseCreateBookDto,
  BaseBookIdDto,
  BaseUserFavoriteBookRequestDto,
  SingleBookResponseDto,
  SingleBookResponseWithNullDto
} from "../../dtos/lib/book.dto";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";
import { PrismaDatabaseUpdateBookParams } from "../../types";

/**
 * @class PrismaBookMutationOperationsImpl
 * Implementation of the `IBookMutationOperations` interface, which includes methods 
 * to perform book-related database operations such as adding, removing, and updating books, 
 * as well as managing user favorite books.
 */
export class PrismaBookMutationOperationsImpl implements IBookMutationOperations {

  /**
   * @function addBook
   * Adds a new book to the database.
   * 
   * @param {BaseCreateBookDto} params - The book data to be added. Excludes 
   * createdAt and other auto-generated fields.
   * @returns {Promise<SingleBookResponseDto>} The added book in the response.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Add Book')
  async addBook(params: BaseCreateBookDto): Promise<SingleBookResponseDto> {
    const book = await prisma.book.create({
      data: {
        ...params,
        createdAt: (new Date()) // Ensure correct date format
      }
    });
    return { book };
  }

  /**
   * @function removeBookById
   * Removes a book from the database by its ID.
   * 
   * @param {BaseBookIdDto} params - The ID of the book to be removed.
   * @returns {Promise<SingleBookResponseDto>} The removed book in the response.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Remove Book')
  async removeBookById(params: BaseBookIdDto): Promise<SingleBookResponseDto> {
    const book = await prisma.book.delete({
      where: { id: params.id }
    });
    return { book };
  }

  /**
   * @function updateBook
   * Updates an existing book in the database with new data.
   * 
   * @param {PrismaDatabaseUpdateBookParams} params - Parameters containing the 
   * book ID and the updated data.
   * @returns {Promise<SingleBookResponseDto>} The updated book in the response.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Update Book')
  async updateBook(params: PrismaDatabaseUpdateBookParams): Promise<SingleBookResponseDto> {
    const book = await prisma.book.update({
      where: params.where,
      data: {
        ...params.data,
        updatedAt: new Date() // Ensure correct date format
      }
    });
    return { book };
  }

  /**
   * @function addUserToFavoriteBook
   * Adds a book to a user's list of favorite books.
   * 
   * @param {BaseUserFavoriteBookRequestDto} params - The user and book ID to be 
   * associated as a favorite.
   * @returns {Promise<SingleBookResponseWithNullDto>} The updated book details 
   * after being added to the user's favorites.
   * @throws {Error} If either the book or user does not exist, an error is thrown.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Add Book to Favorites')
  async addUserToFavoriteBook(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseWithNullDto> {
    // Validate book and user existence before proceeding
    await this.validateBookAndUserExistence(params.userId, params.bookId);

    // Add the book to the user's list of favorite books
    await prisma.user.update({
      where: { id: params.userId },
      data: {
        favoriteBooks: {
          connect: { id: params.bookId } // Connect the existing book to the user
        }
      },
    });

    console.log(`Book ${params.bookId} has been added to User ${params.userId}'s favorites.`);

    // Retrieve the updated book details
    const book = await prisma.book.findUnique({
      where: { id: params.bookId }
    });
    console.log("Book added to favorites:", book);

    return { book };
  }

  /**
   * @function removeBookFromFavorites
   * Removes a book from a user's list of favorite books.
   * 
   * @param {BaseUserFavoriteBookRequestDto} params - The user and book ID to be 
   * removed from the favorites.
   * @returns {Promise<SingleBookResponseWithNullDto>} The updated book details 
   * after being removed from the user's favorites.
   * @throws {Error} If either the book or user does not exist, an error is thrown.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Remove Book from Favorites')
  async removeBookFromFavorites(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseWithNullDto> {
    // Validate book and user existence before proceeding
    await this.validateBookAndUserExistence(params.userId, params.bookId);

    // Remove the book from the user's list of favorite books
    await prisma.user.update({
      where: { id: params.userId },
      data: {
        favoriteBooks: {
          disconnect: { id: params.bookId } // Disconnect the book from the user
        }
      },
    });

    // Retrieve the updated book details
    const book = await prisma.book.findUnique({
      where: { id: params.bookId }
    });

    console.log("Book removed from favorites:", book);

    return { book };
  }

  /**
   * @function validateBookAndUserExistence
   * Validates that both the book and the user exist in the database. 
   * Throws an error if either is not found.
   * 
   * @param {number} userId - The ID of the user to be validated.
   * @param {number} bookId - The ID of the book to be validated.
   * @throws {Error} If the book or user does not exist, an error is thrown.
   */
  private async validateBookAndUserExistence(userId: number, bookId: number): Promise<void> {
    // Validate book existence
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      throw new Error(`Book not found with ID: ${bookId}`);
    }

    // Validate user existence
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }
  }
}

// Create an instance of the class for easy use in other parts of the application
export const prismaBookMutationOperations = new PrismaBookMutationOperationsImpl();
