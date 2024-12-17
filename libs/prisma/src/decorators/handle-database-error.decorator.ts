/**
 * @fileoverview
 * This file defines a function `HandleDatabaseError` which acts as a decorator
 * to handle and log errors for Prisma database operations. It wraps around
 * database operation methods and catches any errors that may occur, logging
 * the error and throwing a processed error to ensure the application behaves
 * gracefully even when a database error happens.
 * 
 * The function also logs the result of successful operations for tracking purposes.
 */

import { PrismaOperationError, logPrismaError } from '../errors/prisma-errors';
import { Prisma } from '@prisma/client';

/**
 * @function HandleDatabaseError
 * This function is a decorator used to wrap Prisma database operation methods.
 * It handles errors that might occur during database operations, processes them,
 * logs them, and ensures that the application can continue running without crashing.
 *
 * @param {string} operation - The name or description of the operation being performed.
 * This parameter is used to provide context in error logs and processed errors.
 * 
 * @returns {Function} A decorator function that wraps the original method.
 * It enhances the original method by adding error handling and logging functionalities.
 * 
 * @throws {PrismaOperationError} Throws a custom error if the database operation fails,
 * with detailed information about the operation and the original error.
 */
export function HandleDatabaseError(operation: string) {
  return function (
    target: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);

        // Optional: Add logging for successful operations
        if (result) {
          console.log(`${operation} completed successfully`);
        }

        return result;
      } catch (error) {
        const processedError = processError(error, operation);
        logPrismaError(processedError);
        throw processedError; // Re-throw the processed error after logging
      }
    };

    return descriptor;
  };
}

/**
 * @function processError
 * This function processes errors that occur during a Prisma operation. 
 * It checks if the error is a known Prisma error and returns a more detailed 
 * custom error. If the error is unknown, it wraps it into a generic error message.
 *
 * @param {unknown} error - The error that occurred during the Prisma operation.
 * @param {string} operation - The operation in which the error occurred. 
 * Used for error logging and creating more informative error messages.
 * 
 * @returns {PrismaOperationError} A custom `PrismaOperationError` containing 
 * detailed information about the error, including the operation name.
 * 
 * @throws {PrismaOperationError} Throws an error if the error is not of a known type.
 */
function processError(error: unknown, operation: string): PrismaOperationError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return mapPrismaKnownError(error, operation);
  }

  // Return a generic error if the error type is unknown
  return new PrismaOperationError(
    error instanceof Error 
      ? error.message 
      : 'An unknown error occurred',
    operation,
    error instanceof Error 
      ? error 
      : new Error('Unknown error')
  );
}

/**
 * @function mapPrismaKnownError
 * This function maps known Prisma error codes to human-readable error messages.
 * It uses the Prisma error code (e.g., 'P2002', 'P2025') to provide specific 
 * error descriptions that are easier to understand.
 *
 * @param {Prisma.PrismaClientKnownRequestError} error - A known Prisma error.
 * @param {string} operation - The operation name where the error occurred.
 * 
 * @returns {PrismaOperationError} A `PrismaOperationError` with a mapped message 
 * for a known Prisma error.
 * 
 * @throws {PrismaOperationError} Throws a custom error with the mapped message.
 */
function mapPrismaKnownError(
  error: Prisma.PrismaClientKnownRequestError, 
  operation: string
): PrismaOperationError {
  // Error code to readable message mapping
  const errorMap: Record<string, string> = {
    'P2002': 'Unique constraint violation', // Duplicate key error
    'P2025': 'Record not found',           // Record not found error
    'P2003': 'Foreign key constraint violation', // Foreign key error
  };

  // Return a detailed PrismaOperationError
  return new PrismaOperationError(
    errorMap[error.code] || `Prisma error: ${error.message}`,
    operation,
    error
  );
}
