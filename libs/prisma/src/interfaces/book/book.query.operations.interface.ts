import { GetBookParams } from "../../shared/types/book.types";
import type { Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.

export interface IBookQueryOperations {
  getAllBooks(): Promise<Book[]>;
  getBook(params: GetBookParams): Promise<Book | null>;
}