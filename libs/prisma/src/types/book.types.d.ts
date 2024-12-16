import { Prisma } from '@prisma/client';
import { BaseUpdateBookDto } from '../dtos';

export type PrismaDatabaseUpdateBookParams = {
  where: Prisma.BookWhereUniqueInput; // Specify `id` or unique field
  data: BaseUpdateBookDto; // Prisma's generated `UpdateInput`
};