import { CreateBookDto, UpdateBookDto } from '@dto/book.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';

// all routes are in this script for expediency

@Injectable()
export class BookService {
  async getAllBooks() {
    return prismaOperations.bookQuery.getAllBooks();
  }

  async getBook(id: number) {
    const book = await prismaOperations.bookQuery.getBook({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async addBook(data: CreateBookDto) {
    return prismaOperations.bookMutation.addBook(data);
  }

  async updateBook(bookId: number, data: UpdateBookDto) {
    return prismaOperations.bookMutation.updateBook({ where: { id: bookId }, data: data });
  }

  async removeBookById(bookId: number) {
    return prismaOperations.bookMutation.removeBookById({ id: bookId });
  }

  async addUserToFavoriteBook(bookId: number, userId: number) {
    return prismaOperations.bookMutation.addUserToFavoriteBook({ bookId, userId });
  }

  async removeBookFromFavorites(bookId: number, userId: number) {
    return prismaOperations.bookMutation.removeBookFromFavorites({ bookId, userId });
  }
}
