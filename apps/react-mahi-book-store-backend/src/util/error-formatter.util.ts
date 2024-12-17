import { ApiError } from '@prismaDist/dtos/lib/interfaces/api-errors';
import { ApiResponseDto } from '../dtos/base.api-response.dto';
import { wrapResponseFail } from './api-responses-formatter.util';

/**
 * @fileoverview
 * Utility function to format errors into a consistent response structure.
 * This function is intended to be used whenever an error occurs in the application,
 * ensuring that error details are returned in a standard format, including:
 * - The error's name, message, and stack trace
 * - The operation where the error occurred
 * 
 * This allows consumers of the API to receive structured error information, improving 
 * debugging and user feedback consistency.
 */

/**
 * @function formatError
 * 
 * @description
 * This function takes an error and formats it into a consistent response structure,
 * which can be returned to the client. It also includes the name of the operation
 * where the error occurred to help identify which part of the application triggered
 * the error.
 * 
 * @param {Error} error - The error object containing the details of the error that occurred.
 *                          This typically includes properties like name, message, and stack trace.
 * @param {string} operation - The name of the operation or task where the error occurred.
 *                              This helps contextualize the error.
 * 
 * @returns {ApiResponseDto<any>} - A standardized error response containing:
 *   - A null result
 *   - An error object (ApiError) containing the error's name, message, stack trace, and operation details
 *   - A user-friendly message indicating an unexpected error in the specified operation
 * 
 * @throws {Error} - Throws an error if the `wrapResponseFail` function fails, though it's unlikely in this case.
 */
export function formatError(error: Error, operation: string): ApiResponseDto<any> {
    // Call the utility function to format the error into a consistent structure
    return wrapResponseFail(
        null, // The result is null since this is an error response
        {
            name: error.name, // Error name (e.g., TypeError, ReferenceError)
            message: error.message, // The error message describing what went wrong
            stack: error.stack, // Stack trace to help debug the error
            operation, // The operation where the error occurred, to give context
        } as ApiError, // Cast the error details to the ApiError type for consistency
        `An unexpected error occurred during ${operation}.`, // A generic message to be sent to the user
    );
}