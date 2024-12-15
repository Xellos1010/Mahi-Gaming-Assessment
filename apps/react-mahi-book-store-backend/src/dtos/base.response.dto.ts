// apps/react-mahi-book-store-backend/src/dtos/base.response.dto.ts
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiError } from '../interfaces/ApiError';

export class BaseApiResponseDto<T> {
  @IsBoolean()
  success: boolean;

  @IsObject()
  @IsOptional()
  data?: T;

  @IsObject()
  @IsOptional()
  error?: ApiError;

  @IsString()
  @IsOptional()
  message?: string;

  constructor(success: boolean, data?: T, error?: ApiError, message? :string) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
