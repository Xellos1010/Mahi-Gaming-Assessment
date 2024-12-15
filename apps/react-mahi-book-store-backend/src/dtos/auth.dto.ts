// dtos/auth.dto.ts 
import { IsEmail, IsString, MinLength, IsObject } from 'class-validator';
import type { Book, User } from '@prisma/client';
import { AddUserRequestDto, BaseUserPasswordDto } from './user.dto';
import { PrismaUserResponseWithFavoriteBooks } from '@prismaDist/interfaces/user/user.types';
import { BaseApiResponseDto } from './base.response.dto';

export class CreateUserRequestDto extends AddUserRequestDto {
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
  }
}

export class BaseCreateUserDatabaseResponseDto {
  @IsObject()
  user: User;

  @IsString()
  accessToken: string;

  constructor(user: User, accessToken: string) {
    this.user = user;
    this.accessToken = accessToken;
  }
}

export class LoginUserRequestDto extends BaseUserPasswordDto {
  @IsEmail()
  email: string;

  constructor(email: string, password: string) {
    super(password);  // Pass the password to the base class constructor 
    this.email = email;  // Set the email property 
  }
}

//TODO: Technically this does not adhere to SRP but in the interest of ensuring all features are implemented will forgoe this part until all bonus features are implemented and will circle back to this time willing
export class LoginUserDatabaseResponseDto extends BaseCreateUserDatabaseResponseDto {
  @IsObject()
  override user: PrismaUserResponseWithFavoriteBooks;

  constructor(user: PrismaUserResponseWithFavoriteBooks, accessToken: string) {
    super(user, accessToken); // Casting to User for the super constructor call
    this.user = user; // Set the user property in the subclass
  }
}

export class LoginUserDatabaseResponseDtoMod {
  @IsObject()
  user: PrismaUserResponseWithFavoriteBooks;

  @IsString()
  accessToken: string;

  constructor(user: PrismaUserResponseWithFavoriteBooks, accessToken: string) {
    this.accessToken = accessToken;
    this.user = user;
  }
}

// export class CreateUserApiResponseDto extends BaseApiResponseDto<BaseCreateUserDatabaseResponseDto> {
//   constructor(status: boolean, user: User, accessToken: string, error?: string) {
//     super(status, { user, accessToken }, error); // Set success to true and populate the data
//   }
// }

// export class LoginUserApiResponseDto extends BaseApiResponseDto<LoginUserDatabaseResponseDto> {
//   constructor(
//     status: boolean,
//     user: PrismaUserResponseWithFavoriteBooks,
//     accessToken: string,
//     error?: string
//   ) {
//     const data = new LoginUserDatabaseResponseDto(user, accessToken); // Create the expected type
//     super(status, data, error);
//   }
// }