import { Controller,Get, Post, Patch, Delete, Param, Body, ParseIntPipe, } from '@nestjs/common';
import { BookService } from './book.service';
import { BaseBookDatabaseResponseDto, BaseBooksDatabaseResponseDto, BaseGetBookByIdRequestDto, BaseUserFavoriteBookDto, CreateBookDto, UpdateBookApiRequestDto, UpdateBookDto } from '../dtos/book.dto';
import { HandleControllerError } from '../decorators/errorHandling/controller.error.handler';
import { WrapApiResponse } from '../decorators/controller.api-response.';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  @HandleControllerError('Get all books')
  @WrapApiResponse() 
  async getAllBooks(): Promise<BaseBooksDatabaseResponseDto> {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  @HandleControllerError('Get book by ID')
  @WrapApiResponse() 
  async getBook(
    @Param('id', ParseIntPipe) id: BaseGetBookByIdRequestDto
  ): Promise<BaseBookDatabaseResponseDto> {
    return await this.bookService.getBook(id) as BaseBookDatabaseResponseDto;
  }

  @Post()
  @HandleControllerError('Add a new book')
  @WrapApiResponse() 
  async addBook(
    @Body() data: CreateBookDto
  ): Promise<BaseBookDatabaseResponseDto> {
    return await this.bookService.addBook(data) as BaseBookDatabaseResponseDto;
  }

  @Patch(':id')
  @HandleControllerError('Update book')
  @WrapApiResponse() 
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookDto,
  ): Promise<BaseBookDatabaseResponseDto> {
    return await this.bookService.updateBook({ id, data } as UpdateBookApiRequestDto) as BaseBookDatabaseResponseDto;
  }

  @Post(':id/favorites')
  @HandleControllerError('Add user to favorite book')
  @WrapApiResponse() 
  async addUserToFavoriteBook(
    @Param('id', ParseIntPipe) { bookId }: BaseUserFavoriteBookDto,
    @Body('userId') { userId }: BaseUserFavoriteBookDto
  ): Promise<BaseBookDatabaseResponseDto> {
    return await this.bookService.addUserToFavoriteBook({ bookId, userId } as BaseUserFavoriteBookDto) as BaseBookDatabaseResponseDto;
  }

  @Delete(':id/favorites')
  @HandleControllerError('Remove book from favorites')
  @WrapApiResponse() 
  async removeBookFromFavorites(
    @Param('id', ParseIntPipe) bookId: number,
    @Body('userId') userId: number
  ): Promise<BaseBookDatabaseResponseDto> {
    return await this.bookService.removeBookFromFavorites({ bookId, userId }) as BaseBookDatabaseResponseDto;
  }

  @Delete(':id')
  @HandleControllerError('Remove book by ID')
  @WrapApiResponse() 
  async removeBookById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BaseBookDatabaseResponseDto> {
    return await this.bookService.removeBookById({ id }) as BaseBookDatabaseResponseDto;
  }
}
