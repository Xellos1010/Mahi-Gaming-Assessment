// libs/prisma/src/errors/prisma-errors.ts

export class PrismaOperationError extends Error {
    public readonly operationType: string;
    public readonly originalError: Error;
  
    constructor(message: string, operationType: string, originalError: Error) {
      super(message);
      this.name = 'PrismaOperationError';
      this.operationType = operationType;
      this.originalError = originalError;
  
      // Ensures that the stack trace is captured correctly
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, PrismaOperationError);
      }
    }
  
    // Method to get a detailed error log
    public getDetailedErrorLog(): string {
      return JSON.stringify({
        name: this.name,
        message: this.message,
        operationType: this.operationType,
        originalErrorMessage: this.originalError.message,
        stack: this.stack,
      }, null, 2);
    }
  }
  
  export class UserNotFoundError extends PrismaOperationError {
    constructor(identifier: string, operationType: string, originalError?: Error) {
      super(`User not found with the provided identifier: ${identifier}`, operationType, originalError || new Error('User not found'));
      this.name = 'UserNotFoundError';
    }
  }
  
  export class DatabaseConnectionError extends PrismaOperationError {
    constructor(originalError: Error) {
      super('Failed to connect to the database', 'Database Connection', originalError);
      this.name = 'DatabaseConnectionError';
    }
  }
  
  // Utility function for logging errors
  export function logPrismaError(error: PrismaOperationError): void {
    // In a real-world scenario, you'd use a proper logging framework
    console.error(`Prisma Operation Error: ${error.getDetailedErrorLog()}`);
  }