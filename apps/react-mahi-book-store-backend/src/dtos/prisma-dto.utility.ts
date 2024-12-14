//TODO: Right now this is coupled with the prisma client; if we have enough time we can extract the schema to a shared/database/schema file that way we can have a standard way to implement schema changes in the future
import { Prisma } from '@prisma/client';
import type { User, Book } from '@prisma/client';

// Utility to map Prisma types dynamically to DTOs with stricter typing
export type PrismaDto<T> =
  T extends User
  ? Pick<T, 'id'> // Only picking the 'id' field for User for things like GetUser by ID
  : T extends Book
  ? Pick<T, 'id'> // Only picking the 'id' field for User for things like GetBook by ID
  : T extends User
  ? Pick<T, 'email'> // Only picking the 'id' field for User for things like GetUser by Email
  : T extends Prisma.BookCreateInput
  ? Required<Pick<T, 'title' | 'author'>> & Partial<Omit<T, 'title' | 'author'>>
  : T extends Prisma.BookUpdateInput
  ? Partial<T>
  : T extends Prisma.UserCreateInput
  ? Required<Pick<T, 'name' | 'email' | 'password'>> & Partial<Omit<T, 'name' | 'email' | 'password'>>
  : T extends Prisma.UserUpdateInput
  ? Partial<T>
  : T extends Prisma.UserFavoritesCreateInput
  ? Partial<T>
  : never;


export type PickFields<T, K extends keyof T> = Pick<T, K>;
