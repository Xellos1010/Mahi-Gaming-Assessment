import { BookInterface, UpdateBookInterface } from "./book.interface";

export interface AddBookParams extends BookInterface { }

export interface RemoveBookByIdParams {
    id: number;
}

export interface UpdateBookParams {
    id: number;
    data: UpdateBookInterface;
}

export interface AddUserToFavoriteBookParams {
    userId: number;
    bookId: number;
}

export interface RemoveBookFromFavoritesParams {
    userId: number;
    bookId: number;
}