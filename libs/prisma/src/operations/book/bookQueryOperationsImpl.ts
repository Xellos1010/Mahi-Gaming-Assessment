import { prisma } from "../../client";
import type { Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.
import { IBookQueryOperations } from "../../interfaces/book/book.query.operations.interface";
import { GetBookParams } from "../../shared/types/book.types";

class PrismaBookQueryOperationsImpl implements IBookQueryOperations {
  async getAllBooks(): Promise<Book[]> {
    return await prisma.book.findMany();
  }

  async getBook({ id }: GetBookParams): Promise<Book | null> {
    return await prisma.book.findUnique({ where: { id } });
  }
}

export const prismaBookQueryOperations = new PrismaBookQueryOperationsImpl();
