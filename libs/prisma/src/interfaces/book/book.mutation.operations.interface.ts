import { BookInterface } from "./book.interface";
import { AddBookParams, RemoveBookByIdParams, UpdateBookParams, AddUserToFavoriteBookParams, RemoveBookFromFavoritesParams } from "../../interfaces/book/book.mutation.parameters.interface";

export interface IBookMutationOperations {
  addBook(params : AddBookParams): Promise<BookInterface>;
  removeBookById(params : RemoveBookByIdParams): Promise<BookInterface>;
  updateBook( params : UpdateBookParams): Promise<BookInterface>;
  addUserToFavoriteBook(params : AddUserToFavoriteBookParams): Promise<BookInterface | null>;
  removeBookFromFavorites(params : RemoveBookFromFavoritesParams): Promise<BookInterface | null>;
}