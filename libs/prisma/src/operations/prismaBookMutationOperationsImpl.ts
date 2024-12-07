import { prisma } from "../client";
import { IPrismaBookMutationOperations } from "../interfaces/prismaBookMutationOperations.interface";

class PrismaBookMutationOperationsImpl implements IPrismaBookMutationOperations {
  async addBook(data: { name: string; description?: string; imageId?: string }) {
    return await prisma.book.create({
      data: {
        name: data.name,
        description: data.description,
        imageId: data.imageId,
      },
    });
  }

  async removeBookById(bookId: number) {
    return await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  }

  async updateBook(bookId: number, data: { name?: string; description?: string; imageId?: string }) {
    return await prisma.book.update({
      where: {
        id: bookId,
      },
      data: data,
    });
  }

  async addUserToFavoriteBook(userId: number, bookId: number) {
    return await prisma.userFavorites.create({
      data: {
        userId: userId,
        bookId: bookId,
      },
    });
  }

  async removeBookFromFavorites(userId: number, bookId: number) {
    return await prisma.userFavorites.delete({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
    });
  }
}

export const prismaBookMutationOperations = new PrismaBookMutationOperationsImpl();
