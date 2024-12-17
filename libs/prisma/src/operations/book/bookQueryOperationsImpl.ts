/**
 * @fileoverview
 * This file contains the implementation of book query operations using Prisma. 
 * It defines methods for fetching books from the database, such as retrieving all books
 * and fetching a specific book by its ID. These methods utilize Prisma's ORM to query the database.
 * 
 * The operations are wrapped with a custom error handling decorator `@HandleDatabaseError` 
 * to manage database-related errors.
 */

import { prisma } from "../../client";
import { IBookQueryOperations } from "../../interfaces/book/book.query.operations.interface";
import { 
  BooksListResponseDto, 
  SingleBookResponseDto, 
  BaseBookIdDto 
} from "../../dtos/lib/book.dto";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";

/**
 * @class PrismaBookQueryOperationsImpl
 * Implementation of the `IBookQueryOperations` interface, which includes methods 
 * to perform book query operations such as retrieving all books or fetching a specific book 
 * by its ID from the database.
 */
export class PrismaBookQueryOperationsImpl implements IBookQueryOperations {

  /**
   * @function getAllBooks
   * Retrieves a list of all books from the database.
   * 
   * @returns {Promise<BooksListResponseDto>} A promise that resolves with an object 
   * containing a list of all books.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Get All Books')
  async getAllBooks(): Promise<BooksListResponseDto> {
    // Query the database to fetch all books
    const books = await prisma.book.findMany();
    
    // Return the list of books
    return { books };
  }

  /**
   * @function getBook
   * Retrieves a single book by its ID from the database.
   * 
   * @param {BaseBookIdDto} params - An object containing the ID of the book to be retrieved.
   * @returns {Promise<SingleBookResponseDto>} A promise that resolves with the details of the book.
   * @throws {Error} If the book is not found in the database, an error is thrown.
   * @throws {PrismaOperationError} If any database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Get Book')
  async getBook(params: BaseBookIdDto): Promise<SingleBookResponseDto> {
    // Query the database to fetch the book by ID
    const book = await prisma.book.findUnique({ 
      where: { id: params.id } 
    });

    // If the book is not found, throw an error
    if (!book) {
      throw new Error(`Book not found with ID: ${params.id}`);
    }

    // Return the found book
    return { book };
  }
}

// Create an instance of the class for easy use in other parts of the application
export const prismaBookQueryOperations = new PrismaBookQueryOperationsImpl();
