import { BookInterface } from "./book.interface";
import { PrismaGetBookParams } from "./book.query.parameters.interface";

export interface IPrismaBookQueryOperations {
  getAllBooks(): Promise<BookInterface[]>;
  getBook(params: PrismaGetBookParams): Promise<BookInterface | null>;
}