import { BaseCreateUserDatabaseResponseDto, BaseLoginUserDatabaseResponseDto } from '@prismaDist/dtos/lib/auth.dto';

export interface LoginResponse extends BaseLoginUserDatabaseResponseDto {}

export interface RegisterResponse extends BaseCreateUserDatabaseResponseDto {}