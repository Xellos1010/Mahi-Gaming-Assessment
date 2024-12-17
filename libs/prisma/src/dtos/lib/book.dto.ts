/**
 * @fileoverview
 * This file defines data transfer objects (DTOs) for handling book-related operations.
 * These DTOs are used for creating, updating, and fetching books, as well as managing user favorites.
 * It also includes the types for individual book responses and lists of books.
 */

import { Prisma } from '@prisma/client';
import type { Book } from "@prisma/client";

/**
 * Represents the base structure for a Book ID.
 * This DTO is used to extract only the `id` field from a `Book` object.
 * 
 * @type {object}
 */
export interface BaseBookIdDto extends Pick<Book, 'id'> {}

/**
 * Represents the structure for creating a new book, excluding certain fields.
 * This DTO is used to send book data when creating a new book in the database.
 * It omits fields such as `createdAt`, `updatedAt`, and relationships like `usersFavorite`.
 * 
 * @type {object}
 */
export interface BaseCreateBookDto extends Omit<Prisma.BookCreateInput, 'createdAt' | 'updatedAt' | 'usersFavorite' | 'UserFavorites'> {}

/**
 * Represents the structure for updating an existing book, excluding certain fields.
 * This DTO is used to send updated book data, omitting fields such as timestamps and user relationships.
 * 
 * @type {object}
 */
export interface BaseUpdateBookDto extends Omit<Prisma.BookUpdateInput, 'createdAt' | 'updatedAt' | 'usersFavorite' | 'UserFavorites'> {}

/**
 * Represents the structure for updating a book along with its ID.
 * This DTO is used when updating a specific book's information by providing its ID and the data to update.
 * 
 * @param {BaseBookIdDto} - The ID of the book to update.
 * @param {BaseUpdateBookDto} data - The data to update for the book, excluding certain fields.
 * 
 * @type {object}
 */
export interface UpdateBookApiRequestDto extends BaseBookIdDto {
  data: BaseUpdateBookDto;
}

/**
 * Represents the response structure for retrieving a single book.
 * The response contains the details of a single book.
 * 
 * @type {object}
 */
export interface SingleBookResponseDto {
  /**
   * The book object containing all the details of the book.
   *
   * @type {Book}
   */
  book: Book;
}

/**
 * Represents the response structure for retrieving a single book, which may be null.
 * The response contains the details of a single book or null if the book is not found.
 * 
 * @type {object}
 */
export interface SingleBookResponseWithNullDto {
  /**
   * The book object, or null if the book was not found.
   *
   * @type {Book | null}
   */
  book: Book | null;
}

/**
 * Represents the response structure for a list of books.
 * The response contains an array of book objects. If no books are found, it will be an empty array.
 * 
 * @type {object}
 */
export interface BooksListResponseDto {
  /**
   * An array of books returned by the API. If no books are available, the array will be empty.
   *
   * @type {Book[] | []}
   */
  books: Book[] | [];
}

/**
 * Represents the request structure for a user to add a book to their favorites.
 * This DTO is used to send a request to associate a user with a favorite book.
 * 
 * @param {number} bookId - The ID of the book to be added to the user's favorites.
 * @param {number} userId - The ID of the user who is adding the book to their favorites.
 * 
 * @type {object}
 */
export interface BaseUserFavoriteBookRequestDto {
  /**
   * The ID of the book being added to the user's favorites.
   *
   * @type {number}
   */
  bookId: number;

  /**
   * The ID of the user who is adding the book to their favorites.
   *
   * @type {number}
   */
  userId: number;
}
