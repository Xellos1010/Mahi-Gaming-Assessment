/**
 * @fileoverview
 * This file defines custom error classes and a utility function for handling 
 * and logging Prisma-related errors. The errors are designed to be more 
 * descriptive and provide detailed information about the Prisma operation 
 * that failed, making it easier to debug and understand the underlying issues.
 * 
 * It includes the following custom error classes:
 * 1. `PrismaOperationError`: A general error class for Prisma-related operations.
 * 2. `UserNotFoundError`: A subclass of `PrismaOperationError` for when a user 
 *    is not found during a Prisma operation.
 * 3. `DatabaseConnectionError`: A subclass of `PrismaOperationError` for 
 *    database connection failures.
 * 
 * Additionally, a utility function `logPrismaError` is provided to log errors.
 */

export class PrismaOperationError extends Error {
  /** @type {string} */
  public readonly operationType: string;  // Type of the operation that failed

  /** @type {Error} */
  public readonly originalError: Error;   // The original error object that was thrown

  /**
   * @constructor
   * Creates an instance of `PrismaOperationError`, which represents a Prisma
   * operation failure. This error includes the operation type and the original error.
   *
   * @param {string} message - The error message describing the failure.
   * @param {string} operationType - The type of Prisma operation (e.g., "create", "update").
   * @param {Error} originalError - The original error object that triggered this failure.
   */
  constructor(message: string, operationType: string, originalError: Error) {
    super(message);
    this.name = 'PrismaOperationError'; // Custom error name

    // Type and original error attached to the PrismaOperationError
    this.operationType = operationType;
    this.originalError = originalError;

    // Ensures that the stack trace is captured correctly
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PrismaOperationError);
    }
  }

  /**
   * @function getDetailedErrorLog
   * Returns a detailed error log in JSON format, including the operation type,
   * original error message, and stack trace for easier debugging.
   *
   * @returns {string} A JSON string containing detailed error information.
   */
  public getDetailedErrorLog(): string {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      operationType: this.operationType,
      originalErrorMessage: this.originalError.message,
      stack: this.stack,
    }, null, 2);
  }
}

/**
 * @class UserNotFoundError
 * This error class is a specific type of `PrismaOperationError` that is thrown 
 * when a user cannot be found in the database during a Prisma operation. It provides 
 * additional context by including the identifier used to find the user.
 * 
 * @extends {PrismaOperationError}
 */
export class UserNotFoundError extends PrismaOperationError {
  /**
   * @constructor
   * Creates an instance of `UserNotFoundError`, which represents a failure 
   * to find a user by a specific identifier.
   *
   * @param {string} identifier - The identifier (e.g., user ID or email) used 
   * to search for the user.
   * @param {string} operationType - The type of Prisma operation that failed.
   * @param {Error} [originalError] - The original error, if any, to be associated 
   * with this failure.
   */
  constructor(identifier: string, operationType: string, originalError?: Error) {
    super(`User not found with the provided identifier: ${identifier}`, operationType, originalError || new Error('User not found'));
    this.name = 'UserNotFoundError';  // Custom name for this error
  }
}

/**
 * @class DatabaseConnectionError
 * This error class is a specific type of `PrismaOperationError` thrown when 
 * the application fails to connect to the database. It provides a specific error 
 * message related to the database connection issue.
 * 
 * @extends {PrismaOperationError}
 */
export class DatabaseConnectionError extends PrismaOperationError {
  /**
   * @constructor
   * Creates an instance of `DatabaseConnectionError`, which represents a failure 
   * to establish a connection to the database.
   *
   * @param {Error} originalError - The original error that caused the connection failure.
   */
  constructor(originalError: Error) {
    super('Failed to connect to the database', 'Database Connection', originalError);
    this.name = 'DatabaseConnectionError'; // Custom name for this error
  }
}

/**
 * @function logPrismaError
 * Utility function to log detailed Prisma operation errors. This function outputs 
 * the error information in a structured format, making it easier to identify 
 * and troubleshoot database-related issues.
 *
 * @param {PrismaOperationError} error - The error object to be logged.
 * This should be an instance of `PrismaOperationError` or its subclasses.
 */
export function logPrismaError(error: PrismaOperationError): void {
  // In a real-world scenario, a more advanced logging framework would be used.
  console.error(`Prisma Operation Error: ${error.getDetailedErrorLog()}`);
}
