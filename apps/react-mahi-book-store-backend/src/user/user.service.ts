// apps/react-mahi-book-store-backend/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import {
  AddUserRequestDto,
  BaseUserDatabaseResponseDto,
  BaseUsersDatabaseResponseDto,
  BaseGetUserByIdRequestDto,
  BaseGetUserByEmailRequestDto,
  UserWithFavoritesDatabaseResponseDto,
  SetUserPasswordRequestDto,
  BaseUserByIdRequestDto
} from '@dto/user.dto';
import {
  PrismaAddUserParams,
  PrismaGetUserByEmailParams,
  PrismaGetUserByIdFavoriteBooksParams,
  PrismaSetLastLoggedInParams,
  PrismaSetUserPasswordParams
} from '@prismaDist/shared/types/user.types';
import { BaseBooksDatabaseResponseDto } from '@dto/book.dto';
import { IUserServiceInterface } from '../interfaces/databaseService/user.service.interface';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { PrismaUpdateUserResponse } from '@prismaDist/interfaces/user/user.mutation.operations.interface';

@Injectable()
export class UserService implements IUserServiceInterface {
  ////@HandleServiceError('Fetching all users')
  //@HandleServiceError()
  async getAllUsers(): Promise<BaseApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUsersDatabaseResponseDto>(await prismaOperations.userQuery.getAllUsers() as BaseUsersDatabaseResponseDto);
  }

  ////@HandleServiceError('Fetching user by ID')
  //@HandleServiceError()
  async getUserById({ id }: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    const user = await prismaOperations.userQuery.getUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(user as BaseUserDatabaseResponseDto);
  }

  ////@HandleServiceError('Fetching user by email with favorite books')
  //@HandleServiceError()
  async getUserByEmailIncludeFavoriteBooks({ email }: BaseGetUserByEmailRequestDto): Promise<BaseApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    const user = await prismaOperations.userQuery.getUserByEmailIncludeFavoriteBooks({ email } as PrismaGetUserByEmailParams);
    if (!user) {
      throw new NotFoundException(`User with email  ${email}  not found`);
    }
    return wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(user as UserWithFavoritesDatabaseResponseDto);
  }

  ////@HandleServiceError('Adding a new user')
  //@HandleServiceError()
  async addUser(data: AddUserRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(await prismaOperations.userMutation.addUser(data as PrismaAddUserParams) as BaseUserDatabaseResponseDto);
  }

  ////@HandleServiceError('Removing user by ID')
  //@HandleServiceError()
  async removeUserById({ id }: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    const user = await prismaOperations.userMutation.removeUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(user as BaseUserDatabaseResponseDto);
  }

  ////@HandleServiceError('Setting user password')
  //@HandleServiceError()
  async setUserPassword({ id, password }: SetUserPasswordRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    const params: PrismaSetUserPasswordParams = {
      where: { id },
      password: password
    };
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(
      await prismaOperations.userMutation.setUserPassword(params) as BaseUserDatabaseResponseDto
    );
  }

  ////@HandleServiceError('Setting last logged-in time for user')
  //@HandleServiceError()
  async setLastLoggedInNow({ id }: BaseUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    const params: PrismaSetLastLoggedInParams = {
      where: { id },
      lastLoggedIn: new Date()
    };
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(
      await prismaOperations.userMutation.setLastLoggedIn(params) as PrismaUpdateUserResponse
    );
  }

  async setLastLoggedIn(id: number, data: { lastLoggedIn: Date; }) {
    throw new Error('Method not implemented.');
  }

  ////@HandleServiceError('Fetching user favorite books')
  //@HandleServiceError()
  async getUserFavoriteBooks({ id }: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseBooksDatabaseResponseDto>> {
    const params: PrismaGetUserByIdFavoriteBooksParams = { id };
    const books = await prismaOperations.userQuery.getUserFavoriteBooks(params) as BaseBooksDatabaseResponseDto;
    if (!books || (Array.isArray(books) && books.length === 0)) {
      throw new NotFoundException(`No favorite books found for user with ID  ${id} `);
    }
    return wrapResponseSuccess<BaseBooksDatabaseResponseDto>(books as BaseBooksDatabaseResponseDto);
  }
}
