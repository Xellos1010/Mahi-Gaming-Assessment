import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  async getAllBooks() {
    try {
      return await this.bookService.getAllBooks();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookService.getBook(id);
    } catch (error) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  @Post()
  async addBook(@Body() data: CreateBookDto) {
    try {
      return await this.bookService.addBook(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookDto,
  ) {
    try {
      return await this.bookService.updateBook(id, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':id/favorites')
  addUserToFavoriteBook(@Param('id', ParseIntPipe) bookId: number, @Body('userId') userId: number) {
    try {
      return this.bookService.addUserToFavoriteBook(bookId, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id/favorites')
  removeBookFromFavorites(@Param('id', ParseIntPipe) bookId: number, @Body('userId') userId: number) {
    try {
      return this.bookService.removeBookFromFavorites(bookId, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async removeBookById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookService.removeBookById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
