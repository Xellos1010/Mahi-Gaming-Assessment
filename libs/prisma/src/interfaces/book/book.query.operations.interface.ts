import { BookInterface } from "./book.interface";
import { GetBookParams } from "./book.query.parameters.interface";

export interface IPrismaBookQueryOperations {
  getAllBooks(): Promise<BookInterface[]>;
  getBook(params: GetBookParams): Promise<BookInterface | null>;
}