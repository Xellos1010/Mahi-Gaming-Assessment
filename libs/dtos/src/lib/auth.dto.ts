import type { User } from '@prisma/client';
import { PrismaUserResponseWithFavoriteBooks } from './types/user.types';
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

//TODO: Technically this does not adhere to SRP but in the interest of ensuring all features are implemented will forgoe this part until all bonus features are implemented and will circle back to this time willing
export interface BaseLoginUserDatabaseResponseDto extends BaseAccessTokenResponse{
  user: PrismaUserResponseWithFavoriteBooks;
}
export interface AuthTokenPayload {
  sub: number;  // user ID
  email: string;
  iat?: number;  // issued at
  exp?: number;  // expiration
}
export interface CreateUserApiResponseDto extends BaseApiResponseDto<BaseCreateUserDatabaseResponseDto> {}

export interface LoginUserApiResponseDto extends BaseApiResponseDto<BaseLoginUserDatabaseResponseDto> {}