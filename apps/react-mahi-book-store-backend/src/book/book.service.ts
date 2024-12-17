import {
  BaseBookDatabaseResponseDto,
  BaseBooksDatabaseResponseDto,
  BaseGetBookByIdRequestDto,
  BaseUserFavoriteBookDto,
  CreateBookDto,
  UpdateBookApiRequestDto
} from '@nestDtos/book.dto';
import { Injectable } from '@nestjs/common';
import { IBookServiceInterface } from '../interfaces/databaseService/book.service.interface';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { prismaOperations } from 'libs/prisma/src/operations/prismaOperationsImpl';
import { PrismaDatabaseUpdateBookParams } from 'libs/prisma/src/types/book.types';
import { LogAll } from '@shared-decorators';

/**
 * @fileoverview
 * This file implements the `BookService` class, which provides methods for managing books in the system.
 * It includes operations for adding, updating, removing, and retrieving books, as well as managing user favorite books.
 * The service uses Prisma ORM for database operations and wraps responses using a utility function.
 * 
 * The class is decorated with error handling and logging mechanisms to ensure robust operations.
 */

/**
 * Service class that implements the `IBookServiceInterface` for managing books and user favorite books.
 * This class includes methods for adding, updating, removing books, and managing favorite books for users.
 */
@Injectable()
export class BookService implements IBookServiceInterface {

  /**
   * Retrieves all books in the system.
   * @returns {Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing a list of all books in the system.
   * 
   * @throws {Error} - If there is an issue retrieving books from the database.
   */
  @LogAll()
  @HandleServiceError()
  async getAllBooks(): Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>> {
    // Fetch all books from the database and wrap the response in a standardized format.
    return wrapResponseSuccess<BaseBooksDatabaseResponseDto>(await prismaOperations.bookQuery.getAllBooks() as BaseBooksDatabaseResponseDto);
  }
  
  /**
   * Retrieves a book by its ID.
   * @param {BaseGetBookByIdRequestDto} params - The ID of the book to be retrieved.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing the requested book's details.
   * 
   * @throws {Error} - If the book with the specified ID is not found or if there is a database error.
   */
  @LogAll()
  @HandleServiceError()
  async getBook(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    // Fetch a single book from the database using the provided ID and wrap the response.
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookQuery.getBook(params) as BaseBookDatabaseResponseDto);
  }

  /**
   * Adds a new book to the system.
   * @param {CreateBookDto} data - The data for the new book, including title, author, and other details.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing the newly added book's details.
   * 
   * @throws {Error} - If there is an issue adding the book to the database, such as missing data or database errors.
   */
  @LogAll()
  @HandleServiceError()
  async addBook(data: CreateBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    // Add a new book to the database and return the response.
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.addBook(data) as BaseBookDatabaseResponseDto);
  }

  /**
   * Updates an existing book in the system.
   * @param {UpdateBookApiRequestDto} params - The ID of the book to be updated along with the data to be modified.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing the updated book's details.
   * 
   * @throws {Error} - If the book update fails due to invalid ID, missing data, or database issues.
   */
  @LogAll()
  @HandleServiceError()
  async updateBook({ id, data }: UpdateBookApiRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    // Update the book in the database with the new data and return the updated book details.
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.updateBook({
      where: { id },
      data,
    } as PrismaDatabaseUpdateBookParams) as BaseBookDatabaseResponseDto);
  }

  /**
   * Removes a book from the system by its ID.
   * @param {BaseGetBookByIdRequestDto} params - The ID of the book to be removed.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response
   * indicating the success or failure of the book removal.
   * 
   * @throws {Error} - If the book removal fails due to invalid ID or database issues.
   */
  @LogAll()
  @HandleServiceError()
  async removeBookById(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    // Remove the book from the database and return a response confirming the removal.
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.removeBookById(params) as BaseBookDatabaseResponseDto);
  }

  /**
   * Adds a user to the list of favorite books for a specific book.
   * @param {BaseUserFavoriteBookDto} params - The user and book details to add the book to the user's favorites.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing the updated book's details after the user has been added to the favorites list.
   * 
   * @throws {Error} - If the process of adding a user to the favorites fails due to database or data issues.
   */
  @LogAll()
  @HandleServiceError()
  async addUserToFavoriteBook(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    // Add the user to the favorite book list and return the updated book details.
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.addUserToFavoriteBook(params) as BaseBookDatabaseResponseDto);
  }

  /**
   * Removes a user from the list of favorite books for a specific book.
   * @param {BaseUserFavoriteBookDto} params - The user and book details to remove the user from the favorites list.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response
   * indicating the updated book's details after the user has been removed from the favorites.
   * 
   * @throws {Error} - If the process of removing the user from the favorites fails due to database or data issues.
   */
  @LogAll()
  @HandleServiceError()
  async removeBookFromFavorites(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    // Remove the user from the favorite book list and return the updated book details.
    console.log(params); // Log the parameters for debugging purposes (could be removed in production).
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.removeBookFromFavorites(params) as BaseBookDatabaseResponseDto);
  }
}
