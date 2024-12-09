
import { prisma } from "../../client";
import { BookInterface } from "../../interfaces/book/book.interface";
import { IBookMutationOperations as IBookMutationOperations } from "../../interfaces/book/book.mutation.operations.interface";
import { AddBookParams, RemoveBookByIdParams, UpdateBookParams, AddUserToFavoriteBookParams, RemoveBookFromFavoritesParams } from "../../interfaces/book/book.mutation.parameters.interface";

class BookMutationOperationsImpl implements IBookMutationOperations {
  async addBook(params: AddBookParams): Promise<BookInterface> {
    return await prisma.book.create({ 
      data : {
        ...params
      }
    });
  }

  async removeBookById({ id: bookId }: RemoveBookByIdParams): Promise<BookInterface> {
    return await prisma.book.delete({ where: { id: bookId } });
  }

  async updateBook({ id: bookId, data }: UpdateBookParams): Promise<BookInterface> {
    return await prisma.book.update({ where: { id: bookId }, data });
  }

  async addUserToFavoriteBook({ userId, bookId }: AddUserToFavoriteBookParams): Promise<BookInterface | null> {
    await prisma.userFavorites.create({ data: { userId, bookId } });
    return await prisma.book.findUnique({ where: { id: bookId } });
  }

  async removeBookFromFavorites({ userId, bookId }: RemoveBookFromFavoritesParams): Promise<BookInterface | null> {
    await prisma.userFavorites.delete({ where: { userId_bookId: { userId, bookId } } });
    return await prisma.book.findUnique({ where: { id: bookId } });
  }
}

export const prismaBookMutationOperations = new BookMutationOperationsImpl();
