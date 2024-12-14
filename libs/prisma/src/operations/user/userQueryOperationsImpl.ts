// libs/prisma/src/operations/user/userQueryOperationsImpl.ts
import { prisma } from "../../client";
import { Prisma } from "@prisma/client";
import {
  PrismaGetAllUsersResponse,
  PrismaGetUserByEmailIncludeFavoriteBooksResponse,
  PrismaGetUserByEmailResponse,
  PrismaGetUserByIdResponse,
  PrismaGetUserFavoriteBooksResponse,
  IUserQueryOperations
} from "../../interfaces/user/user.query.operations.interface";
import {
  PrismaGetUserByEmailParams,
  PrismaGetUserByIdParams,
  PrismaGetUserByIdFavoriteBooksParams
} from "../../shared/types/user.types";
import {
  PrismaOperationError,
  UserNotFoundError,
  DatabaseConnectionError,
  logPrismaError
} from "../../errors/prisma-errors";

class PrismaUserQueryOperationsImpl implements IUserQueryOperations {
  async getAllUsers(): Promise<PrismaGetAllUsersResponse> {
    try {
      const users = await prisma.user.findMany();
      return { users };
    } catch (error) {
      // Handle database connection or other errors
      if (error instanceof Prisma.PrismaClientInitializationError) {
        const connectionError = new DatabaseConnectionError(error);
        logPrismaError(connectionError);
        throw connectionError;
      }

      const operationError = new PrismaOperationError(
        'Failed to retrieve users',
        'Get All Users',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async getUserById({ id }: PrismaGetUserByIdParams): Promise<PrismaGetUserByIdResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        const notFoundError = new UserNotFoundError(
          id.toString(),
          'Get User By ID'
        );
        logPrismaError(notFoundError);
        throw notFoundError;
      }

      return { user };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }

      const operationError = new PrismaOperationError(
        'Failed to retrieve user by ID',
        'Get User By ID',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async getUserByEmail({ email }: PrismaGetUserByEmailParams): Promise<PrismaGetUserByEmailResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        const notFoundError = new UserNotFoundError(
          email,
          'Get User By Email'
        );
        logPrismaError(notFoundError);
        throw notFoundError;
      }

      return { user };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }

      const operationError = new PrismaOperationError(
        'Failed to retrieve user by Email',
        'Get User By Email',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async getUserByEmailIncludeFavoriteBooks({ email }: PrismaGetUserByEmailParams): Promise<PrismaGetUserByEmailIncludeFavoriteBooksResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { favoriteBooks: true }
      });

      if (!user) {
        const notFoundError = new UserNotFoundError(
          email,
          'Get User By Email with Favorite Books'
        );
        logPrismaError(notFoundError);
        throw notFoundError;
      }

      return { user };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }

      const operationError = new PrismaOperationError(
        'Failed to retrieve user by email with favorite books',
        'Get User By Email with Favorite Books',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async getUserFavoriteBooks({ id }: PrismaGetUserByIdFavoriteBooksParams): Promise<PrismaGetUserFavoriteBooksResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: { favoriteBooks: true },
      });

      if (!user) {
        const notFoundError = new UserNotFoundError(
          id.toString(),
          'Get User Favorite Books'
        );
        logPrismaError(notFoundError);
        throw notFoundError;
      }

      return {
        books: user.favoriteBooks || []
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }

      const operationError = new PrismaOperationError(
        'Failed to retrieve user favorite books',
        'Get User Favorite Books',
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }
}

export const prismaUserQueryOperations = new PrismaUserQueryOperationsImpl();