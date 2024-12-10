import { prisma } from "../../client";
import { BookInterface } from "../../interfaces/book/book.interface";
import { IPrismaUserQueryOperations } from "../../interfaces/user/user.query.operations.interface";
import { PrismaGetUserByIdParams, PrismaGetUserByEmailParams, PrismaGetUserFavoriteBooksParams } from "../../interfaces/user/user.query.parameters.interface";
import { UserInterface } from "../../interfaces/user/user.interface";

class PrismaUserQueryOperationsImpl implements IPrismaUserQueryOperations {
  async getAllUsers(): Promise<UserInterface[]> {
    return await prisma.user.findMany();
  }

  async getUserById({ id }: PrismaGetUserByIdParams): Promise<UserInterface | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail({ email }: PrismaGetUserByEmailParams): Promise<UserInterface | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getUserFavoriteBooks({ id }: PrismaGetUserFavoriteBooksParams): Promise<BookInterface[]> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { favoriteBooks: true },
    });
    return user?.favoriteBooks || []; // Return an empty array if user is null
  }
}

export const prismaUserQueryOperations = new PrismaUserQueryOperationsImpl();
