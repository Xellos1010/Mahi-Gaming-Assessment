import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';
import { IsString, IsOptional, IsDate } from 'class-validator';
// DTO for User update
export type UserUpdateDto = PrismaDto<Prisma.UserUpdateInput>;
export class UpdateUserPasswordDto {
  @IsString()
  password: string;
}

export class UpdateUserLastLoggedInDto {
  @IsOptional()
  @IsDate()
  lastLoggedIn?: Date;
}
// Specific fields for partial updates
// export type UpdateUserPasswordDto = PickFields<Prisma.UserUpdateInput, 'password'> 
// export type UpdateUserLastLoggedInDto = PickFields<Prisma.UserUpdateInput, 'lastLoggedIn'>;