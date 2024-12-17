/**
 * @fileoverview
 * This file defines the `PrismaDatabaseUpdateBookParams` type, which is used for encapsulating the parameters 
 * required to update a book record in the database using Prisma ORM. It consists of two fields:
 * - `where`: Defines the unique identifier for the book to be updated.
 * - `data`: Contains the updated data for the book, based on the `BaseUpdateBookDto`.
 * 
 * This type ensures that the parameters passed for updating a book are structured correctly and compatible with
 * the Prisma ORM's expectations.
 */

import { Prisma } from '@prisma/client';
import { BaseUpdateBookDto } from '../dtos';

/**
 * @type PrismaDatabaseUpdateBookParams
 * 
 * A custom type that defines the structure of parameters used for updating a book record in the database.
 * It includes two fields:
 * - `where`: A unique identifier for the book, which is used to find the book record to update.
 * - `data`: The data that will be used to update the book, defined using the `BaseUpdateBookDto` type.
 * 
 * @type {Prisma.BookWhereUniqueInput} `where` - This field specifies a unique identifier, typically the `id`, 
 * that allows Prisma to locate the specific book record to be updated.
 * 
 * @type {BaseUpdateBookDto} `data` - This field specifies the updated data for the book, ensuring it follows 
 * the structure of the `BaseUpdateBookDto` for consistency.
 */
export type PrismaDatabaseUpdateBookParams = {
  /**
   * @param {Prisma.BookWhereUniqueInput} where
   * The unique identifier (usually the book's `id`) used to find the specific book record to update.
   * This ensures that only the intended book record is updated.
   */
  where: Prisma.BookWhereUniqueInput; // Specify `id` or other unique fields for locating the book.

  /**
   * @param {BaseUpdateBookDto} data
   * The updated data for the book. This should match the structure of the `BaseUpdateBookDto` type.
   * It represents the new values for the book fields that are to be updated in the database.
   */
  data: BaseUpdateBookDto; // Contains updated data for the book, structured according to Prisma's generated `UpdateInput`.
};
