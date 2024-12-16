import { ErrorHandlingOptions, BaseHandleError } from "./base.error.handler";

/**
 * (SRP) Wraps the Service method to enforce consistent error formatting for Prisma operations
 * 
 * Design Principles:
 * - Extends BaseErrorHandler to enforce specific error handling
 * - Provides centralized Prisma error management
 * - Maintains consistent error logging and transformation
 */
export function HandleServiceError(options?: ErrorHandlingOptions) {
  return BaseHandleError(options);
}