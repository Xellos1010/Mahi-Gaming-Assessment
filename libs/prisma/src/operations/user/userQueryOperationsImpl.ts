
import { prisma } from "../../client";
import type { User, Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.
import { IUserQueryOperations } from "../../interfaces/user/user.query.operations.interface";
import { GetUserByEmailParams, GetUserByIdParams, GetUserFavoriteBooksParams, GetUserParams } from "../../shared/types/user.types";

class PrismaUserQueryOperationsImpl implements IUserQueryOperations {
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getUser({ where }: GetUserParams): Promise<User | null> {
    return await prisma.user.findUnique({ where });
  }

  async getUserById({ id }: GetUserByIdParams): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  // provided as part of future proofing effort.
  async getUserByEmail({ email }: GetUserByEmailParams): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getUserFavoriteBooks({ id }: GetUserFavoriteBooksParams): Promise<Book[]> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { favoriteBooks: true },
    });
    return user?.favoriteBooks || []; // Return an empty array if user is null
  }
}

export const prismaUserQueryOperations = new PrismaUserQueryOperationsImpl();
