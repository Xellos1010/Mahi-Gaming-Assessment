// libs/prisma/src/shared/types/user.types.ts
import { Prisma } from '@prisma/client';

export type PrismaAddUserParams = Prisma.UserCreateInput;
export type PrismaUpdateUserParams = {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
};

//Shared Base type that future implementations of the param interfaces can modify as needed
type PrismaUserByIdParamsBase = Omit<Prisma.UserWhereUniqueInput, "id"> & { id: number };

// Modified the params to require id
export type PrismaRemoveUserByIdParams = PrismaUserByIdParamsBase;

export type PrismaSetUserPasswordParams = {
  where: Prisma.UserWhereUniqueInput;
  password: string;
};
export type PrismaSetLastLoggedInParams = {
  where: Prisma.UserWhereUniqueInput;
  lastLoggedIn: Date;
};
export type PrismaGetUserParams = {
    where: Prisma.UserWhereUniqueInput
};
export type PrismaGetUserByIdParams = PrismaUserByIdParamsBase;
export type PrismaGetUserByEmailParams = Omit<Prisma.UserWhereUniqueInput, "email"> & { email: string };
export type PrismaGetUserByIdFavoriteBooksParams = PrismaUserByIdParamsBase;
