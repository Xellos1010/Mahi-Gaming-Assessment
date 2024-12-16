import { Prisma } from '@prisma/client';
import { Book, User } from "@prisma/client";

export type PrismaDatabaseUpdateUserParams = {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput; //I could enforce the BaseUpdateUserDto but I will leverage Prisma generated client object instead for now
};

export type PrismaDatabaseSetUserPasswordParams = {
  where: Prisma.UserWhereUniqueInput;
  password: string;
};
export type PrismaDatabaseSetLastLoggedInParams = {
  where: Prisma.UserWhereUniqueInput;
  lastLoggedIn: Date;
};
export type PrismaDatabaseSetLastLoggedInNowParams = {
  where: Prisma.UserWhereUniqueInput;
};
export type PrismaDatabaseGetUserParams = {
    where: Prisma.UserWhereUniqueInput
};

//Prisma uses a highly dynamic type system, and the User type doesn't automatically include relations unless explicitly configured with include in the query. TypeScript sees User as the base model and doesn’t account for additional properties like favoriteBooks.
//Explicitly defining a type that includes the relation favoriteBooks to use in my interface
export interface PrismaUserResponseWithFavoriteBooks extends User {
    favoriteBooks: Book[];
  }