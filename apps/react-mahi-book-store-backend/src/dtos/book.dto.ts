import { IsString, IsOptional, IsNumber, IsObject, IsArray } from 'class-validator';
import type { Book } from "@prisma/client";
import { BaseBookIdDto, BaseCreateBookDto, BaseUpdateBookDto, BaseUserFavoriteBookRequestDto, BooksListResponseDto, SingleBookResponseDto } from '@prismaDist/dtos/lib/book.dto';

/**
 * @fileoverview
 * This file contains DTO (Data Transfer Object) classes related to book management, including:
 * - Request and response DTOs for book creation, update, and retrieval by ID.
 * - DTOs for managing user favorite books and for returning books in lists.
 * These DTOs are used throughout the application to define and validate data structures for book-related operations.
 */

/**
 * Request DTO to get a book by its ID.
 * This class is used when making a request to retrieve a book by its unique identifier.
 */
export class BaseGetBookByIdRequestDto implements BaseBookIdDto {
  /**
   * The ID of the book to retrieve.
   * @type {number}
   */
  @IsNumber()
  id: number;

  /**
   * Creates an instance of BaseGetBookByIdRequestDto.
   * @param {number} id - The ID of the book to retrieve.
   */
  constructor(id: number) {
    this.id = id;
  }
}

/**
 * DTO for creating a new book.
 * This class is used for book creation requests, validating required fields like title, author, and optional fields like description and image ID.
 */
export class CreateBookDto implements BaseCreateBookDto {
  /**
   * The title of the book.
   * @type {string}
   */
  @IsString()
  title: string;

  /**
   * The author of the book.
   * @type {string}
   */
  @IsString()
  author: string;

  /**
   * The description of the book, optional.
   * @type {string | undefined}
   * @optional
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The image ID associated with the book, optional.
   * @type {string | undefined}
   * @optional
   */
  @IsOptional()
  @IsString()
  imageId?: string;

  /**
   * Creates an instance of CreateBookDto.
   * @param {Object} data - The book data including title, author, and optional description and image ID.
   * @param {string} data.title - The title of the book.
   * @param {string} data.author - The author of the book.
   * @param {string} [data.description] - Optional description of the book.
   * @param {string} [data.imageId] - Optional image ID associated with the book.
   */
  constructor(data: {
    title: string;
    author: string;
    description?: string;
    imageId?: string;
  }) {
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.imageId = data.imageId;
  }
}

/**
 * DTO for updating an existing book.
 * This class is used when updating book information, with optional fields for title, author, description, and image ID.
 */
export class UpdateBookDto implements BaseUpdateBookDto {
  /**
   * The new title for the book, optional.
   * @type {string | undefined}
   * @optional
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * The new author for the book, optional.
   * @type {string | undefined}
   * @optional
   */
  @IsOptional()
  @IsString()
  author?: string;

  /**
   * The new description for the book, optional.
   * @type {string | undefined}
   * @optional
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The new image ID for the book, optional.
   * @type {string | undefined}
   * @optional
   */
  @IsOptional()
  @IsString()
  imageId?: string;

  /**
   * Creates an instance of UpdateBookDto.
   * @param {Object} data - The data used to update the book, including optional title, author, description, and image ID.
   * @param {string} [data.title] - The new title for the book.
   * @param {string} [data.author] - The new author for the book.
   * @param {string} [data.description] - The new description for the book.
   * @param {string} [data.imageId] - The new image ID for the book.
   */
  constructor(data: {
    title?: string;
    author?: string;
    description?: string;
    imageId?: string;
  } = {}) {
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.imageId = data.imageId;
  }
}

/**
 * API request DTO for updating a book.
 * This DTO is used to send a request to update a specific book, including the book's ID and the update data.
 */
export class UpdateBookApiRequestDto extends BaseGetBookByIdRequestDto implements UpdateBookApiRequestDto {
  /**
   * The updated data for the book.
   * @type {UpdateBookDto}
   */
  @IsObject()
  data: UpdateBookDto;

  /**
   * Creates an instance of UpdateBookApiRequestDto.
   * @param {number} id - The ID of the book to update.
   * @param {UpdateBookDto} data - The updated book data.
   */
  constructor(id: number, data: UpdateBookDto) {
    super(id); // Inherit book ID from the parent class
    this.data = new UpdateBookDto(data); // Apply validation to the update data
  }
}

/**
 * DTO for returning a single book in the database response.
 * This class is used to return book data in a response, including validation for the book object.
 */
export class BaseBookDatabaseResponseDto implements SingleBookResponseDto {
  /**
   * The book data returned in the response.
   * @type {Book}
   */
  @IsObject()
  book: Book;

  /**
   * Creates an instance of BaseBookDatabaseResponseDto.
   * @param {Book} book - The book object to include in the response.
   */
  constructor(book: Book) {
    this.book = book;
  }
}

/**
 * DTO for returning a list of books in the database response.
 * This class is used to return multiple books in a response, including validation for the list of books.
 */
export class BaseBooksDatabaseResponseDto implements BooksListResponseDto {
  /**
   * The list of books returned in the response.
   * @type {Book[]}
   */
  @IsArray()
  books: Book[];

  /**
   * Creates an instance of BaseBooksDatabaseResponseDto.
   * @param {Book[]} books - The list of books to include in the response.
   */
  constructor(books: Book[]) {
    this.books = books;
  }
}

/**
 * DTO for handling user favorite book requests.
 * This class is used when associating a user with a favorite book by providing book and user IDs.
 */
export class BaseUserFavoriteBookDto implements BaseUserFavoriteBookRequestDto {
  /**
   * The ID of the book to associate with the user's favorites.
   * @type {number}
   */
  @IsNumber()
  bookId: number;

  /**
   * The ID of the user who is associating the book as a favorite.
   * @type {number}
   */
  @IsNumber()
  userId: number;

  /**
   * Creates an instance of BaseUserFavoriteBookDto.
   * @param {number} bookId - The ID of the book to mark as a favorite.
   * @param {number} userId - The ID of the user marking the book as a favorite.
   */
  constructor(
    bookId: number,
    userId: number
  ) {
    this.bookId = bookId;
    this.userId = userId;
  }
}
