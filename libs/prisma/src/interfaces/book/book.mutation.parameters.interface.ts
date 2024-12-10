import { AddBookParams, RemoveBookByIdParams, UpdateBookParams, AddUserToFavoriteBookParams, RemoveBookFromFavoritesParams } from "../../shared/types/book/mutations.types";


export interface PrismaAddBookParams extends AddBookParams { }
export interface PrismaRemoveBookByIdParams extends RemoveBookByIdParams { }
export interface PrismaUpdateBookParams extends UpdateBookParams { }
export interface PrismaAddUserToFavoriteBookParams extends AddUserToFavoriteBookParams { }
export interface PrismaRemoveBookFromFavoritesParams extends RemoveBookFromFavoritesParams { }