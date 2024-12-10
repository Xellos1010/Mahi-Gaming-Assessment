import { AddUserParams, RemoveUserByIdParams, SetLastLoggedInParams, SetUserPasswordParams, UpdateUserParams } from "../../shared/types/user/mutation.types";

export interface PrismaAddUserParams extends AddUserParams {}
export interface PrismaUpdateUserParams extends UpdateUserParams { }
export interface PrismaRemoveUserByIdParams extends RemoveUserByIdParams {}
export interface PrismaSetUserPasswordParams extends SetUserPasswordParams {}
export interface PrismaSetLastLoggedInParams extends SetLastLoggedInParams {}