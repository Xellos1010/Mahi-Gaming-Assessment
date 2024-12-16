import { Prisma } from '@prisma/client';
import type { Book, User } from '@prisma/client';
import { PrismaUserWithFavoriteBooks } from './types/user.types';

export interface BaseUserIdDto extends Pick<User, 'id'> { }
export interface BaseUserPasswordDto extends Pick<User, 'password'> { }
export interface BaseEmailDto extends Pick<User, 'email'> { }
export interface BaseUserLastLoggedInDto extends Pick<User, 'lastLoggedIn'> { }

//Omitting instead of Picking for scaling user creation requirements as maybe you want an address or other information.
// export interface AddUserRequestDto extends Pick<Prisma.UserCreateInput, 'name' | 'email' | 'password'> { }
export interface BaseCreateUserRequestDto extends Omit<Prisma.UserCreateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> { }
// Ensure that PrismaDto is properly extended for any derived typees. 
export interface BaseUserUpdateDto extends Omit<Prisma.UserUpdateInput, 'createdAt' | 'updatedAt' | 'lastLoggedIn' | 'favoriteBooks' | 'UserFavorites'> {}
// Combining both into a new interface for setting user passwords
export interface BaseSetUserPasswordRequestDto extends BaseUserIdDto, BaseUserPasswordDto { }

export interface SingleUserResponseDto {
  user: User;
}

export interface UsersListResponseDto {
  users: User[];
}

export interface SingleUserResponseWithFavoriteBooksDto {
  user: PrismaUserWithFavoriteBooks;
}

export interface PrismaUserWithFavoriteBooksResponse {
  user: User & { favoriteBooks: Book[] };
};

// I had previously defined request objects but did not implement as they are just extending the base class. I made this decision to make the code light weight.
// export interface BaseGetUserByIdRequestDto extends BaseUserIdDto {}

// export interface BaseGetUserByEmailRequestDto extends BaseEmailDto {}
