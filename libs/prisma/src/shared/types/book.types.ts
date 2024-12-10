// libs/prisma/src/shared/types/book.types.ts
import { Prisma } from '@prisma/client';

export type AddBookParams = Prisma.BookCreateInput;
export type RemoveBookByIdParams = Prisma.BookWhereUniqueInput; // Typically uses `id`
export type UpdateBookParams = {
  where: Prisma.BookWhereUniqueInput; // Specify `id` or unique field
  data: Prisma.BookUpdateInput; // Prisma's generated `UpdateInput`
};
export type AddUserToFavoriteBookParams = {
  userId: number;
  bookId: number;
};
export type RemoveBookFromFavoritesParams = AddUserToFavoriteBookParams; // Same shape
export type GetBookParams = Prisma.BookWhereUniqueInput;
