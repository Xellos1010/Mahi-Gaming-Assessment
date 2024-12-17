import { ErrorHandlingOptions, BaseHandleError } from "./base.error.handler";

/**
 * @fileoverview
 * This file provides a utility function `HandleServiceError` that wraps service methods to enforce consistent error formatting
 * for Prisma operations. It extends error handling from `BaseErrorHandler` to standardize error logging, transformation,
 * and management specifically for Prisma-based operations.
 * 
 * Design Principles:
 * - Adheres to the Single Responsibility Principle (SRP) by focusing solely on error handling for service methods.
 * - Uses `BaseErrorHandler` to ensure consistent error formatting and logging.
 * - Centralizes error management for Prisma operations.
 */

/**
 * @function HandleServiceError
 * 
 * @description
 * This function is used to wrap a Prisma service method to ensure consistent and centralized error handling.
 * It enforces the use of `BaseErrorHandler` to handle errors in a standardized way, allowing for consistent error messages, 
 * logging, and transformation. This utility function provides a mechanism for wrapping Prisma operations, ensuring that 
 * any Prisma-related errors are handled in a predictable manner.
 * 
 * @param {ErrorHandlingOptions} [options] - Optional configuration to customize error handling behavior.
 * The `options` parameter allows the caller to specify error logging preferences or formatting settings.
 * 
 * @returns {Function} - Returns a function that wraps the provided service method, enforcing consistent error handling.
 * The returned function will invoke `BaseHandleError` with the provided options and handle errors as defined by the base error handler.
 * 
 * @throws {Error} - Throws an error if the `BaseErrorHandler` fails to correctly format or log the error.
 */
export function HandleServiceError(options?: ErrorHandlingOptions) {
  // Return the result of BaseHandleError function, passing along the provided options for error handling.
  return BaseHandleError(options);
}
