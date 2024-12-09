import { BookInterface } from "../book/book.interface";
import { UserInterface } from "./user.interface";
import { GetUserByIdParams, GetUserByEmailParams, GetUserFavoriteBooksParams } from "./user.query.parameters.interface";

export interface IPrismaUserQueryOperations {
  getAllUsers(): Promise<UserInterface[]>;
  getUserById(params: GetUserByIdParams): Promise<UserInterface | null>;
  getUserByEmail(params: GetUserByEmailParams): Promise<UserInterface | null>;
  getUserFavoriteBooks(params: GetUserFavoriteBooksParams): Promise<BookInterface[]>;
}