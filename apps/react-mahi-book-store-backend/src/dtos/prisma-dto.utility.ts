// Extendable Prisma DTO Utility
// We’ll create a PrismaDto type utility that is more flexible and supports custom mapping for different models and operations

import { Prisma } from '@prisma/client';

// Utility to map Prisma types dynamically to DTOs
export type PrismaDto<T> = 
  T extends Prisma.BookCreateInput ? Partial<T> :
  T extends Prisma.BookUpdateInput ? Required<T> :
  T extends Prisma.UserCreateInput ? Partial<T> :
  T extends Prisma.UserUpdateInput ? Required<T> :
  T extends Prisma.UserFavoritesUncheckedCreateInput ? Partial<T> :
  never;