// apps/react-mahi-book-store-backend/src/dtos/base.response.dto.ts

import { ApiError } from '@prismaDist/dtos';
import { BaseApiResponseDto } from '@prismaDist/dtos/lib/base-api-response.dto';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

/**
 * @fileoverview
 * This file defines the ApiResponseDto class, which is used to standardize the structure of API responses in the application.
 * It includes properties for success status, data, error information, and an optional message. This DTO is used across the
 * application to send consistent responses to the client for both success and error scenarios.
 */

/**
 * Class representing the structure of a standard API response.
 * This class is used to wrap API responses with a consistent format, including success status, response data, error details, 
 * and an optional message.
 * @template T - The type of the data returned in the response (optional).
 * @implements {BaseApiResponseDto<T>}
 */
export class ApiResponseDto<T> implements BaseApiResponseDto<T> {
  /**
   * Indicates whether the API request was successful.
   * @type {boolean}
   */
  @IsBoolean()
  success: boolean;

  /**
   * The data to be included in the response if the request is successful.
   * This property is optional and will only be included when there is data to return.
   * @type {T | undefined}
   * @optional
   */
  @IsObject()
  @IsOptional()
  data?: T;

  /**
   * The error information to be included in the response if the request failed.
   * This property is optional and will only be included when an error occurs.
   * @type {ApiError | undefined}
   * @optional
   */
  @IsObject()
  @IsOptional()
  error?: ApiError;

  /**
   * An optional message that can be included in the response to provide additional context to the client.
   * @type {string | undefined}
   * @optional
   */
  @IsString()
  @IsOptional()
  message?: string;

  /**
   * Creates an instance of ApiResponseDto.
   * This constructor allows the creation of an API response with success status, optional data, error information, and a message.
   * 
   * @param {boolean} success - The success status of the API request.
   * @param {T} [data] - The data returned in the response, if available. This is optional.
   * @param {ApiError} [error] - The error details, if applicable. This is optional.
   * @param {string} [message] - A message providing additional information about the response. This is optional.
   */
  constructor(success: boolean, data?: T, error?: ApiError, message?: string) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
