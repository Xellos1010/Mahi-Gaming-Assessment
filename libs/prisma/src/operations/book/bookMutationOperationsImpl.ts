
import { prisma } from "../../client";
import type { Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.
import { IBookMutationOperations as IBookMutationOperations } from "../../interfaces/book/book.mutation.operations.interface";
import { AddBookParams, RemoveBookByIdParams, UpdateBookParams, AddUserToFavoriteBookParams, RemoveBookFromFavoritesParams } from "../../shared/types/book.types";

class BookMutationOperationsImpl implements IBookMutationOperations {
  async addBook(params: AddBookParams): Promise<Book> {
    return await prisma.book.create({ 
      data : {
        ...params
      }
    });
  }

  async removeBookById({ id: bookId }: RemoveBookByIdParams): Promise<Book> {
    return await prisma.book.delete({ where: { id: bookId } });
  }

  async updateBook({ where, data }: UpdateBookParams): Promise<Book> {
    return await prisma.book.update({ where, data });
  }

  async addUserToFavoriteBook({ userId, bookId }: AddUserToFavoriteBookParams): Promise<Book | null> {
    await prisma.userFavorites.create({ data: { userId, bookId } });
    return await prisma.book.findUnique({ where: { id: bookId } });
  }

  async removeBookFromFavorites({ userId, bookId }: RemoveBookFromFavoritesParams): Promise<Book | null> {
    await prisma.userFavorites.delete({ where: { userId_bookId: { userId, bookId } } });
    return await prisma.book.findUnique({ where: { id: bookId } });
  }
}

export const prismaBookMutationOperations = new BookMutationOperationsImpl();
