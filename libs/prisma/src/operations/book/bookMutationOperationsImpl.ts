
import { prisma } from "../../client";
import { BookInterface } from "../../interfaces/book/book.interface";
import { IBookMutationOperations as IBookMutationOperations } from "../../interfaces/book/book.mutation.operations.interface";
import { PrismaAddBookParams, PrismaRemoveBookByIdParams, PrismaUpdateBookParams, PrismaAddUserToFavoriteBookParams, PrismaRemoveBookFromFavoritesParams } from "../../interfaces/book/book.mutation.parameters.interface";

class BookMutationOperationsImpl implements IBookMutationOperations {
  async addBook(params: PrismaAddBookParams): Promise<BookInterface> {
    return await prisma.book.create({ 
      data : {
        ...params
      }
    });
  }

  async removeBookById({ id: bookId }: PrismaRemoveBookByIdParams): Promise<BookInterface> {
    return await prisma.book.delete({ where: { id: bookId } });
  }

  async updateBook({ id: bookId, data }: PrismaUpdateBookParams): Promise<BookInterface> {
    return await prisma.book.update({ where: { id: bookId }, data });
  }

  async addUserToFavoriteBook({ userId, bookId }: PrismaAddUserToFavoriteBookParams): Promise<BookInterface | null> {
    await prisma.userFavorites.create({ data: { userId, bookId } });
    return await prisma.book.findUnique({ where: { id: bookId } });
  }

  async removeBookFromFavorites({ userId, bookId }: PrismaRemoveBookFromFavoritesParams): Promise<BookInterface | null> {
    await prisma.userFavorites.delete({ where: { userId_bookId: { userId, bookId } } });
    return await prisma.book.findUnique({ where: { id: bookId } });
  }
}

export const prismaBookMutationOperations = new BookMutationOperationsImpl();
