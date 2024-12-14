import { PrismaOperationError, logPrismaError } from "@prismaDist/errors/prisma-errors";
import { ErrorHandlingOptions, BaseHandleError } from "./base.error.handler";

/**
* (SRP) Wraps the Service method to enforce consistent error formatting for fail cases.
*/
export function HandleServiceError(operation?: string, options?: ErrorHandlingOptions) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Apply base error handler
        BaseHandleError(options)(target, propertyKey, descriptor);

        // Modify the method to include service-specific error handling
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
                return this.handleSpecificError(error, operation || `Executing ${propertyKey}`);
            }
        };

        // Add service-specific error handling method
        descriptor.value.prototype.handleSpecificError = function (error: Error, operation: string) {
            // Prisma-specific error handling
            if (error instanceof PrismaOperationError) {
                logPrismaError(error);
                throw error;
            }

            // Unexpected error handling
            const unexpectedError = new PrismaOperationError(
                `An unexpected error occurred during the ${operation} operation`,
                operation,
                error instanceof Error ? error : new Error('Unknown error')
            );

            logPrismaError(unexpectedError);
            throw unexpectedError;
        };

        return descriptor;
    };
}