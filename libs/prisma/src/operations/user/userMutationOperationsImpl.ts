// libs/prisma/src/operations/user/userMutationOperationsImpl.ts
import { prisma } from "../../client";
import { Prisma } from "@prisma/client";
import { 
  IUserMutationOperations, 
  PrismaAddUserResponse, 
  PrismaRemoveUserByIdResponse, 
  PrismaSetLastLoggedInResponse, 
  PrismaUpdateUserResponse 
} from "../../interfaces/user/user.mutation.operations.interface";
import { 
  PrismaAddUserParams, 
  PrismaUpdateUserParams, 
  PrismaRemoveUserByIdParams, 
  PrismaSetUserPasswordParams, 
  PrismaSetLastLoggedInParams, 
  PrismaSetLastLoggedInNowParams
} from "../../shared/types/user.types";
import { 
  PrismaOperationError, 
  UserNotFoundError, 
  DatabaseConnectionError, 
  logPrismaError 
} from "../../errors/prisma-errors";

class PrismaUserMutationOperationsImpl implements IUserMutationOperations {
  async addUser(params: PrismaAddUserParams): Promise<PrismaAddUserResponse> {
    try {
      const user = await prisma.user.create({ data: { ...params } });
      return { user };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation
        if (error.code === 'P2002') {
          const operationError = new PrismaOperationError(
            'A user with this email already exists', 
            'User Creation', 
            error
          );
          logPrismaError(operationError);
          throw operationError;
        }
      }

      // Handle database connection errors
      if (error instanceof Prisma.PrismaClientInitializationError) {
        const connectionError = new DatabaseConnectionError(error);
        logPrismaError(connectionError);
        throw connectionError;
      }

      // Generic Prisma error
      const operationError = new PrismaOperationError(
        'Failed to create user', 
        'User Creation', 
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async updateUser({ where, data }: PrismaUpdateUserParams): Promise<PrismaUpdateUserResponse> {
    try {
      const user = await prisma.user.update({ where, data });
      return { user };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found
        if (error.code === 'P2025') {
          const notFoundError = new UserNotFoundError(
            JSON.stringify(where), 
            'User Update'
          );
          logPrismaError(notFoundError);
          throw notFoundError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to update user', 
        'User Update', 
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async removeUserById({ id }: PrismaRemoveUserByIdParams): Promise<PrismaRemoveUserByIdResponse> {
    try {
      const user = await prisma.user.delete({ where: { id } });
      return { user };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found
        if (error.code === 'P2025') {
          const notFoundError = new UserNotFoundError(
            id.toString(), 
            'User Deletion'
          );
          logPrismaError(notFoundError);
          throw notFoundError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to remove user', 
        'User Deletion', 
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async setUserPassword({ where, password }: PrismaSetUserPasswordParams): Promise<PrismaUpdateUserResponse> {
    try {
      const user = await prisma.user.update({ 
        where, 
        data: { password } 
      });
      return { user };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found
        if (error.code === 'P2025') {
          const notFoundError = new UserNotFoundError(
            JSON.stringify(where), 
            'Set User Password'
          );
          logPrismaError(notFoundError);
          throw notFoundError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to set user password', 
        'Set User Password', 
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }

  async setLastLoggedIn({ where, lastLoggedIn }: PrismaSetLastLoggedInParams): Promise<PrismaUpdateUserResponse> {
    try {
      const user = await prisma.user.update({ 
        where, 
        data: { lastLoggedIn } 
      });
      return { user };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Record not found
        if (error.code === 'P2025') {
          const notFoundError = new UserNotFoundError(
            JSON.stringify(where), 
            'Set Last Logged In'
          );
          logPrismaError(notFoundError);
          throw notFoundError;
        }
      }

      const operationError = new PrismaOperationError(
        'Failed to set last logged in date', 
        'Set Last Logged In', 
        error instanceof Error ? error : new Error('Unknown error')
      );
      logPrismaError(operationError);
      throw operationError;
    }
  }
  
  async setLastLoggedInNow({ where }: PrismaSetLastLoggedInNowParams): Promise<PrismaUpdateUserResponse> {
    try {
      const setLastLoggedInParams: PrismaSetLastLoggedInParams = {where, lastLoggedIn: new Date()};
      return this.setLastLoggedIn(setLastLoggedInParams);
    } catch (error) {
      throw error; //Rethrow the already processed error
    }
  }
}

export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();