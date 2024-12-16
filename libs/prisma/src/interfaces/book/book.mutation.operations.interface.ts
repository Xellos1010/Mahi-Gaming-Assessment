import { BaseBookIdDto, BaseCreateBookDto, BaseUserFavoriteBookRequestDto, SingleBookResponseDto } from "../../dtos/lib/book.dto";
import { PrismaDatabaseUpdateBookParams } from "../../types/book.types";

export interface IBookMutationOperations {
  addBook(params: BaseCreateBookDto): Promise<SingleBookResponseDto>;
  removeBookById(params: BaseBookIdDto): Promise<SingleBookResponseDto>;
  updateBook(params: PrismaDatabaseUpdateBookParams): Promise<SingleBookResponseDto>;
  addUserToFavoriteBook(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseDto>;
  removeBookFromFavorites(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseDto>;
}

//These have been removed as the response objects have been reduces to Single or BookList responses. I will leave these here in the future so that if requirements change and more specific responses are required then these can be uncommented and implemented.
// export interface PrismaAddBookResponse extends SingleBookResponseDto {}

// export interface PrismaRemoveBookByIdResponse extends SingleBookResponseDto {}

// export interface PrismaUpdateBookResponse extends SingleBookResponseDto {}

// export interface PrismaAddUserToFavoriteBookResponse extends SingleBookResponseDto {}

// export interface PrismaRemoveBookFromFavoritesResponse extends SingleBookResponseDto {}