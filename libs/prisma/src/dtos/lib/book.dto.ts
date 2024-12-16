import { Prisma } from '@prisma/client';
import type { Book } from "@prisma/client";

export interface BaseBookIdDto extends Pick<Book, 'id'> {}

export interface BaseCreateBookDto extends Omit<Prisma.BookCreateInput, 'createdAt' | 'updatedAt' | 'usersFavorite' | 'UserFavorites'> {}
    
//Omitting instead of Picking to account for feature scaling.
// export interface UpdateBookDto extends Omit<Prisma.BookUpdateInput, 'title' | 'author' | 'description' | 'imageId'> {}
export interface BaseUpdateBookDto extends Omit<Prisma.BookUpdateInput, 'createdAt' | 'updatedAt' | 'usersFavorite' | 'UserFavorites'> {}

export interface UpdateBookApiRequestDto extends BaseBookIdDto {
  data: BaseUpdateBookDto;
}

export interface SingleBookResponseDto {
  book: Book | null;
}

export interface BooksListResponseDto {
  books: Book[];
}

export interface BaseUserFavoriteBookRequestDto {
  bookId: number;
  userId: number;
}