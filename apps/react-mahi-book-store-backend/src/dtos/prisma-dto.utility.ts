import { Prisma } from '@prisma/client';

// Utility to map Prisma types dynamically to DTOs with stricter typing
export type PrismaDto<T> = 
  T extends Prisma.BookCreateInput
    ? Required<Pick<T, 'title' | 'author'>> & Partial<Omit<T, 'title' | 'author'>>
    : T extends Prisma.BookUpdateInput
    ? Partial<T>
    : T extends Prisma.UserCreateInput
    ? Required<Pick<T, 'name' | 'email' | 'password'>> & Partial<Omit<T, 'name' | 'email' | 'password'>>
    : T extends Prisma.UserUpdateInput
    ? Required<T>
    : T extends Prisma.UserFavoritesCreateInput
    ? Partial<T>
    : never;

export type PickFields<T, K extends keyof T> = Pick<T, K>;
