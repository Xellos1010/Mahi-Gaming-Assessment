// libs/prisma/src/shared/types/book.types.ts
import { Prisma } from '@prisma/client';

//Shared Base type that future implementations of the param interfaces can modify as needed
type PrismaBookByIdParamsBase = Omit<Prisma.BookWhereUniqueInput, "id"> & { id: number };
type PrismaBookCreateInputBase = Omit<Prisma.BookCreateInput, 'createdAt'> & {
  createdAt?: Date | string; // make createdAt optional as this is handled by the prisma lib function
};

type PrismaBookUpdateOptionalUpdatedTime = {
  where: Prisma.BookWhereUniqueInput;
  data: Prisma.BookUpdateInput;
};
type PrismaAddUserToFavoriteBookParamsBase = {
  userId: number;
  bookId: number;
};
export type PrismaAddBookParams = PrismaBookCreateInputBase;
export type PrismaRemoveBookByIdParams = PrismaBookByIdParamsBase;
export type PrismaUpdateBookParams = {
  where: Prisma.BookWhereUniqueInput; // Specify `id` or unique field
  data: Prisma.BookUpdateInput; // Prisma's generated `UpdateInput`
};


export type PrismaAddUserToFavoriteBookParams = PrismaAddUserToFavoriteBookParamsBase;
export type PrismaRemoveBookFromFavoritesParams = PrismaAddUserToFavoriteBookParams; // Same shape
export type PrismaUserFavoriteBookParams = PrismaAddUserToFavoriteBookParamsBase

// New types with Prisma prefix
export type PrismaGetBookByIdParams = PrismaBookByIdParamsBase;