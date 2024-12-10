import { BookInterface } from "./book.interface";
import { PrismaAddBookParams, PrismaRemoveBookByIdParams, PrismaUpdateBookParams, PrismaAddUserToFavoriteBookParams, PrismaRemoveBookFromFavoritesParams } from "../../interfaces/book/book.mutation.parameters.interface";

export interface IBookMutationOperations {
  addBook(params : PrismaAddBookParams): Promise<BookInterface>;
  removeBookById(params : PrismaRemoveBookByIdParams): Promise<BookInterface>;
  updateBook( params : PrismaUpdateBookParams): Promise<BookInterface>;
  addUserToFavoriteBook(params : PrismaAddUserToFavoriteBookParams): Promise<BookInterface | null>;
  removeBookFromFavorites(params : PrismaRemoveBookFromFavoritesParams): Promise<BookInterface | null>;
}