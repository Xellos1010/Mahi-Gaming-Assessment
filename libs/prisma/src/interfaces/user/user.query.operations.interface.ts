import { BookInterface } from "../book/book.interface";
import { UserInterface } from "./user.interface";
import { PrismaGetUserByIdParams, PrismaGetUserByEmailParams, PrismaGetUserFavoriteBooksParams } from "./user.query.parameters.interface";

export interface IPrismaUserQueryOperations {
  getAllUsers(): Promise<UserInterface[]>;
  getUserById(params: PrismaGetUserByIdParams): Promise<UserInterface | null>;
  getUserByEmail(params: PrismaGetUserByEmailParams): Promise<UserInterface | null>;
  getUserFavoriteBooks(params: PrismaGetUserFavoriteBooksParams): Promise<BookInterface[]>;
}