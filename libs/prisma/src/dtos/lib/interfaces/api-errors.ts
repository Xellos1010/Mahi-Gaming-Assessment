/**
 * @fileoverview
 * This file defines the `ApiError` interface which extends the built-in `Error` object.
 * The `ApiError` interface is used to represent errors that occur during API operations.
 * It adds an additional `operation` property to capture the specific operation or context
 * in which the error occurred, allowing better error handling and debugging in the application.
 * 
 * The `operation` property is useful to track which part of the application triggered the error.
 */

export interface ApiError extends Error {
    /**
     * Represents the specific operation or context in which the error occurred.
     * This can be used to specify the name of the API operation or the business logic function 
     * that resulted in the error.
     *
     * @type {string}
     */
    operation: string;
  }
  