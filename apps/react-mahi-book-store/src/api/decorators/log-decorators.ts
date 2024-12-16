// Centralized logger configuration
const createLogger = (loggerName: string) => {
  return {
    info: (message: string, meta: any = {}) => {
      console.log(`[${loggerName}] ${message}`, meta);
    },
    error: (message: string, meta: any = {}) => {
      console.error(`[${loggerName}] ${message}`, meta);
    }
  };
};

// Create separate loggers for different concerns
const returnLogger = createLogger('ReturnLogger');
const parameterLogger = createLogger('ParameterLogger');
const errorLogger = createLogger('ErrorLogger');

/**
 * Generates a unique correlation ID for tracking requests
 * @returns Unique correlation identifier
 */
function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Sanitizes input to prevent logging sensitive information
 * @param input - Input to sanitize
 * @returns Sanitized input
 */
function sanitizeInput(input: any): any {
  if (typeof input === 'object' && input !== null) {
    const sanitizedInput = { ...input };

    // Remove sensitive fields
    const sensitiveFields = [
      'password', 'token', 'credentials',
      'secretKey', 'accessToken', 'pin'
    ];

    sensitiveFields.forEach(field => {
      if (field in sanitizedInput) {
        delete sanitizedInput[field];
      }
    });

    // Truncate large objects
    return Object.keys(sanitizedInput).length > 10
      ? { ...sanitizedInput, __truncated: true }
      : sanitizedInput;
  }
  return input;
}

/**
 * Decorator for logging method returns
 * Tracks return values, types, and performance
 */
export function LogReturns(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = String(propertyKey);
      const correlationId = generateCorrelationId();
      const startTime = performance.now(); // Use browser's performance API

      try {
        // Execute the original method
        const result = await originalMethod.apply(this, args);

        // Log return details
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        returnLogger.info(`[Method Return] ${className}.${methodName}`, {
          correlationId,
          className,
          methodName,
          executionTime: `${executionTime.toFixed(2)}ms`,
          resultType: typeof result,
          resultLength: Array.isArray(result) ? result.length : undefined,
          sanitizedResult: sanitizeInput(result)
        });

        return result;
      } catch (error) {
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Decorator for logging method parameters
 * Captures input parameters with sanitization
 */
export function LogParameters(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = String(propertyKey);
      const correlationId = generateCorrelationId();

      // Log parameter details
      parameterLogger.info(`[Method Parameters] ${className}.${methodName}`, {
        correlationId,
        className,
        methodName,
        parameters: args.map(sanitizeInput)
      });

      try {
        // Execute the original method
        return await originalMethod.apply(this, args);
      } catch (error) {
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Decorator for comprehensive error logging
 * Captures detailed error information
 */
export function LogErrors(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = String(propertyKey);
      const correlationId = generateCorrelationId();

      try {
        // Execute the original method
        return await originalMethod.apply(this, args);
      } catch (error) {
        // Comprehensive error logging
        errorLogger.error(`[Method Error] ${className}.${methodName}`, {
          correlationId,
          className,
          methodName,
          errorType: error instanceof Error ? error.name : 'Unknown Error',
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
          parameters: args.map(sanitizeInput)
        });

        // Rethrow the error after logging
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Comprehensive logging decorator combining returns, parameters, and errors
 */
export function LogAll(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    LogReturns()(target, propertyKey, descriptor);
    LogParameters()(target, propertyKey, descriptor);
    LogErrors()(target, propertyKey, descriptor);
    return descriptor;
  };
}
