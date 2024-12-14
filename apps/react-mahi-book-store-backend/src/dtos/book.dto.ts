import { IsString, IsOptional, IsNumber, IsObject, IsArray } from 'class-validator';
import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';
import type { Book } from "@prisma/client";
//TODO: Right now this is coupled with the prisma client; if we have enough time we can extract the schema to a shared/database/schema file that way we can have a standard way to implement schema changes in the future

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
}

export class UpdateBookApiRequestDto implements BaseGetBookByIdRequestDto {
  @IsNumber()
  id: number;
  @IsObject()
  data: UpdateBookDto;
}

export class BaseBookDatabaseResponseDto {
  @IsObject()
  book: Book;
}

export class BaseBooksDatabaseResponseDto {
  @IsArray()
  books: Book[];
}

export class BaseGetBookByIdRequestDto implements Pick<Book, 'id'> {
  @IsNumber()
  id: number;
}
//TODO: Inherit from shared database schema lib
export class BaseUserFavoriteBookDto { 
  @IsNumber()
  bookId: number; 
  @IsNumber()
  userId: number;
}