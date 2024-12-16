import { Prisma } from '@prisma/client';
import type { Book } from "@prisma/client";

export interface BaseGetBookByIdRequestDto extends Pick<Book, 'id'> {}

export interface CreateBookDto extends Omit<Prisma.BookCreateInput, 'createdAt' | 'updatedAt' | 'usersFavorite' | 'UserFavorites'> {}
    
//Omitting instead of Picking to account for feature scaling.
// export interface UpdateBookDto extends Omit<Prisma.BookUpdateInput, 'title' | 'author' | 'description' | 'imageId'> {}
export interface UpdateBookDto extends Omit<Prisma.BookUpdateInput, 'createdAt' | 'updatedAt' | 'usersFavorite' | 'UserFavorites'> {}

export interface UpdateBookApiRequestDto extends BaseGetBookByIdRequestDto {
  data: UpdateBookDto;
}

export interface SingleBookResponseDto {
  book: Book;
}

export interface BooksListResponseDto {
  books: Book[];
}

export interface BaseUserFavoriteBookRequestDto {
  bookId: number;
  userId: number;
}