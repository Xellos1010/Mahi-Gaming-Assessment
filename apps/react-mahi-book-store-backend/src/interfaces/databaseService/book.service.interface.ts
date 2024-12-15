import { BaseApiResponseDto } from "@dto/base.response.dto";
import { BaseGetBookByIdRequestDto, BaseBooksDatabaseResponseDto, BaseBookDatabaseResponseDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto, BaseUserFavoriteBookDto } from "@dto/book.dto";

export interface IBookServiceInterface {
  addBook(data: CreateBookDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>>;
  updateBook(params: UpdateBookApiRequestDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>>;
  removeBookById(params: BaseGetBookByIdRequestDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>>;
  getAllBooks(): Promise<BaseApiResponseDto<BaseBooksDatabaseResponseDto>>;
  getBook(params: BaseGetBookByIdRequestDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>>;
  addUserToFavoriteBook(params: BaseUserFavoriteBookDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>>;
  removeBookFromFavorites(params: BaseUserFavoriteBookDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>>;
}
