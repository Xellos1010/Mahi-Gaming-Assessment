import { AddBookParams, RemoveBookByIdParams, UpdateBookParams } from "../../shared/types/book.types";
import type { Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.


export interface IBookMutationOperations {
  addBook(params: AddBookParams): Promise<Book>;
  removeBookById(params: RemoveBookByIdParams): Promise<Book | null>;
  updateBook(params: UpdateBookParams): Promise<Book>;
  addUserToFavoriteBook(params: { userId: number; bookId: number }): Promise<Book | null>;
  removeBookFromFavorites(params: { userId: number; bookId: number }): Promise<Book | null>;
}