import type { User } from '@prisma/client';
import { PrismaUserWithFavoriteBooks } from './types/user.types';
import { BaseApiResponseDto } from './base-api-response.dto';

export interface BaseAccessTokenResponse {
  accessToken: string;
}

export interface BaseCreateUserDatabaseResponseDto extends BaseAccessTokenResponse{
  user: User;
}

export interface BaseLoginUserRequestDto {
  email: string;
  password: string;
}

export interface BaseLoginUserDatabaseResponseDto extends BaseAccessTokenResponse{
  user: PrismaUserWithFavoriteBooks;
}
export interface CreateUserApiResponseDto extends BaseApiResponseDto<BaseCreateUserDatabaseResponseDto> {}

export interface LoginUserApiResponseDto extends BaseApiResponseDto<BaseLoginUserDatabaseResponseDto> {}

export interface AuthTokenPayload {
  sub: number;  // user ID
  email: string;
  iat?: number;  // issued at
  exp?: number;  // expiration
}