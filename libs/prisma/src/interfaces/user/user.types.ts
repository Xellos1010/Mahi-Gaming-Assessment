import { Book, User } from "@prisma/client";

//Prisma uses a highly dynamic type system, and the User type doesn't automatically include relations unless explicitly configured with include in the query. TypeScript sees User as the base model and doesn’t account for additional properties like favoriteBooks.
//Explicitly defining a type that includes the relation favoriteBooks to use in my interface
export interface PrismaUserResponseWithFavoriteBooks extends User {
    favoriteBooks: Book[];
  }