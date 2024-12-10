import { GetUserByIdParams, GetUserByEmailParams, GetUserFavoriteBooksParams } from '../../shared/types/user.types';
import type { Book, User } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.

export interface IUserQueryOperations {
  getAllUsers(): Promise<User[]>;
  getUserById(params: GetUserByIdParams): Promise<User | null>;
  getUserByEmail(params: GetUserByEmailParams): Promise<User | null>;
  getUserFavoriteBooks(params: GetUserFavoriteBooksParams): Promise<Book[]>;
}