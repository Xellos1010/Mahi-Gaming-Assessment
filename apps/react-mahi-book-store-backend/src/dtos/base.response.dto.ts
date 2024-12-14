// apps/react-mahi-book-store-backend/src/dtos/base.response.dto.ts
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class BaseApiResponseDto<T> {
  @IsBoolean()
  success: boolean;

  @IsObject()
  @IsOptional()
  data?: T;

  @IsString()
  @IsOptional()
  error?: string;

  constructor(success: boolean, data?: T, error?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
