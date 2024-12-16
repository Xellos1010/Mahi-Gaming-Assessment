import { ApiError } from '@prismaDist/dtos/lib/interfaces/api-errors';
import { ApiResponseDto } from '../dtos/base.api-response.dto';
import { wrapResponseFail } from './api-responses-formatter.util';

/**
 * Utility function to format errors into a consistent response structure.
 * @param error - The error object.
 * @param operation - The operation where the error occurred.
 * @returns An instance of BaseApiResponseDto containing error details.
 */
export function formatError(error: Error, operation: string): ApiResponseDto<any> {
    return wrapResponseFail(
        null,
        {
            name: error.name,
            message: error.message,
            stack: error.stack,
            operation,
        } as ApiError,
        `An unexpected error occurred during ${operation}.`,
    );
}
