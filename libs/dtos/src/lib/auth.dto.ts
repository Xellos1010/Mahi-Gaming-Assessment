import type { User } from '@prisma/client';
import { AddUserRequestDto, PrismaUserResponseWithFavoriteBooks } from './user.dto';
import { BaseApiResponseDto } from './base-api-response.dto';

export interface CreateUserRequestDto extends AddUserRequestDto { };

export interface BaseCreateUserDatabaseResponseDto {
  user: User;
  accessToken: string;
}

export interface LoginUserRequestDto {
  email: string;
  password: string;
}

//TODO: Technically this does not adhere to SRP but in the interest of ensuring all features are implemented will forgoe this part until all bonus features are implemented and will circle back to this time willing
export interface LoginUserDatabaseResponseDto {
  user: PrismaUserResponseWithFavoriteBooks;
  accessToken: string;
}
export interface AuthTokenPayload {
  sub: number;  // user ID
  email: string;
  iat?: number;  // issued at
  exp?: number;  // expiration
}
export interface CreateUserApiResponseDto extends BaseApiResponseDto<BaseCreateUserDatabaseResponseDto> {}

export interface LoginUserApiResponseDto extends BaseApiResponseDto<LoginUserDatabaseResponseDto> {}