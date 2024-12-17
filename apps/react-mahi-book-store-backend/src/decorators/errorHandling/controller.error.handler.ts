import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException
} from '@nestjs/common';
import { ErrorHandlingOptions, BaseHandleError } from './base.error.handler';

/**
* @fileoverview
* This file provides the `HandleControllerError` decorator, which is designed to wrap controller methods 
* to handle errors in a consistent way. It ensures that when errors occur, they are formatted appropriately 
* and translated into the correct HTTP exception. 
* The decorator also applies the `BaseHandleError` decorator to manage logging and performance tracking.
* 
* Key Features:
* - **Error Handling**: Customizes error handling for specific HTTP exceptions (BadRequest, Unauthorized, etc.).
* - **Consistency**: Ensures that error responses are consistently formatted across controller methods.
* - **SRP (Single Responsibility Principle)**: Delegates the responsibility of error handling to this decorator, keeping controller methods clean.
*/

/**
* @function HandleControllerError
* @description
* This function is a decorator that wraps a controller method to handle errors in a consistent and centralized way. 
* It checks the type of error that occurs and throws the appropriate NestJS HTTP exception (e.g., `BadRequestException`, 
* `UnauthorizedException`, etc.). If no specific error is matched, a `InternalServerErrorException` is thrown.
* 
* It also applies the `BaseHandleError` decorator to ensure consistent logging and performance tracking for the decorated method.
* 
* @param {ErrorHandlingOptions} [options] - Optional configuration for error handling.
* Options include:
*  - `logInput`: Whether to log the input to the method (default: true).
*  - `measurePerformance`: Whether to measure and log the execution time of the method (default: true).
*  - `sensitiveFields`: Sensitive fields to sanitize before logging (default: `['password', 'accessToken']`).
* 
* @returns {Function} - A method decorator that modifies the behavior of the target controller method. 
* It adds centralized error handling and applies logging and performance tracking.
* 
* @throws {BadRequestException|UnauthorizedException|ForbiddenException|ConflictException|InternalServerErrorException}
* If a known error is thrown in the method, an appropriate NestJS HTTP exception will be thrown (with a message).
*/
export function HandleControllerError(options?: ErrorHandlingOptions) {
  return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
  ) {
      // Override the `handleSpecificError` method for specific error handling logic
      target.prototype.handleSpecificError = function (error: Error, operation: string) {
          // Map the specific error types to their respective HTTP exceptions
          switch (true) {
              case error instanceof BadRequestException:
                  // Throw a BadRequestException with the error message
                  throw new BadRequestException(error.message);
              case error instanceof UnauthorizedException:
                  // Throw an UnauthorizedException with the error message
                  throw new UnauthorizedException(error.message);
              case error instanceof ForbiddenException:
                  // Throw a ForbiddenException with the error message
                  throw new ForbiddenException(error.message);
              case error instanceof ConflictException:
                  // Throw a ConflictException with the error message
                  throw new ConflictException(error.message);
              default:
                  // If no specific error type is matched, throw a general InternalServerErrorException
                  throw new InternalServerErrorException(error.message);
          }
      };

      // Apply the `BaseHandleError` decorator to ensure logging and performance tracking
      BaseHandleError(options)(target, propertyKey, descriptor);
  };
}
