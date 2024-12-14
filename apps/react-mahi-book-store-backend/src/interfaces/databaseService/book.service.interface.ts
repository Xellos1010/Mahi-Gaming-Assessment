import { BaseGetBookByIdRequestDto, BaseBooksDatabaseResponseDto, BaseBookDatabaseResponseDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto, BaseUserFavoriteBookDto } from "@dto/book.dto";

export interface IBookServiceInterface {
  addBook(data: CreateBookDto): Promise<BaseBookDatabaseResponseDto>;
  updateBook(params: UpdateBookApiRequestDto): Promise<BaseBookDatabaseResponseDto>;
  removeBookById(params: BaseGetBookByIdRequestDto): Promise<BaseBookDatabaseResponseDto>;
  getAllBooks(): Promise<BaseBooksDatabaseResponseDto>;
  getBook(params: BaseGetBookByIdRequestDto): Promise<BaseBookDatabaseResponseDto>;
  addUserToFavoriteBook(params: BaseUserFavoriteBookDto): Promise<BaseBookDatabaseResponseDto>;
  removeBookFromFavorites(params: BaseUserFavoriteBookDto): Promise<BaseBookDatabaseResponseDto>;
}
