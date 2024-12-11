import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { BookCreateDto, BookUpdateDto } from '../dtos/book.dto';

// We are integrating DTO's for validation of incoming data as per NestJS Best Practices:
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.getBook(id);
  }

  @Post()
  addBook(@Body() data: BookCreateDto) {
    return this.bookService.addBook(data);
  }

  @Patch(':id')
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() data: BookUpdateDto) {
    return this.bookService.updateBook(id, data);
  }

  @Delete(':id')
  removeBookById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.removeBookById(id);
  }

  @Post(':id/favorites')
  addUserToFavoriteBook(@Param('id', ParseIntPipe) bookId: number, @Body('userId') userId: number) {
    return this.bookService.addUserToFavoriteBook(bookId, userId);
  }

  @Delete(':id/favorites')
  removeBookFromFavorites(@Param('id', ParseIntPipe) bookId: number, @Body('userId') userId: number) {
    return this.bookService.removeBookFromFavorites(bookId, userId);
  }
}
