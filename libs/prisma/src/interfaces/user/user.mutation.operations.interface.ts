import { PrismaAddUserParams, PrismaRemoveUserByIdParams, PrismaUpdateUserParams, PrismaSetUserPasswordParams, PrismaSetLastLoggedInParams, PrismaSetLastLoggedInNowParams } from "../../shared/types/user.types";
import type { User } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.

export interface IUserMutationOperations {
  addUser(params: PrismaAddUserParams): Promise<PrismaAddUserResponse>;
  removeUserById(params: PrismaRemoveUserByIdParams): Promise<PrismaRemoveUserByIdResponse>;
  updateUser(params: PrismaUpdateUserParams): Promise<PrismaUpdateUserResponse>;
  setUserPassword(params: PrismaSetUserPasswordParams): Promise<PrismaSetUserPasswordResponse>;
  setLastLoggedIn(params: PrismaSetLastLoggedInParams): Promise<PrismaSetLastLoggedInResponse>;
  setLastLoggedInNow(params: PrismaSetLastLoggedInNowParams): Promise<PrismaSetLastLoggedInResponse>;
}

// Exportable response interfaces for each method
export interface PrismaAddUserResponse {
  user: User;
}

export interface PrismaRemoveUserByIdResponse {
  user: User;
}

export interface PrismaUpdateUserResponse {
  user: User;
}

export interface PrismaSetUserPasswordResponse {
  user: User;
}

export interface PrismaSetLastLoggedInResponse {
  user: User;
}