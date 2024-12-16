import { IsString, IsObject, IsEmail } from 'class-validator';
import type { User } from '@prisma/client';
import { BasePasswordDto, UserWithFavoritesDatabaseResponseDto } from './user.dto';
import { BaseCreateUserDatabaseResponseDto, BaseLoginUserRequestDto, BaseLoginUserDatabaseResponseDto, SingleUserResponseWithFavoriteBooksDto } from '@prismaDist/dtos';
import { PrismaUserWithFavoriteBooks } from '@prismaDist/dtos/lib/types/user.types';


export class BaseAccessTokenResponse implements BaseAccessTokenResponse {
  @IsString()
  accessToken: string;

  constructor( accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class CreateUserDatabaseResponseDto extends BaseAccessTokenResponse implements BaseCreateUserDatabaseResponseDto{
  @IsObject()
  user: User;

  constructor( user: User, accessToken: string) {
    super(accessToken);
    this.user = user;
  }
}

export class LoginUserRequestDto extends BasePasswordDto implements BaseLoginUserRequestDto{
  @IsEmail()
  email: string;

  constructor(email: string, password: string) {
    super(password);  // Pass the password to the base class constructor
    // this.email = new BaseUserEmailDto(email).email;  // Set the email property 
    this.email = email;  // Set the email property 
  }
}

export class LoginUserDatabaseResponseDto extends BaseAccessTokenResponse implements BaseLoginUserDatabaseResponseDto {
  user: PrismaUserWithFavoriteBooks;

  constructor(user: PrismaUserWithFavoriteBooks, accessToken: string) {
    super(accessToken); // Casting to access Token for the super constructor call
    this.user = new UserWithFavoritesDatabaseResponseDto(user).user; // Set the user property in the subclass
  }
}