import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';
import { PrismaUserResponseWithFavoriteBooks } from './types/user.types';
//TODO: **Note** Right now we are coupled with Prisma - int he future we will decouple and create database agnostic interfaces once we have a schema generator

export interface BaseUserIdDto extends Pick<User, 'id'> { }
export interface BaseUserPasswordDto extends Pick<User, 'password'> { }
export interface BaseEmailDto extends Pick<User, 'email'> { }
export interface BaseUserLastLoggedInDto extends Pick<User, 'lastLoggedIn'> { }

// Ensure that PrismaDto is properly extended for any derived typees. 
export interface BaseUserUpdateDto extends Omit<Prisma.UserUpdateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> {}
// Combining both into a new interface for setting user passwords
export interface BaseSetUserPasswordRequestDto extends BaseUserIdDto, BaseUserPasswordDto { }
//Omitting instead of Picking for scaling user creation requirements as maybe you want an address or other information.
// export interface AddUserRequestDto extends Pick<Prisma.UserCreateInput, 'name' | 'email' | 'password'> { }
export interface BaseCreateUserRequestDto extends Omit<Prisma.UserCreateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> { }
export interface BaseGetUserByIdRequestDto extends BaseUserIdDto {}

export interface BaseGetUserByEmailRequestDto extends BaseEmailDto {}

export interface SingleUserResponseDto {
  user: User;
}

export interface UsersListResponseDto {
  users: User[];
}

export interface SingleUserResponseWithFavoriteBooksDto {
  user: PrismaUserResponseWithFavoriteBooks;
}
