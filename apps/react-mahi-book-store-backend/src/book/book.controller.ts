import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: number) {
    return this.bookService.getBook(id);
  }

  @Post()
  addBook(@Body() data: { name: string; description?: string; imageId?: string }) {
    return this.bookService.addBook(data);
  }

  @Patch(':id')
  updateBook(@Param('id') id: number, @Body() data: { name?: string; description?: string; imageId?: string }) {
    return this.bookService.updateBook(id, data);
  }

  @Delete(':id')
  removeBook(@Param('id') id: number) {
    return this.bookService.removeBookById(id);
  }

  @Post(':id/favorites')
  addUserToFavoriteBook(@Body() data: { userId: number }, @Param('id') bookId: number) {
    return this.bookService.addUserToFavoriteBook(data.userId, bookId);
  }

  @Delete(':id/favorites')
  removeBookFromFavorites(@Body() data: { userId: number }, @Param('id') bookId: number) {
    return this.bookService.removeBookFromFavorites(data.userId, bookId);
  }
}
