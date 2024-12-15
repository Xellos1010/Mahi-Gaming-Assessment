import { IsString, IsOptional, IsNumber, IsObject, IsArray } from 'class-validator';
import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';
import type { Book } from "@prisma/client";

export class CreateBookDto implements PrismaDto<Prisma.BookCreateInput> {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageId?: string;

  constructor(data: {
    title: string;
    author: string;
    description?: string;
    imageId?: string;
  }) {
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.imageId = data.imageId;
  }
}

export class UpdateBookDto implements PrismaDto<Prisma.BookUpdateInput> {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageId?: string;

  constructor(data: {
    title?: string;
    author?: string;
    description?: string;
    imageId?: string;
  } = {}) {
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.imageId = data.imageId;
  }
}

export class UpdateBookApiRequestDto implements BaseGetBookByIdRequestDto {
  @IsNumber()
  id: number;

  @IsObject()
  data: UpdateBookDto;

  constructor(id: number,
    data: UpdateBookDto | {
      title?: string;
      author?: string;
      description?: string;
      imageId?: string;
    }) {
    this.id = id;
    this.data = data instanceof UpdateBookDto
      ? data
      : new UpdateBookDto(data);
  }
}

export class BaseBookDatabaseResponseDto {
  @IsObject()
  book: Book;

  constructor(book: Book) {
    this.book = book;
  }
}

export class BaseBooksDatabaseResponseDto {
  @IsArray()
  books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }
}

export class BaseGetBookByIdRequestDto implements Pick<Book, 'id'> {
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class BaseUserFavoriteBookDto {
  @IsNumber()
  bookId: number;

  @IsNumber()
  userId: number;

  constructor(
    bookId: number,
    userId: number
  ) {
    this.bookId = bookId;
    this.userId = userId;
  }
}