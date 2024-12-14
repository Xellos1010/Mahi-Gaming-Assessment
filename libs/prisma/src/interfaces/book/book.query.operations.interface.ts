// libs/prisma/src/interfaces/book/book.query.operations.interface.ts
import { PrismaGetBookByIdParams } from "../../shared/types/book.types";
import type { Book } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.

export interface IBookQueryOperations {
  getAllBooks(): Promise<PrismaGetAllBooksResponse>;
  getBookById(params: PrismaGetBookByIdParams): Promise<PrismaGetBookByIdResponse>;
}

// Exportable response interfaces for each method
export interface PrismaGetAllBooksResponse {
  books: Book[];
}

export interface PrismaGetBookByIdResponse{
  book: Book;
}
