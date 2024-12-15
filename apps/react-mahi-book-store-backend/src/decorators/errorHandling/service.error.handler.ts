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

// import { PrismaOperationError, logPrismaError } from "@prismaDist/errors/prisma-errors";
// import { ErrorHandlingOptions, BaseHandleError, BaseErrorHandler } from "./base.error.handler";


// export function HandleServiceError(operation?: string, options?: ErrorHandlingOptions) {
//     return function (
//       target: any,
//       propertyKey: string,
//       descriptor: PropertyDescriptor
//     ) {
//       if (!(target.prototype instanceof BaseErrorHandler) && !target.prototype.handleSpecificError) {
//         target.prototype.handleSpecificError = function (error: Error, operation: string) {
//           if (error instanceof PrismaOperationError) {
//             logPrismaError(error);
//             throw error;
//           }
  
//           const unexpectedError = new PrismaOperationError(
//             `An unexpected error occurred during the ${operation} operation`,
//             operation,
//             error instanceof Error ? error : new Error('Unknown error')
//           );
//           logPrismaError(unexpectedError);
//           throw unexpectedError;
//         };
//       }
  
//       BaseHandleError(options)(target, propertyKey, descriptor);
//     };
//   }
  