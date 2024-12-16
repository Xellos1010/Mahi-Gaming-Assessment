import { Prisma } from '@prisma/client';
import type { User, Book } from '@prisma/client';
//TODO: **Note** Right now we are coupled with Prisma - int he future we will decouple and create database agnostic interfaces once we have a schema generator

export type PrismaUserResponseWithFavoriteBooks = User & {
  favoriteBooks: Book[];
};
export interface BaseUserByIdRequestDto extends Pick<User, 'id'> { }

export interface UpdateUserPasswordDto extends Pick<User, 'password'> { }

// Combining both into a new interface for setting user passwords
export interface SetUserPasswordRequestDto extends BaseUserByIdRequestDto, UpdateUserPasswordDto { }

export interface UpdateUserLastLoggedInDto extends Pick<User, 'lastLoggedIn'> { }

//Omitting instead of Picking for scaling user creation requirements as maybe you want an address or other information.
// export interface AddUserRequestDto extends Pick<Prisma.UserCreateInput, 'name' | 'email' | 'password'> { }
export interface AddUserRequestDto extends Omit<Prisma.UserCreateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> { }

export interface UserWithFavoritesDatabaseResponseDto {
  user: PrismaUserResponseWithFavoriteBooks;
}

export interface SingleUserResponseDto {
  user: User;
}

export interface UsersListResponseDto {
  users: User[];
}

export interface BaseGetUserByIdRequestDto extends Pick<User, 'id'> {}

export interface BaseGetUserByEmailRequestDto extends Pick<User, 'email'> {}

// Ensure that PrismaDto is properly extended for any derived typees. 
export interface UserUpdateDto extends Omit<Prisma.UserUpdateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> {}
