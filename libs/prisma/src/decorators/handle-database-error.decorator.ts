import { PrismaOperationError, logPrismaError } from '../errors/prisma-errors';
import { Prisma } from '@prisma/client';

export function HandleDatabaseError(operation: string) {
  return function (
    target: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        
        // Optional: Add logging for successful operations
        if (result) {
          console.log(`${operation} completed successfully`);
        }
        
        return result;
      } catch (error) {
        const processedError = processError(error, operation);
        logPrismaError(processedError);
        throw processedError;
      }
    };

    return descriptor;
  };
}

function processError(error: unknown, operation: string): PrismaOperationError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return mapPrismaKnownError(error, operation);
  }

  return new PrismaOperationError(
    error instanceof Error 
      ? error.message 
      : 'An unknown error occurred',
    operation,
    error instanceof Error 
      ? error 
      : new Error('Unknown error')
  );
}

function mapPrismaKnownError(
  error: Prisma.PrismaClientKnownRequestError, 
  operation: string
): PrismaOperationError {
  const errorMap: Record<string, string> = {
    'P2002': 'Unique constraint violation',
    'P2025': 'Record not found',
    'P2003': 'Foreign key constraint violation',
  };

  return new PrismaOperationError(
    errorMap[error.code] || `Prisma error: ${error.message}`,
    operation,
    error
  );
}