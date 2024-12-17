/**
 * @fileoverview
 * Provides the interface definition for book query operations.
 * This interface defines methods to retrieve all books and a specific book
 * using appropriate DTOs (Data Transfer Objects).
 */

import { BaseBookIdDto, BooksListResponseDto, SingleBookResponseDto } from "../../dtos/lib/book.dto";

/**
 * Interface representing operations for querying books.
 */
export interface IBookQueryOperations {
  /**
   * Retrieves a list of all books.
   * 
   * @returns {Promise<BooksListResponseDto>} A promise resolving to the list of books.
   */
  getAllBooks(): Promise<BooksListResponseDto>;

  /**
   * Retrieves information about a single book.
   * 
   * @param {BaseBookIdDto} params - The DTO containing the book ID for querying.
   * @returns {Promise<SingleBookResponseDto>} A promise resolving to the details of the requested book.
   * @throws {Error} If the book ID is invalid or the book is not found.
   */
  getBook(params: BaseBookIdDto): Promise<SingleBookResponseDto>;
}
