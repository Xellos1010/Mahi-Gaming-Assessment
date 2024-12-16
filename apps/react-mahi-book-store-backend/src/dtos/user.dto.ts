import { User } from '@prisma/client';
import { PrismaUserWithFavoriteBooks } from '@prismaDist/dtos/lib/types/user.types';
import { BaseCreateUserRequestDto, BaseEmailDto, BaseSetUserPasswordRequestDto, BaseUserIdDto, BaseUserLastLoggedInDto, BaseUserPasswordDto, PrismaUserWithFavoriteBooksResponse, SingleUserResponseDto, SingleUserResponseWithFavoriteBooksDto, UsersListResponseDto } from '@prismaDist/dtos/lib/user.dto';
import { IsString, IsDate, IsNumber, IsArray, IsEmail, IsObject, MinLength } from 'class-validator';

// Base classes for shared properties
export class BaseDecoratedUserIdDto implements BaseUserIdDto{
  @IsNumber()
  id: number

  constructor(id: number) {
    this.id = id;
  }
}

export class BaseUserEmailDto implements BaseEmailDto{
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class BasePasswordDto implements BaseUserPasswordDto{
  @IsString()
  @MinLength(6)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

export class BaseGetUserByEmailRequestDto extends BaseUserEmailDto {}

export class GetUserByIdRequestDto extends BaseDecoratedUserIdDto {}

//Extends and implements to enforce DRY
export class SetUserPasswordRequestDto extends BasePasswordDto implements BaseSetUserPasswordRequestDto {
  id: number;

  constructor(id: number, password: string) {
    super(password);  // Pass the password to the base class constructor
    // Delegate ID processing to a BaseDecoratedUserIdDto instance to enforce DRY
    const userIdDto = new BaseDecoratedUserIdDto(id);
    this.id = userIdDto.id; // Extract the validated `id` from the instance
  }
}


export class UpdateUserLastLoggedInDto implements BaseUserLastLoggedInDto {
  @IsDate()
  lastLoggedIn: Date;

  constructor(lastLoggedIn: Date) {
    this.lastLoggedIn = lastLoggedIn;
  }
}

export class CreateUserRequestDto extends BasePasswordDto implements BaseCreateUserRequestDto {
  @IsString()
  name: string;
  //Validation is performed in the constructor
  email: string;

  constructor(name: string, email: string, password: string) {
    super(password)
    this.name = name;
    this.email = new BaseUserEmailDto(email).email;
  }
}

export class UserWithFavoritesDatabaseResponseDto implements SingleUserResponseWithFavoriteBooksDto {
  @IsObject()
  user: PrismaUserWithFavoriteBooks;

  constructor(user: PrismaUserWithFavoriteBooks) {
    this.user = user;
  }
}

export class BaseUserDatabaseResponseDto implements SingleUserResponseDto {
  @IsObject()
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}

export class BaseUsersDatabaseResponseDto implements UsersListResponseDto {
  @IsArray()
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }
}