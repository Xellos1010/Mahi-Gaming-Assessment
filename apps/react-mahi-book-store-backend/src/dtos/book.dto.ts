import { IsString, IsOptional, IsNumber, IsObject, IsArray } from 'class-validator';
import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';
import type { Book } from "@prisma/client";
import { BaseBookIdDto, BaseCreateBookDto, BaseUpdateBookDto, BaseUserFavoriteBookRequestDto, BooksListResponseDto, SingleBookResponseDto } from 'libs/dtos/src/lib/book.dto';

export class BaseGetBookByIdRequestDto implements BaseBookIdDto {
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class CreateBookDto implements BaseCreateBookDto {
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

export class UpdateBookDto implements BaseUpdateBookDto {
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

export class UpdateBookApiRequestDto extends BaseGetBookByIdRequestDto implements BaseGetBookByIdRequestDto {

  @IsObject()
  data: BaseUpdateBookDto;

  constructor(id: number,
    data: BaseUpdateBookDto | {
      title?: string;
      author?: string;
      description?: string;
      imageId?: string;
    }) {
    super(id);
    this.data = this.initializeData(data);
  }

  private initializeData(data: BaseUpdateBookDto): BaseUpdateBookDto {
    // If 'data' is a valid BaseUpdateBookDto
    if (data && typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length > 0) {
      return { ...data } as BaseUpdateBookDto; // Spread operator to return all defined properties
    }
    return {};
  }
}

export class BaseBookDatabaseResponseDto implements SingleBookResponseDto {
  @IsObject()
  book: Book;

  constructor(book: Book) {
    this.book = book;
  }
}

export class BaseBooksDatabaseResponseDto implements BooksListResponseDto{
  @IsArray()
  books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }
}

export class BaseUserFavoriteBookDto implements BaseUserFavoriteBookRequestDto {
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