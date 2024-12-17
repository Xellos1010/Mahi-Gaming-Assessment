/**
 * @fileoverview
 * This file implements the `IOperations` interface and provides a centralized location for accessing
 * various query and mutation operations related to books and users.
 * The operations are grouped into `bookQuery`, `userQuery`, `bookMutation`, and `userMutation`.
 * This file imports specific query and mutation operation implementations for books and users
 * and makes them available through a single `PrismaOperationsImpl` class.
 */

import { IOperations } from "../interfaces/operations.interface";
import { prismaBookQueryOperations } from "./book/bookQueryOperationsImpl";
import { prismaUserQueryOperations } from "./user/userQueryOperationsImpl";
import { prismaBookMutationOperations } from "./book/bookMutationOperationsImpl";
import { prismaUserMutationOperations } from "./user/userMutationOperationsImpl";

/**
 * @class PrismaOperationsImpl
 * Implements the `IOperations` interface, which acts as a wrapper to manage various operations related to books and users.
 * This class exposes the necessary methods for querying and mutating book and user data by grouping query and mutation
 * operations for both entities.
 */
class PrismaOperationsImpl implements IOperations {
  /**
   * @type {typeof prismaBookQueryOperations}
   * This property holds the query operations related to books, including fetching all books,
   * retrieving a book by ID or other criteria.
   */
  bookQuery = prismaBookQueryOperations;

  /**
   * @type {typeof prismaUserQueryOperations}
   * This property holds the query operations related to users, including fetching all users,
   * retrieving a user by ID, email, or getting their favorite books.
   */
  userQuery = prismaUserQueryOperations;

  /**
   * @type {typeof prismaBookMutationOperations}
   * This property holds the mutation operations related to books, including adding, updating, and removing books.
   */
  bookMutation = prismaBookMutationOperations;

  /**
   * @type {typeof prismaUserMutationOperations}
   * This property holds the mutation operations related to users, including adding, updating, and removing users,
   * as well as setting passwords and login information.
   */
  userMutation = prismaUserMutationOperations;
}

/**
 * @constant prismaOperations
 * An instance of the `PrismaOperationsImpl` class, which provides access to all query and mutation operations
 * for books and users through a single object.
 */
export const prismaOperations = new PrismaOperationsImpl();
