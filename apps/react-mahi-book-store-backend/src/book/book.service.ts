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
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';

@Injectable()
export class BookService implements IBookServiceInterface {
  ////@HandleServiceError('Fetching all books')
  //@HandleServiceError()
  async getAllBooks(): Promise<BaseApiResponseDto<BaseBooksDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBooksDatabaseResponseDto>(await prismaOperations.bookQuery.getAllBooks() as BaseBooksDatabaseResponseDto);
  }

  ////@HandleServiceError('Fetching book by ID')
  //@HandleServiceError()
  async getBook({ id }: BaseGetBookByIdRequestDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookQuery.getBook({ id } as PrismaGetBookByIdParams) as BaseBookDatabaseResponseDto);
  }

  ////@HandleServiceError('Adding a new book')
  //@HandleServiceError()
  async addBook(data: CreateBookDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.addBook(data as PrismaAddBookParams) as BaseBookDatabaseResponseDto);
  }

  ////@HandleServiceError('Updating book')
  //@HandleServiceError()
  async updateBook({ id, data }: UpdateBookApiRequestDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.updateBook({
      where: { id },
      data,
    } as PrismaUpdateBookParams) as BaseBookDatabaseResponseDto);
  }

  ////@HandleServiceError('Removing book by ID')
  //@HandleServiceError()
  async removeBookById({ id }: BaseGetBookByIdRequestDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.removeBookById({ id } as PrismaRemoveBookByIdParams) as BaseBookDatabaseResponseDto);
  }

  ////@HandleServiceError('Adding user to favorite book')
  //@HandleServiceError()
  async addUserToFavoriteBook({ bookId, userId }: BaseUserFavoriteBookDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.addUserToFavoriteBook({ bookId, userId } as PrismaAddUserToFavoriteBookParams) as BaseBookDatabaseResponseDto);
  }

  ////@HandleServiceError('Removing book from favorites')
  //@HandleServiceError()
  async removeBookFromFavorites({ bookId, userId }: BaseUserFavoriteBookDto): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.removeBookFromFavorites({ bookId, userId } as PrismaRemoveBookFromFavoritesParams) as BaseBookDatabaseResponseDto);
  }
}
