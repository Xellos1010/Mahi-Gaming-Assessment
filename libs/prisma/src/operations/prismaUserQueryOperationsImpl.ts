import { prisma } from "../client";
import { IPrismaUserQueryOperations } from "../interfaces/prismaUserQueryOperations.interface";

class PrismaUserQueryOperationsImpl implements IPrismaUserQueryOperations {
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserFavoriteBooks(userId: number) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favoriteBooks: true,
      },
    });
  }
}

export const prismaUserQueryOperations = new PrismaUserQueryOperationsImpl();
