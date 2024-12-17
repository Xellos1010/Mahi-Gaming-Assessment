import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { BaseBookDatabaseResponseDto, BaseBooksDatabaseResponseDto, BaseGetBookByIdRequestDto, BaseUserFavoriteBookDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto } from '../dtos/book.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { GetUserByIdRequestDto } from '@nestDtos/user.dto';
import { LogAll } from '@shared-decorators';

/**
 * @fileoverview
 * This file defines the `BookController` which exposes endpoints for managing books, including retrieving, adding,
 * updating, and deleting books. It also allows for managing users' favorite books.
 * The controller uses the `BookService` to perform actions on the books.
 * Each route is decorated with appropriate HTTP methods (GET, POST, PATCH, DELETE) and status codes.
 */
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Retrieves all books from the system.
   * @returns {Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>>} - A promise that resolves to a response containing a list of all books.
   * @throws {Error} - If there is an issue fetching the books from the database.
   */
  @Get()
  @LogAll()
  @HttpCode(HttpStatus.OK) // Responds with HTTP 200 status code
  async getAllBooks(): Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>> {
    return await this.bookService.getAllBooks() as ApiResponseDto<BaseBooksDatabaseResponseDto>;
  }

  /**
   * Retrieves a single book by its ID.
   * @param {BaseGetBookByIdRequestDto} id - The ID of the book to retrieve.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to a response containing the book details.
   * @throws {Error} - If the book with the given ID is not found or there is a database error.
   */
  @Get(':id')
  @LogAll()
  @HttpCode(HttpStatus.OK) // Responds with HTTP 200 status code
  async getBook(
    @Param('id', ParseIntPipe) id: BaseGetBookByIdRequestDto
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.getBook(id) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  /**
   * Adds a new book to the system.
   * @param {CreateBookDto} data - The data for the new book to be added.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to a response containing the added book's details.
   * @throws {Error} - If there is an issue adding the book to the database.
   */
  @Post()
  @LogAll()
  @HttpCode(HttpStatus.CREATED) // Responds with HTTP 201 status code for resource creation
  async addBook(
    @Body() data: CreateBookDto
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.addBook(data) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  /**
   * Updates an existing book's details.
   * @param {BaseGetBookByIdRequestDto} id - The ID of the book to update.
   * @param {UpdateBookDto} updateData - The data to update the book with.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to a response containing the updated book's details.
   * @throws {Error} - If there is an issue updating the book in the database.
   */
  @Patch(':id')
  @LogAll()
  @HttpCode(HttpStatus.OK) // Responds with HTTP 200 status code for successful update
  async updateBook(
    @Param('id', ParseIntPipe) { id }: BaseGetBookByIdRequestDto,
    @Body() updateData: UpdateBookDto,
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.updateBook(new UpdateBookApiRequestDto(id, updateData)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  /**
   * Adds a user to the list of favorite books for a specific book.
   * @param {number} bookId - The ID of the book to mark as favorite.
   * @param {number} userId - The ID of the user to add to the favorites list.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to a response containing the updated book's details.
   * @throws {Error} - If there is an issue adding the user to the favorites.
   */
  @Post(':id/favorites')
  @LogAll()
  @HttpCode(HttpStatus.CREATED) // Responds with HTTP 201 status code for adding to favorites
  async addUserToFavoriteBook(
    @Param('id', ParseIntPipe) bookId: number,
    @Body('userId', ParseIntPipe) userId: number
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.addUserToFavoriteBook(
      new BaseUserFavoriteBookDto(bookId, userId)
    ) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  /**
   * Removes a user from the list of favorite books for a specific book.
   * @param {number} bookId - The ID of the book to remove from the favorites.
   * @param {number} userId - The ID of the user to remove from the favorites list.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to a response containing the updated book's details.
   * @throws {Error} - If there is an issue removing the user from the favorites.
   */
  @Delete(':id/favorites')
  @LogAll()
  @HttpCode(HttpStatus.OK) // Responds with HTTP 200 status code for successful removal from favorites
  async removeBookFromFavorites(
    @Param('id', ParseIntPipe) bookId: number,
    @Body('userId', ParseIntPipe) userId: number
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.removeBookFromFavorites(new BaseUserFavoriteBookDto(bookId, userId)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  /**
   * Removes a book by its ID from the system.
   * @param {number} id - The ID of the book to remove.
   * @returns {Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>} - A promise that resolves to a response confirming the book removal.
   * @throws {Error} - If there is an issue removing the book from the database.
   */
  @Delete(':id')
  @LogAll()
  @HttpCode(HttpStatus.NO_CONTENT) // Responds with HTTP 204 status code for successful deletion (no content)
  async removeBookById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.removeBookById(new BaseGetBookByIdRequestDto(id)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }
}
