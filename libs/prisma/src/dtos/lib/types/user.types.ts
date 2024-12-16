import type { User, Book } from "@prisma/client";

export type PrismaUserWithFavoriteBooks = User & {
  favoriteBooks: Book[];
};
