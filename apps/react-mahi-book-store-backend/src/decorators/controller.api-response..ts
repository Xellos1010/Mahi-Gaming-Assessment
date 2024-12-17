import { ApiResponseDto } from '@nestDtos/base.api-response.dto';

/**
 * @fileoverview
 * A decorator function that wraps a controller method response in a BaseApiResponseDto.
 * This ensures that all successful responses are consistently formatted, providing a
 * unified structure for success responses across the application.
 * The decorator catches errors and propagates them for further handling (e.g., in error handlers).
 */

/**
 * Wraps the controller method response in a BaseApiResponseDto to enforce consistent response formatting for success cases.
 * @returns {MethodDecorator} A decorator function that wraps the original method's response in ApiResponseDto.
 * @throws {Error} Propagates any errors thrown by the original method for error handling.
 */
export function WrapApiResponse() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        // Replacing the original method with a new function that wraps the response
        descriptor.value = async function (...args: any[]) {
            try {
                // Execute the original method logic and capture the response data
                const data = await originalMethod.apply(this, args);

                // Wrap the result in BaseApiResponseDto and return it
                return new ApiResponseDto(true, data, null);
            } catch (error) {
                // Propagate the error to be handled by other decorators like HandleControllerError
                throw error;
            }
        };

        return descriptor;
    };
}
