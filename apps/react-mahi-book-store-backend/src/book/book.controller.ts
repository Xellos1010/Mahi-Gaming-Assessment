import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { AddBookParams, AddUserToFavoriteBookParams, RemoveBookByIdParams, RemoveBookFromFavoritesParams, UpdateBookParams } from '@prismaDist/interfaces/book/book.mutation.parameters.interface';
import { GetBookParamsDto } from './dtos/query.dtos';
// We are integrating DTO's for validation of incoming data as per NestJS Best Practices:
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getBook(@Param() params: GetBookParamsDto) {
    return this.bookService.getBook(params);
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
