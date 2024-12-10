import { GetUserByEmailParams, GetUserByIdParams, GetUserFavoriteBooksParams } from "../../shared/types/user/query.types";


export interface PrismaGetUserByIdParams extends GetUserByIdParams { }
export interface PrismaGetUserByEmailParams extends GetUserByEmailParams { }
export interface PrismaGetUserFavoriteBooksParams extends GetUserFavoriteBooksParams {}