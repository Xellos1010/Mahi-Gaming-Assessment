import { Logger } from '@nestjs/common';

export interface ErrorHandlingOptions {
    // Options to customize error handling behavior
    logInput?: boolean;
    measurePerformance?: boolean;
    sensitiveFields?: string[];
}
/**
* (SRP) Centralizes and unifies error handling and logging logic to sanatize sensitive information and measure performance.
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
            // Determine the operation name
            const methodOperation = `Executing ${propertyKey}`;

            // Sanitize input for logging
            const sanitizeInput = (input: any) => {
                if (!logInput || !input) return input;

                try {
                    // Deep clone to avoid modifying original object
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
                // Log method entry with sanitized input
                if (logInput) {
                    logger.log(`Starting ${methodOperation}`, JSON.stringify({
                        method: propertyKey,
                        args: args.map(arg => sanitizeInput(arg))
                    }));
                }

                // Measure performance if enabled
                const startTime = measurePerformance ? Date.now() : 0;

                // Execute the original method
                const result = await originalMethod.apply(this, args);

                // Log method completion with performance metrics
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
                // Log the error with detailed context
                logger.error(`Error in ${propertyKey}: ${error.message}`, {
                    operation: methodOperation,
                    errorName: error.name,
                    errorMessage: error.message,
                    stack: error.stack
                });

                // Allows for extensibility in derived decorators
                return this.handleSpecificError
                    ? this.handleSpecificError(error, methodOperation)
                    : this.defaultErrorHandler(error, methodOperation);
            }
        };

        return descriptor;
    };
}

// Default error handler (to be overridden by specific implementations)
function defaultErrorHandler(error: Error, operation: string) {
    // Rethrow the original error by default
    throw error;
}