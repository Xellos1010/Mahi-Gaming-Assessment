import { IsString, IsOptional } from 'class-validator';
import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';

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
