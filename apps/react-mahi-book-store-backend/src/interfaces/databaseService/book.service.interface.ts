import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { BaseGetBookByIdRequestDto, BaseBookDatabaseResponseDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto, BaseUserFavoriteBookDto, BaseBooksDatabaseResponseDto } from "@nestDtos/book.dto";

/**
 * @fileoverview
 * This file defines the `IBookServiceInterface`, which specifies the operations for managing books and user favorites in the system.
 * The interface outlines methods for adding, updating, removing, and retrieving books, as well as managing user favorite books.
 * 
 * The methods return an `ApiResponseDto` that includes a success flag, potential error messages, and data relevant to the operation.
 */

/**
 * Interface for book-related services.
 * This interface defines the methods for adding, updating, removing, and retrieving books, as well as managing user favorites.
 */
export interface IBookServiceInterface {

  /**
   * Adds a new book to the system.
   * @param {CreateBookDto} data - The data required to create a new book, including title, author, description, and optional image.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response, which includes the success status,
   * the created book's data, or any relevant error messages.
   * 
   * @throws {Error} - If the book creation fails due to invalid data, database issues, or other errors.
   */
  addBook(data: CreateBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;

  /**
   * Updates the details of an existing book.
   * @param {UpdateBookApiRequestDto} params - The data required to update a book, including the book ID and the new details to be updated.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response, which includes the success status,
   * the updated book's data, or any relevant error messages.
   * 
   * @throws {Error} - If the book update fails due to invalid data or other errors.
   */
  updateBook(params: UpdateBookApiRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;

  /**
   * Removes a book from the system by its ID.
   * @param {BaseGetBookByIdRequestDto} params - The ID of the book to be removed.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response, indicating success or failure of the removal process.
   * 
   * @throws {Error} - If the book removal fails, such as when the book ID doesn't exist or due to database issues.
   */
  removeBookById(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;

  /**
   * Retrieves all books in the system.
   * @returns {Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>>} - A promise that resolves to an API response containing a list of all books.
   * 
   * @throws {Error} - If there is an issue retrieving the list of books, such as a database failure.
   */
  getAllBooks(): Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>>;

  /**
   * Retrieves a specific book by its ID.
   * @param {BaseGetBookByIdRequestDto} params - The ID of the book to be retrieved.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response with the requested book's data.
   * 
   * @throws {Error} - If the book retrieval fails due to an invalid ID or other errors.
   */
  getBook(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;

  /**
   * Adds a book to a user's list of favorite books.
   * @param {BaseUserFavoriteBookDto} params - The book ID and user ID to associate the favorite relationship.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response, indicating success or failure.
   * 
   * @throws {Error} - If the operation fails, such as when the book or user does not exist or due to database issues.
   */
  addUserToFavoriteBook(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;

  /**
   * Removes a book from a user's list of favorite books.
   * @param {BaseUserFavoriteBookDto} params - The book ID and user ID to remove the favorite relationship.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to an API response, indicating success or failure.
   * 
   * @throws {Error} - If the operation fails, such as when the book or user is not found in the favorite list or due to database issues.
   */
  removeBookFromFavorites(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
}
