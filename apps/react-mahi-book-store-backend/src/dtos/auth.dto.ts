// dtos/auth.dto.ts 
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements PrismaDto<Prisma.UserCreateInput> {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}


export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
