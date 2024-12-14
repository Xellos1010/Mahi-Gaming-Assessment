import {
  BaseBookDatabaseResponseDto,
  BaseBooksDatabaseResponseDto,
  BaseGetBookByIdRequestDto,
  BaseUserFavoriteBookDto,
  CreateBookDto,
  UpdateBookApiRequestDto
} from '@dto/book.dto';
import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import { IBookServiceInterface } from '../interfaces/databaseService/book.service.interface';
import {
  PrismaAddBookParams,
  PrismaAddUserToFavoriteBookParams,
  PrismaGetBookByIdParams,
  PrismaRemoveBookByIdParams,
  PrismaRemoveBookFromFavoritesParams,
  PrismaUpdateBookParams
} from '@prismaDist/shared/types/book.types';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';

@Injectable()
export class BookService implements IBookServiceInterface {
  @HandleServiceError('Fetching all books')
  async getAllBooks(): Promise<BaseBooksDatabaseResponseDto> {
    return await prismaOperations.bookQuery.getAllBooks() as BaseBooksDatabaseResponseDto;
  }

  @HandleServiceError('Fetching book by ID')
  async getBook({ id }: BaseGetBookByIdRequestDto): Promise<BaseBookDatabaseResponseDto> {
    return await prismaOperations.bookQuery.getBookById({ id } as PrismaGetBookByIdParams) as BaseBookDatabaseResponseDto;
  }

  @HandleServiceError('Adding a new book')
  async addBook(data: CreateBookDto): Promise<BaseBookDatabaseResponseDto> {
    return await prismaOperations.bookMutation.addBook(data as PrismaAddBookParams) as BaseBookDatabaseResponseDto;
  }

  @HandleServiceError('Updating book')
  async updateBook({ id, data }: UpdateBookApiRequestDto): Promise<BaseBookDatabaseResponseDto> {
    return await prismaOperations.bookMutation.updateBook({
      where: { id },
      data,
    } as PrismaUpdateBookParams) as BaseBookDatabaseResponseDto;
  }

  @HandleServiceError('Removing book by ID')
  async removeBookById({ id }: BaseGetBookByIdRequestDto): Promise<BaseBookDatabaseResponseDto> {
    return await prismaOperations.bookMutation.removeBookById({ id } as PrismaRemoveBookByIdParams) as BaseBookDatabaseResponseDto;
  }

  @HandleServiceError('Adding user to favorite book')
  async addUserToFavoriteBook({ bookId, userId }: BaseUserFavoriteBookDto): Promise<BaseBookDatabaseResponseDto> {
    return await prismaOperations.bookMutation.addUserToFavoriteBook({ bookId, userId } as PrismaAddUserToFavoriteBookParams) as BaseBookDatabaseResponseDto;
  }

  @HandleServiceError('Removing book from favorites')
  async removeBookFromFavorites({ bookId, userId }: BaseUserFavoriteBookDto): Promise<BaseBookDatabaseResponseDto> {
    return await prismaOperations.bookMutation.removeBookFromFavorites({ bookId, userId } as PrismaRemoveBookFromFavoritesParams) as BaseBookDatabaseResponseDto;
  }
}
