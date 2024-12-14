import {
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
    ForbiddenException,
    ConflictException
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorHandlingOptions, BaseHandleError } from './base.error.handler';
import { BaseApiResponseDto } from '@dto/base.response.dto';

/**
* (SRP) Wraps the controller method response in a BaseApiResponseDto to enforce consistent response formatting for fail cases.
*/
export function HandleControllerError(operation?: string, options?: ErrorHandlingOptions) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Apply base error handler
        BaseHandleError(options)(target, propertyKey, descriptor);

        // Modify the method to include controller-specific error handling
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
                const errorResponse = this.handleSpecificError(error, operation || `Executing ${propertyKey}`);
                return new BaseApiResponseDto(false, null, errorResponse.error); // Modified to return a proper response object
            }
        };

        // Add controller-specific error handling method
        descriptor.value.prototype.handleSpecificError = function (error: Error, operation: string) {
            // Detailed error extraction
            const errorDetails = this.extractErrorDetails(error, operation);

            // Specific error type handling
            switch (true) {
                case error instanceof ValidationError:
                    throw new BadRequestException({
                        message: 'Validation failed',
                        validationErrors: [error]
                    });

                case error instanceof BadRequestException:
                    throw new BadRequestException(errorDetails.message);

                case error instanceof UnauthorizedException:
                    throw new UnauthorizedException(errorDetails.message);

                case error instanceof ForbiddenException:
                    throw new ForbiddenException(errorDetails.message);

                case error instanceof ConflictException:
                    throw new ConflictException(errorDetails.message);

                default:
                    throw new InternalServerErrorException({
                        message: `Unexpected error during ${operation}`,
                        details: errorDetails.message
                    });
            }
        };

        // Error details extraction method
        descriptor.value.prototype.extractErrorDetails = function (error: any, operation: string) {
            return {
                message: error.message || `Unexpected error in ${operation}`,
                context: {
                    operation,
                    errorName: error.name,
                    originalMessage: error.message
                }
            };
        };

        return descriptor;
    };
}