// apps/react-mahi-book-store-backend/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import {
  CreateUserRequestDto,
  BaseUserDatabaseResponseDto,
  BaseUsersDatabaseResponseDto,
  BaseGetUserByEmailRequestDto,
  UserWithFavoritesDatabaseResponseDto,
  SetUserPasswordRequestDto,
  GetUserByIdRequestDto
} from '@nestDtos/user.dto';
import { IUserServiceInterface } from '../interfaces/databaseService/user.service.interface';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import { SingleUserResponseWithFavoriteBooksDto } from '@prismaDist/dtos/lib/user.dto';

@Injectable()
export class UserService implements IUserServiceInterface {

  @HandleServiceError()
  async getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUsersDatabaseResponseDto>(await prismaOperations.userQuery.getAllUsers() as BaseUsersDatabaseResponseDto);
  }

  @HandleServiceError()
  async getUserById({ id }: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    const user = await prismaOperations.userQuery.getUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(user as BaseUserDatabaseResponseDto);
  }

  @HandleServiceError()
  async getUserByEmailIncludeFavoriteBooks(params: BaseGetUserByEmailRequestDto): Promise<ApiResponseDto<SingleUserResponseWithFavoriteBooksDto>> {
    const user = await prismaOperations.userQuery.getUserByEmailIncludeFavoriteBooks(params);
    if (!user) {
      throw new NotFoundException(`User with email ${params.email}  not found`);
    }
    return wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(user as SingleUserResponseWithFavoriteBooksDto);
  }

  @HandleServiceError()
  async addUser(data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(await prismaOperations.userMutation.addUser(data as CreateUserRequestDto) as BaseUserDatabaseResponseDto);
  }

  @HandleServiceError()
  async removeUserById({ id }: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    const user = await prismaOperations.userMutation.removeUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(user as BaseUserDatabaseResponseDto);
  }

  @HandleServiceError()
  async setUserPassword({ id, password }: SetUserPasswordRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    const params = {
      where: { id },
      password: password
    };
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(
      await prismaOperations.userMutation.setUserPassword(params) as BaseUserDatabaseResponseDto
    );
  }

  @HandleServiceError()
  async setLastLoggedInNow(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return wrapResponseSuccess<BaseUserDatabaseResponseDto>(
      await prismaOperations.userMutation.setLastLoggedIn(params) as BaseUserDatabaseResponseDto
    );
  }

  async setLastLoggedIn(id: number, data: { lastLoggedIn: Date; }) {
    throw new Error('Method not implemented.');
  }

  @HandleServiceError()
  async getUserFavoriteBooks(params: GetUserByIdRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    const userWithBooks = await prismaOperations.userQuery.getUserFavoriteBooks(params) as SingleUserResponseWithFavoriteBooksDto;
    if (!userWithBooks || (Array.isArray(userWithBooks.user.favoriteBooks) && userWithBooks.user.favoriteBookslength === 0)) {
      throw new NotFoundException(`No favorite books found for user with ID  ${params.id} `);
    }
    return wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(userWithBooks as UserWithFavoritesDatabaseResponseDto);
  }
}
