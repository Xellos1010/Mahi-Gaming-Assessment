import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, } from '@nestjs/common';
import { BookService } from './book.service';
import { BaseBookDatabaseResponseDto, BaseBooksDatabaseResponseDto, BaseGetBookByIdRequestDto, BaseUserFavoriteBookDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto } from '../dtos/book.dto';
import { HandleControllerError } from '../decorators/errorHandling/controller.error.handler';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { BaseUserByIdRequestDto } from '@dto/user.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  ////@HandleControllerError('Get all books')
  //@HandleControllerError()
  async getAllBooks(): Promise<BaseApiResponseDto<BaseBooksDatabaseResponseDto>> {
    return await this.bookService.getAllBooks() as BaseApiResponseDto<BaseBooksDatabaseResponseDto>;
  }

  @Get(':id')
  ////@HandleControllerError('Get book by ID')
  //@HandleControllerError()
  async getBook(
    @Param('id', ParseIntPipe) id: BaseGetBookByIdRequestDto
  ): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.getBook(id) as BaseApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Post()
  ////@HandleControllerError('Add a new book')
  //@HandleControllerError()
  async addBook(
    @Body() data: CreateBookDto
  ): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.addBook(data) as BaseApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Patch(':id')
  ////@HandleControllerError('Update book')
  //@HandleControllerError()
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateBookDto,
  ): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.updateBook(new UpdateBookApiRequestDto(id, updateData)) as BaseApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Post(':id/favorites')
  ////@HandleControllerError('Add user to favorite book')
  //@HandleControllerError()
  async addUserToFavoriteBook(
    @Param('id', ParseIntPipe) { id: bookId }: BaseGetBookByIdRequestDto,
    @Body('userId') { id: userId }: BaseUserByIdRequestDto
  ): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.addUserToFavoriteBook(new BaseUserFavoriteBookDto(bookId, userId)) as BaseApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Delete(':id/favorites')
  ////@HandleControllerError('Remove book from favorites')
  //@HandleControllerError()
  async removeBookFromFavorites(
    @Param('id', ParseIntPipe) { id: bookId }: BaseGetBookByIdRequestDto,
    @Body('userId') { id: userId }: BaseUserByIdRequestDto
  ): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.removeBookFromFavorites(new BaseUserFavoriteBookDto(bookId, userId)) as BaseApiResponseDto<BaseBookDatabaseResponseDto>;
  }

  @Delete(':id')
  ////@HandleControllerError('Remove book by ID')
  //@HandleControllerError()
  async removeBookById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BaseApiResponseDto<BaseBookDatabaseResponseDto>> {
    return await this.bookService.removeBookById(new BaseGetBookByIdRequestDto(id)) as BaseApiResponseDto<BaseBookDatabaseResponseDto>;
  }
}
