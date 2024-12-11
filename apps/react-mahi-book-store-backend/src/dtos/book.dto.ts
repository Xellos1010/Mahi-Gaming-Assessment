import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';

// DTO for Book creation
export type BookCreateDto = PrismaDto<Prisma.BookCreateInput>;

// DTO for Book update
export type BookUpdateDto = PrismaDto<Prisma.BookUpdateInput>;
