import { PrismaAddBookParams, PrismaRemoveBookByIdParams, PrismaUpdateBookParams, PrismaUserFavoriteBookParams } from "../../shared/types/book.types";
import type { Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.


export interface IBookMutationOperations {
  addBook(params: PrismaAddBookParams): Promise<PrismaAddBookResponse>;
  removeBookById(params: PrismaRemoveBookByIdParams): Promise<PrismaRemoveBookByIdResponse>;
  updateBook(params: PrismaUpdateBookParams): Promise<PrismaUpdateBookResponse>;
  addUserToFavoriteBook(params: PrismaUserFavoriteBookParams): Promise<PrismaAddUserToFavoriteBookResponse>;
  removeBookFromFavorites(params: PrismaUserFavoriteBookParams): Promise<PrismaRemoveBookFromFavoritesResponse>;
}

export interface PrismaAddBookResponse {
  book: Book;
}

export interface PrismaRemoveBookByIdResponse {
  book?: Book | null;
}

export interface PrismaUpdateBookResponse {
  book: Book;
}

export interface PrismaAddUserToFavoriteBookResponse {
  book?: Book | null;
}

export interface PrismaRemoveBookFromFavoritesResponse {
  book?: Book | null;
}