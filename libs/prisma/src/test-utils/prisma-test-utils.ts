import { Mock } from 'vitest';
import { Prisma } from '@prisma/client';

export function createMockPrismaError(
  code: Prisma.PrismaClientKnownRequestError['code'], 
  message: string
): Prisma.PrismaClientKnownRequestError {
  return new Prisma.PrismaClientKnownRequestError(
    message, 
    { code, clientVersion: '4.16.1' }
  );
}

export function setupMockPrismaClient<T>(
  mockMethod: Mock, 
  resolvedValue: T, 
  rejectedError?: Error
) {
  if (rejectedError) {
    mockMethod.mockRejectedValue(rejectedError);
  } else {
    mockMethod.mockResolvedValue(resolvedValue);
  }
}

export function createMockData<T>(base: Partial<T> = {}): T {
  // Implement a generic mock data creator
  // This would need to be customized based on your specific types
  return {} as T;
}