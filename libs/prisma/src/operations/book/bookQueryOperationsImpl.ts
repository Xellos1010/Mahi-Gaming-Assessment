import { prisma } from "../../client";
import { BookInterface } from "../../interfaces/book/book.interface";
import { IPrismaBookQueryOperations } from "../../interfaces/book/book.query.operations.interface";
import { GetBookParams } from "../../interfaces/book/book.query.parameters.interface";

class PrismaBookQueryOperationsImpl implements IPrismaBookQueryOperations {
  async getAllBooks(): Promise<BookInterface[]> {
    return await prisma.book.findMany();
  }

  async getBook({ id }: GetBookParams): Promise<BookInterface | null> {
    return await prisma.book.findUnique({ where: { id } });
  }
}

export const prismaBookQueryOperations = new PrismaBookQueryOperationsImpl();
