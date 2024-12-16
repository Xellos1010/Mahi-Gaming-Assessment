import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, } from '@nestjs/common';
import { BookService } from './book.service';
import { BaseBookDatabaseResponseDto, BaseBooksDatabaseResponseDto, BaseGetBookByIdRequestDto, BaseUserFavoriteBookDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto } from '../dtos/book.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { GetUserByIdRequestDto } from '@nestDtos/user.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  // @HandleControllerError()
  async getAllBooks(): Promise<ApiResponseDto<BaseBooksDatabaseResponseDto>> {
    return await this.bookService.getAllBooks() as ApiResponseDto<BaseBooksDatabaseResponseDto>;
  }

  @Get(':id')
  //@HandleControllerError()
  async getBook(
    @Param('id', ParseIntPipe) id: BaseGetBookByIdRequestDto
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.getBook(id) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Post()
  //@HandleControllerError()
  async addBook(
    @Body() data: CreateBookDto
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.addBook(data) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Patch(':id')
  //@HandleControllerError()
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateBookDto,
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.updateBook(new UpdateBookApiRequestDto(id, updateData)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Post(':id/favorites')
  //@HandleControllerError()
  async addUserToFavoriteBook(
    @Param('id', ParseIntPipe) { id: bookId }: BaseGetBookByIdRequestDto,
    @Body('userId') { id: userId }: GetUserByIdRequestDto
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.addUserToFavoriteBook(new BaseUserFavoriteBookDto(bookId, userId)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Delete(':id/favorites')
  ////@HandleControllerError('Remove book from favorites')
  //@HandleControllerError()
  async removeBookFromFavorites(
    @Param('id', ParseIntPipe) { id: bookId }: BaseGetBookByIdRequestDto,
    @Body('userId') { id: userId }: GetUserByIdRequestDto
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.removeBookFromFavorites(new BaseUserFavoriteBookDto(bookId, userId)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Delete(':id')
  //@HandleControllerError()
  async removeBookById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.removeBookById(new BaseGetBookByIdRequestDto(id)) as ApiResponseDto<BaseBookDatabaseResponseDto>;
  }
}
