import { Book, User } from "@prisma/client";

// Define the login response type
export interface LoginResponse {
  message: string;
  user: User;
  accessToken: string;
  favoriteBooks: Book[];
}

// Define the register response type
export interface RegisterResponse {
  message: string;
  user: User;
  accessToken: string;
}