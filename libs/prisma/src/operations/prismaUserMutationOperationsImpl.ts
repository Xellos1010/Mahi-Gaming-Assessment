import { prisma } from "../client";
import { IPrismaUserMutationOperations } from "../interfaces/prismaUserMutationOperations.interface";

class PrismaUserMutationOperationsImpl implements IPrismaUserMutationOperations {
  async addUser(data: { name: string; email: string; password: string }) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async removeUserById(userId: number) {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async setUserPassword(userId: number, password: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: password,
      },
    });
  }

  async setLastLoggedIn(userId: number, date: Date) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLoggedIn: date,
      },
    });
  }
}

export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();
