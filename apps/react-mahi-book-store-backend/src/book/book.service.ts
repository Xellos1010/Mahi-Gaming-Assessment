import {
  BaseBookDatabaseResponseDto,
  BaseBooksDatabaseResponseDto,
  BaseGetBookByIdRequestDto,
  BaseUserFavoriteBookDto,
  CreateBookDto,
  UpdateBookApiRequestDto
} from '@nestDtos/book.dto';
import { Injectable } from '@nestjs/common';
import { IBookServiceInterface } from '../interfaces/databaseService/book.service.interface';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { prismaOperations } from 'libs/prisma/src/operations/prismaOperationsImpl';
import { PrismaDatabaseUpdateBookParams } from 'libs/prisma/src/types/book.types';

@Injectable()
export class BookService implements IBookServiceInterface {

  // @HandleServiceError()
  async getAllBooks(): Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBooksDatabaseResponseDto>(await prismaOperations.bookQuery.getAllBooks() as BaseBooksDatabaseResponseDto);
  }

  // @HandleServiceError()
  async getBook(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookQuery.getBook(params) as BaseBookDatabaseResponseDto);
  }

  @HandleServiceError()
  async addBook(data: CreateBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.addBook(data) as BaseBookDatabaseResponseDto);
  }

  @HandleServiceError()
  async updateBook({ id, data }: UpdateBookApiRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.updateBook({
      where: { id },
      data,
    } as PrismaDatabaseUpdateBookParams) as BaseBookDatabaseResponseDto);
  }

  @HandleServiceError()
  async removeBookById(params: BaseGetBookByIdRequestDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.removeBookById(params) as BaseBookDatabaseResponseDto);
  }

  @HandleServiceError()
  async addUserToFavoriteBook(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.addUserToFavoriteBook(params) as BaseBookDatabaseResponseDto);
  }

  @HandleServiceError()
  async removeBookFromFavorites(params: BaseUserFavoriteBookDto): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseBookDatabaseResponseDto>(await prismaOperations.bookMutation.removeBookFromFavorites(params) as BaseBookDatabaseResponseDto);
  }
}
