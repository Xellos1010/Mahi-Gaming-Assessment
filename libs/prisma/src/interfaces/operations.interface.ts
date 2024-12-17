/**
 * @fileoverview
 * This file defines the `IOperations` interface, which serves as a blueprint for the operations related to books
 * and users. It groups together query and mutation operations for both entities, ensuring that classes implementing
 * this interface will provide the necessary methods for interacting with book and user data.
 * 
 * The interface declares four properties:
 * - `bookQuery`: Operations related to querying books.
 * - `userQuery`: Operations related to querying users.
 * - `bookMutation`: Operations related to mutating (adding, updating, or deleting) book data.
 * - `userMutation`: Operations related to mutating (adding, updating, or deleting) user data.
 */

import { IBookQueryOperations } from './book/book.query.operations.interface';
import { IUserQueryOperations } from './user/user.query.operations.interface';
import { IBookMutationOperations } from './book/book.mutation.operations.interface';
import { IUserMutationOperations } from './user/user.mutation.operations.interface';

/**
 * @interface IOperations
 * This interface represents the operations available for managing books and users.
 * It groups the query and mutation operations for both entities into properties, ensuring 
 * that any class implementing this interface will provide the necessary methods to handle 
 * book and user data.
 */
export interface IOperations {
  
  /**
   * @type {IBookQueryOperations}
   * The operations related to querying books, such as fetching a list of books, retrieving a specific book by ID, etc.
   */
  bookQuery: IBookQueryOperations;

  /**
   * @type {IUserQueryOperations}
   * The operations related to querying users, such as fetching a list of users, retrieving a specific user by ID, etc.
   */
  userQuery: IUserQueryOperations;

  /**
   * @type {IBookMutationOperations}
   * The operations related to mutating book data, such as adding, updating, or deleting books.
   */
  bookMutation: IBookMutationOperations;

  /**
   * @type {IUserMutationOperations}
   * The operations related to mutating user data, such as adding, updating, or deleting users.
   */
  userMutation: IUserMutationOperations;
}
