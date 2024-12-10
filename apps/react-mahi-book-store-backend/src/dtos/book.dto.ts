
import { Prisma } from '@prisma/client';
import { PrismaDto } from './prisma-dto.utility';

export class BookDto implements PrismaDto<Prisma.BookCreateInput> {
  title: string;
  author: string;
  description?: string | null;
  imageId?: string | null;
}
