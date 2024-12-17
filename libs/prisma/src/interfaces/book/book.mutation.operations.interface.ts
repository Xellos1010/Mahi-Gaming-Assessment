/**
 * @fileoverview
 * Provides an interface for book mutation operations in a library system.
 * The interface defines methods to add, remove, update books, and manage user favorites.
 */

import {
  BaseBookIdDto,
  BaseCreateBookDto,
  BaseUserFavoriteBookRequestDto,
  SingleBookResponseDto,
  SingleBookResponseWithNullDto,
} from "../../dtos/lib/book.dto";
import { PrismaDatabaseUpdateBookParams } from "../../types/book.types";

/**
 * Interface defining the book mutation operations for managing books and user favorites.
 */
export interface IBookMutationOperations {
  /**
   * Adds a new book to the system.
   *
   * @param {BaseCreateBookDto} params - The data transfer object containing the book details.
   * @returns {Promise<SingleBookResponseDto>} - A promise that resolves to the response containing the added book details.
   * @throws {Error} - Throws an error if the book creation fails due to invalid input or database issues.
   */
  addBook(params: BaseCreateBookDto): Promise<SingleBookResponseDto>;

  /**
   * Removes a book from the system by its unique ID.
   *
   * @param {BaseBookIdDto} params - The data transfer object containing the book ID.
   * @returns {Promise<SingleBookResponseDto>} - A promise that resolves to the response containing the removed book details.
   * @throws {Error} - Throws an error if the book ID is invalid or the operation fails.
   */
  removeBookById(params: BaseBookIdDto): Promise<SingleBookResponseDto>;

  /**
   * Updates the details of an existing book in the database.
   *
   * @param {PrismaDatabaseUpdateBookParams} params - The parameters required to update a book in the database.
   * @returns {Promise<SingleBookResponseDto>} - A promise that resolves to the response containing the updated book details.
   * @throws {Error} - Throws an error if the update operation fails due to invalid parameters or database issues.
   */
  updateBook(params: PrismaDatabaseUpdateBookParams): Promise<SingleBookResponseDto>;

  /**
   * Adds a book to the user's list of favorite books.
   *
   * @param {BaseUserFavoriteBookRequestDto} params - The data transfer object containing user and book information.
   * @returns {Promise<SingleBookResponseWithNullDto>} - A promise that resolves to the response with the favorite book details or null.
   * @throws {Error} - Throws an error if the operation fails or the book is already in the favorites list.
   */
  addUserToFavoriteBook(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseWithNullDto>;

  /**
   * Removes a book from the user's list of favorite books.
   *
   * @param {BaseUserFavoriteBookRequestDto} params - The data transfer object containing user and book information.
   * @returns {Promise<SingleBookResponseWithNullDto>} - A promise that resolves to the response with the updated favorite list or null.
   * @throws {Error} - Throws an error if the operation fails or the book is not in the favorites list.
   */
  removeBookFromFavorites(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseWithNullDto>;
}
