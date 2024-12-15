import { Logger } from '@nestjs/common';
import { formatError } from '../../util/error-formatter.util';

export interface ErrorHandlingOptions {
    // Options to customize error handling behavior
    // operation?: string;
    logInput?: boolean;
    measurePerformance?: boolean;
    sensitiveFields?: string[];
}

export abstract class BaseErrorHandler {
    /**
     * Abstract method that must be implemented by derived classes
     * Forces specific error handling strategy for each use case
     * 
     * @param error The caught error
     * @param operation The operation during which the error occurred
     * @throws {Error} If not implemented in the derived class
     */
    abstract handleSpecificError(error: Error, operation: string): any;
}

/**
 * (SRP) Centralizes and unifies error handling and logging logic to sanitize sensitive information and measure performance.
 * 
 * Design Principles Considerations:
 * - Single Responsibility Principle (SRP): Handles logging, sanitization, and performance tracking
 * - Open/Closed Principle: Allows extension through abstract method
 * - Dependency Inversion: Depends on abstraction (abstract method)
 * - DRY: Centralizes common error handling logic
 */
export function BaseHandleError(options: ErrorHandlingOptions = {}) {
    const {
        logInput = true,
        measurePerformance = true,
        sensitiveFields = ['password', 'token', 'accessToken', 'refreshToken']
    } = options;

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const logger = new Logger(target.constructor.name);

        descriptor.value = async function (...args: any[]) {
            const methodOperation = `Executing ${propertyKey}`;

            const sanitizeInput = (input: any) => {
                if (!logInput || !input) return input;
                try {
                    const sanitized = JSON.parse(JSON.stringify(input));

                    const recursiveSanitize = (obj: any) => {
                        if (typeof obj !== 'object' || obj === null) return obj;

                        for (const key of Object.keys(obj)) {
                            if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
                                obj[key] = '****';
                            } else if (typeof obj[key] === 'object') {
                                recursiveSanitize(obj[key]);
                            }
                        }

                        return obj;
                    };

                    return recursiveSanitize(sanitized);
                } catch {
                    return '[Unable to sanitize]';
                }
            };

            try {
                if (logInput) {
                    logger.log(`Starting ${methodOperation}`, JSON.stringify({
                        method: propertyKey,
                        args: args.map(arg => sanitizeInput(arg))
                    }));
                }

                const startTime = measurePerformance ? Date.now() : 0;

                const result = await originalMethod.apply(this, args);

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

                return result;
            } catch (error) {
                logger.error(`Error in ${propertyKey}: ${error.message}`, {
                    operation: methodOperation,
                    errorName: error.name,
                    errorMessage: error.message,
                    stack: error.stack
                });

                // Use the default error handler if no specific handler exists
                if (typeof this.handleSpecificError === 'function') {
                    return this.handleSpecificError(error, methodOperation);
                }

                const formattedError = formatError(error, methodOperation);
                logger.error(`Formatted error: ${JSON.stringify(formattedError)}`);

                throw formattedError; // Default behavior: rethrow the formatted error
            }
        };

        return descriptor;
    };
}