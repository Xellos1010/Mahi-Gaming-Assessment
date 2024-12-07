import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@react-monorepo/prisma';

@Injectable()
export class BookService {
  async getAllBooks() {
    return prismaOperations.bookQuery.getAllBooks();
  }

  async getBook(id: number) {
    return prismaOperations.bookQuery.getBook(id);
  }

  async addBook(data: { name: string; description?: string; imageId?: string }) {
    return prismaOperations.bookMutation.addBook(data);
  }

  async updateBook(id: number, data: { name?: string; description?: string; imageId?: string }) {
    return prismaOperations.bookMutation.updateBook(id, data);
  }

  async removeBookById(id: number) {
    return prismaOperations.bookMutation.removeBookById(id);
  }

  async addUserToFavoriteBook(userId: number, bookId: number) {
    return prismaOperations.bookMutation.addUserToFavoriteBook(userId, bookId);
  }

  async removeBookFromFavorites(userId: number, bookId: number) {
    return prismaOperations.bookMutation.removeBookFromFavorites(userId, bookId);
  }
}
