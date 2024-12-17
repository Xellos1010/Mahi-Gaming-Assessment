import { Logger } from '@nestjs/common';
import { formatError } from '../../util/error-formatter.util';
import { sanitizeInput } from '@shared-decorators';

/**
 * @fileoverview
 * This file contains utilities for centralized error handling and logging in a NestJS application. 
 * It uses decorators to wrap service methods, ensuring consistent error handling, sanitization of sensitive data, 
 * and performance tracking. The `BaseHandleError` function is used to wrap methods and handle errors in a unified manner.
 * 
 * Key Features:
 * - Logs input and execution times.
 * - Handles errors with customizable strategies.
 * - Sanitizes sensitive fields before logging.
 * - Tracks performance if enabled.
 */

/**
 * @interface ErrorHandlingOptions
 * 
 * @description
 * This interface defines the options available for configuring error handling behavior, such as logging input, 
 * measuring performance, and defining sensitive fields that should be sanitized before logging.
 */
export interface ErrorHandlingOptions {
    logInput?: boolean;             // Whether to log the input to the method
    measurePerformance?: boolean;   // Whether to measure and log the execution time of the method
    sensitiveFields?: string[];     // Fields that should be sanitized (e.g., password, accessToken)
}

/**
 * @abstract
 * Base class for error handling. Derived classes must implement the `handleSpecificError` method 
 * to provide specific handling logic for errors in different use cases.
 */
export abstract class BaseErrorHandler {
    /**
     * @method handleSpecificError
     * @description
     * Abstract method that must be implemented by derived classes to handle specific errors.
     * This method is responsible for defining how errors are handled for different operations.
     * 
     * @param {Error} error - The error that occurred during the operation.
     * @param {string} operation - The name of the operation during which the error occurred.
     * 
     * @throws {Error} If the method is not implemented in the derived class.
     */
    abstract handleSpecificError(error: Error, operation: string): any;
}

/**
 * @function BaseHandleError
 * @description
 * This function is a decorator that centralizes and unifies error handling and logging logic for service methods.
 * It logs method input (optionally sanitizing sensitive fields), measures performance (if enabled), 
 * and handles errors in a standardized way. It can be customized using the provided options.
 * 
 * Design Principles:
 * - **Single Responsibility Principle (SRP)**: Manages logging, sanitization, and performance tracking.
 * - **Open/Closed Principle**: Allows extension via the `handleSpecificError` method in derived classes.
 * - **Dependency Inversion**: Depends on the abstraction of error handling, not specific implementations.
 * - **DRY (Don't Repeat Yourself)**: Centralizes common error handling logic to avoid duplication.
 * 
 * @param {ErrorHandlingOptions} [options={}] - Optional configuration for the error handling behavior.
 * Options include:
 *  - `logInput`: If true, logs method input (default: true).
 *  - `measurePerformance`: If true, logs the execution time of the method (default: true).
 *  - `sensitiveFields`: Array of field names that should be sanitized before logging (default: `['password', 'accessToken']`).
 * 
 * @returns {Function} - A method decorator that wraps the original method to apply the error handling logic.
 * The returned decorator function modifies the method by adding logging, sanitization, and error handling behavior.
 * 
 * @throws {Error} - Throws a formatted error if an error occurs during method execution.
 */
export function BaseHandleError(options: ErrorHandlingOptions = {}) {
    // Destructure options with default values
    const {
        logInput = true,
        measurePerformance = true,
        sensitiveFields = ['password', 'accessToken']
    } = options;

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value; // The original method being wrapped
        const logger = new Logger(target.constructor.name); // Logger for logging input and errors

        // Wrap the original method with error handling and logging logic
        descriptor.value = async function (...args: any[]) {
            const methodOperation = `Executing ${propertyKey}`;

            try {
                // Log input arguments if enabled
                if (logInput) {
                    logger.log(`Starting ${methodOperation}`, JSON.stringify({
                        method: propertyKey,
                        args: args.map(arg => sanitizeInput(arg, sensitiveFields))
                    }));
                }

                const startTime = measurePerformance ? Date.now() : 0; // Track performance start time if enabled

                // Execute the original method
                const result = await originalMethod.apply(this, args);

                // Log performance duration if enabled
                if (measurePerformance) {
                    const duration = Date.now() - startTime;
                    logger.log(`Completed ${methodOperation} in ${duration}ms`, {
                        method: propertyKey,
                        resultType: result ? typeof result : 'void',
                        executionTime: duration
                    });
                } else {
                    logger.log(`Completed ${methodOperation}`);
                }

                return result; // Return the result of the original method
            } catch (error) {
                // Log the error if an exception is thrown
                logger.error(`Error in ${propertyKey}: ${error.message}`, {
                    operation: methodOperation,
                    errorName: error.name,
                    errorMessage: error.message,
                    stack: error.stack
                });

                // Handle the error using the derived class method if available
                if (typeof this.handleSpecificError === 'function') {
                    return this.handleSpecificError(error, methodOperation);
                }

                // Use a default error handler if no specific handler exists
                const formattedError = formatError(error, methodOperation);
                logger.error(`Formatted error: ${JSON.stringify(formattedError)}`);

                throw formattedError; // Rethrow the formatted error
            }
        };

        return descriptor; // Return the modified descriptor
    };
}
