import { prisma } from "../client";
import { IPrismaBookQueryOperations } from "../interfaces/prismaBookQueryOperations.interface";

class PrismaBookQueryOperationsImpl implements IPrismaBookQueryOperations {
  async getAllBooks() {
    return await prisma.book.findMany();
  }

  async getBook(id: number) {
    return await prisma.book.findUnique({
      where: { id },
    });
  }
}

export const prismaBookQueryOperations = new PrismaBookQueryOperationsImpl();
