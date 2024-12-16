import type { User, Book } from "@prisma/client";



export type PrismaUserResponseWithFavoriteBooks = User & {
  favoriteBooks: Book[];
};
