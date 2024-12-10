// libs/prisma/src/shared/types/user.types.ts
import { Prisma } from '@prisma/client';

export type AddUserParams = Prisma.UserCreateInput;
export type UpdateUserParams = {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
};
export type RemoveUserByIdParams = Prisma.UserWhereUniqueInput;
export type SetUserPasswordParams = {
  where: Prisma.UserWhereUniqueInput;
  password: string;
};
export type SetLastLoggedInParams = {
  where: Prisma.UserWhereUniqueInput;
  lastLoggedIn: Date;
};
export type GetUserParams = {
    where: Prisma.UserWhereUniqueInput
};
export type GetUserByIdParams = Prisma.UserWhereUniqueInput;
export type GetUserByEmailParams = Prisma.UserWhereUniqueInput; // Uses `email`
export type GetUserFavoriteBooksParams = Prisma.UserWhereUniqueInput;
