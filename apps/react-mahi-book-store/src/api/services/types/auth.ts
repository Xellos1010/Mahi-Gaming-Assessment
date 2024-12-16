import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { CreateUserDatabaseResponseDto, LoginUserDatabaseResponseDto } from '@nestDtos/auth.dto';

export interface LoginResponse extends ApiResponseDto<LoginUserDatabaseResponseDto> {}

export interface RegisterResponse extends ApiResponseDto<CreateUserDatabaseResponseDto> {}