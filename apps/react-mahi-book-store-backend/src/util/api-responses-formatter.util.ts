import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { ApiError } from "@prismaDist/dtos/lib/interfaces/api-errors";

/**
 * @fileoverview
 * This file contains utility functions to wrap service responses in a consistent format.
 * 
 * The two primary functions provided are:
 * 1. `wrapResponseFail`: Wraps a failed response with error information.
 * 2. `wrapResponseSuccess`: Wraps a successful response with data and an optional message.
 */

/**
 * @function wrapResponseFail
 * 
 * @description
 * This function wraps a service response in a failure format. It allows returning data along with an optional error
 * and a message, all formatted inside an `ApiResponseDto`.
 * 
 * @param {T} data - The data returned by the service. It can be any type that fits the API response.
 * @param {ApiError} [error] - Optional error object containing details about the failure.
 * @param {string} [message] - Optional custom message providing more details about the failure.
 * 
 * @returns {ApiResponseDto<T>} - Returns an `ApiResponseDto` instance with `success: false`, the provided data, the optional error, and message.
 * 
 * @throws {Error} - Throws an error if the wrapping of the response fails.
 * 
 * @type {T} - The type of the data that is returned in the API response, allowing flexibility for different service results.
 */
export function wrapResponseFail<T>(data: T, error?: ApiError, message?: string): ApiResponseDto<T> {
  // Return an ApiResponseDto instance indicating failure with the given data, error, and message
  return new ApiResponseDto(false, data, error, message);
}

/**
 * @function wrapResponseSuccess
 * 
 * @description
 * This function wraps a service response in a success format. It allows returning data along with an optional success
 * message, all formatted inside an `ApiResponseDto`.
 * 
 * @param {T} data - The data returned by the service. This can be any type that fits the API response.
 * @param {string} [message] - Optional custom message providing additional information about the success.
 * 
 * @returns {ApiResponseDto<T>} - Returns an `ApiResponseDto` instance with `success: true`, the provided data, no error, and an optional message.
 * 
 * @throws {Error} - Throws an error if the wrapping of the response fails.
 * 
 * @type {T} - The type of the data that is returned in the API response, allowing flexibility for different service results.
 */
export function wrapResponseSuccess<T>(data: T, message?: string): ApiResponseDto<T> {
    // Return an ApiResponseDto instance indicating success with the provided data and an optional message
    return new ApiResponseDto(true, data, null, message);
}
