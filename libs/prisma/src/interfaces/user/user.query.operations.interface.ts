import { PrismaGetUserByIdParams, PrismaGetUserByEmailParams, PrismaGetUserByIdFavoriteBooksParams } from '../../shared/types/user.types';
import type { Book, User } from '@prisma/client'; //We are importing the generated book type and utilizing this for the return.
import { PrismaUserResponseWithFavoriteBooks } from './user.types';

// Response types for each operation 
export interface PrismaGetAllUsersResponse {
  users: User[];
}

export interface PrismaGetUserByIdResponse {
  user: User | null;
}

export interface PrismaGetUserByEmailResponse {
  user: User | null;
}

export interface PrismaGetUserFavoriteBooksResponse {
  books: Book[];
}

export interface PrismaGetUserByEmailIncludeFavoriteBooksResponse {
  user: PrismaUserResponseWithFavoriteBooks | null;
}

// Extending IUserQueryOperations to use the defined response types 
export interface IUserQueryOperations {
  getAllUsers(): Promise<PrismaGetAllUsersResponse>;
  getUserById(params: PrismaGetUserByIdParams): Promise<PrismaGetUserByIdResponse>;
  getUserByEmail(params: PrismaGetUserByEmailParams): Promise<PrismaGetUserByEmailResponse>;
  getUserFavoriteBooks(params: PrismaGetUserByIdFavoriteBooksParams): Promise<PrismaGetUserFavoriteBooksResponse>;
  getUserByEmailIncludeFavoriteBooks(params: PrismaGetUserByEmailParams): Promise<PrismaGetUserByEmailIncludeFavoriteBooksResponse>;
}
