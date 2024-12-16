import {
    Injectable,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common';

/**
 * Decorator for handling errors in methods
 * @param customMessage Optional custom error message
 * @returns Decorated method with error handling
 */
export function HandleErrorDecorator(customMessage?: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const logger = new Logger(target.constructor.name);

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (err) {
                const error = err as Error;
                // Log the full error for internal tracking
                logger.error(`Error in ${propertyKey}:`, error.stack);

                // Determine the appropriate error response
                if (error instanceof HttpException) {
                    // Re-throw HttpExceptions as-is
                    throw error;
                }

            //     // Handle different types of errors
            //     if (error.name === 'ValidationError') {
            //         throw new HttpException({
            //             status: HttpStatus.BAD_REQUEST,
            //             error: customMessage || 'Validation Failed',
            //             details: error.details || error.message
            //         }, HttpStatus.BAD_REQUEST);
            //     }

            //     if (error.code === 'P2002') {
            //         // Prisma unique constraint violation
            //         throw new HttpException({
            //             status: HttpStatus.CONFLICT,
            //             error: customMessage || 'Resource Already Exists',
            //             details: error.message
            //         }, HttpStatus.CONFLICT);
            //     }

            //     // Generic error handling
            //     throw new HttpException({
            //         status: HttpStatus.INTERNAL_SERVER_ERROR,
            //         error: customMessage || 'An unexpected error occurred',
            //         details: error.message
            //     }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };

        return descriptor;
    };
}