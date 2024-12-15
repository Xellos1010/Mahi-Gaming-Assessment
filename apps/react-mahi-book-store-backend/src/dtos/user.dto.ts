import { PrismaDto } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';
import { User } from '@prisma/client';
import { PrismaUserResponseWithFavoriteBooks } from '@prismaDist/interfaces/user/user.types';
import { IsString, IsDate, IsNumber, IsArray, IsEmail, IsObject, MinLength, IsOptional } from 'class-validator';

export type TUserUpdateDto = PrismaDto<Prisma.UserUpdateInput>;

export class BaseUserPasswordDto {
  @IsString()
  @MinLength(6)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

export class BaseUserByIdRequestDto implements PrismaDto<User> {
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class UpdateUserPasswordDto extends BaseUserPasswordDto {
  constructor(password: string) {
    super(password);  // Initializes the password field in the base class 
  }
}

export class SetUserPasswordRequestDto extends BaseUserPasswordDto {
  @IsNumber()
  id: number;

  constructor(id: number, password: string) {
    super(password);  // Pass the password to the base class constructor 
    this.id = id;  // Set the id property 
  }
}

export class UpdateUserLastLoggedInDto {
  @IsDate()
  lastLoggedIn: Date;

  constructor(lastLoggedIn: Date) {
    this.lastLoggedIn = lastLoggedIn;
  }
}

export class AddUserRequestDto implements PrismaDto<Prisma.UserCreateInput> {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class UserWithFavoritesDatabaseResponseDto {
  @IsObject()
  user: PrismaUserResponseWithFavoriteBooks;

  constructor(user: PrismaUserResponseWithFavoriteBooks) {
    this.user = user;
  }
}

export class BaseUserDatabaseResponseDto {
  @IsObject()
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

export class BaseUsersDatabaseResponseDto {
  @IsArray()
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }
}

export class BaseGetUserByIdRequestDto implements Pick<User, 'id'> {
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class BaseGetUserByEmailRequestDto implements Pick<User, 'email'> {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

// Ensure that PrismaDto is properly extended for any derived classes. 
export class UserUpdateDto implements TUserUpdateDto {
  @IsString()
  @IsOptional()
  name: string | Prisma.StringFieldUpdateOperationsInput;
  @IsEmail()
  @IsOptional()
  email: string | Prisma.StringFieldUpdateOperationsInput;
  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string | Prisma.StringFieldUpdateOperationsInput
  // Add any specific fields or methods as needed 
  constructor(partial: UserUpdateDto) {
    this.name = partial.name;
    this.email = partial.email;
    this.password = partial.password;
  }
}
