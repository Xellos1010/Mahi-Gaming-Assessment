import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import { AddBookParams, AddUserToFavoriteBookParams, RemoveBookByIdParams, RemoveBookFromFavoritesParams, UpdateBookParams } from '@prismaDist/interfaces/book/book.mutation.parameters.interface';
import { GetBookParams } from '@prismaDist/interfaces/book/book.query.parameters.interface';

// all routes are in this script for expediency

@Injectable()
export class BookService {
  async getAllBooks() {
    return prismaOperations.bookQuery.getAllBooks();
  }

  async getBook(params: GetBookParams) {
    return prismaOperations.bookQuery.getBook(params);
  }

  async addBook(params : AddBookParams) {
    return prismaOperations.bookMutation.addBook(params);
  }

  async updateBook(params: UpdateBookParams) {
    return prismaOperations.bookMutation.updateBook(params);
  }

  async removeBookById(params: RemoveBookByIdParams) {
    return prismaOperations.bookMutation.removeBookById(params);
  }

  async addUserToFavoriteBook(params: AddUserToFavoriteBookParams) {
    return prismaOperations.bookMutation.addUserToFavoriteBook(params);
  }

  async removeBookFromFavorites(params: RemoveBookFromFavoritesParams) {
    return prismaOperations.bookMutation.removeBookFromFavorites(params);
  }
}
