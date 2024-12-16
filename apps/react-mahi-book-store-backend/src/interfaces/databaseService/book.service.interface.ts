import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { BaseGetBookByIdRequestDto, BaseBookDatabaseResponseDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto, BaseUserFavoriteBookDto, BaseBooksDatabaseResponseDto } from "@nestDtos/book.dto";

export interface IBookServiceInterface {
  addBook(data: CreateBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
  updateBook(params: UpdateBookApiRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
  removeBookById(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
  getAllBooks(): Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>>;
  getBook(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
  addUserToFavoriteBook(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
  removeBookFromFavorites(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>>;
}
