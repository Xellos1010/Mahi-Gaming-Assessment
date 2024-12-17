/**
 * @fileoverview
 * Defines the structure of a generic API response DTO (Data Transfer Object).
 * The response contains a success flag, optional data, error information, and an optional message.
 * This DTO can be used for responses with varying data types by utilizing generics.
 * 
 * @template T The type of data expected in the response's `data` field.
 */

export interface BaseApiResponseDto<T> {
  /**
   * Indicates whether the API request was successful.
   * If true, the response is successful, and the `data` field may contain relevant information.
   * If false, the `error` or `message` field may contain details about the failure.
   *
   * @type {boolean}
   */
  success: boolean;

  /**
   * The data returned by the API in case of a successful request.
   * This field is optional and is of type T, which can be any object or type.
   * 
   * @type {T | undefined}
   */
  data?: T;

  /**
   * The error details in case of an unsuccessful request.
   * This field is optional and contains an `Error` object or a custom error type (e.g., `CustomerError`).
   * The error field uses polymorphism to support various types of errors extending the `Error` class.
   * 
   * @type {Error | undefined}
   */
  error?: Error;

  /**
   * An optional message providing additional context or information about the API response.
   * This can be used to give a brief description of the result or an error message.
   * 
   * @type {string | undefined}
   */
  message?: string;
}
