import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import {
  AddUserRequestDto,
  BaseUserDatabaseResponseDto,
  BaseUsersApiResponseDto,
  BaseGetUserByIdRequestDto,
  BaseGetUserByEmailRequestDto,
  UserWithFavoritesDatabaseResponseDto,
  SetUserPasswordRequestDto,
  BaseUserByIdRequestDto
} from '@dto/user.dto';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import {
  PrismaAddUserParams,
  PrismaGetUserByEmailParams
} from '@prismaDist/shared/types/user.types';
import { BaseBooksDatabaseResponseDto } from '@dto/book.dto';
import { IUserServiceInterface } from '../interfaces/databaseService/user.service.interface';

@Injectable()
export class UserService implements IUserServiceInterface {
  @HandleServiceError('Fetching all users')
  async getAllUsers(): Promise<BaseUsersApiResponseDto> {
    return await prismaOperations.userQuery.getAllUsers() as BaseUsersApiResponseDto;
  }

  @HandleServiceError('Fetching user by ID')
  async getUserById({ id }: BaseGetUserByIdRequestDto): Promise<BaseUserDatabaseResponseDto> {
    const user = await prismaOperations.userQuery.getUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return user as BaseUserDatabaseResponseDto;
  }

  @HandleServiceError('Fetching user by email with favorite books')
  async getUserByEmailIncludeFavoriteBooks({ email }: BaseGetUserByEmailRequestDto): Promise<UserWithFavoritesDatabaseResponseDto> {
    const user = await prismaOperations.userQuery.getUserByEmailIncludeFavoriteBooks({ email } as PrismaGetUserByEmailParams);
    if (!user) {
      throw new NotFoundException(`User with email  ${email}  not found`);
    }
    return user as UserWithFavoritesDatabaseResponseDto;
  }

  @HandleServiceError('Adding a new user')
  async addUser(data: AddUserRequestDto): Promise<BaseUserDatabaseResponseDto> {
    return await prismaOperations.userMutation.addUser(data as PrismaAddUserParams) as BaseUserDatabaseResponseDto;
  }

  @HandleServiceError('Removing user by ID')
  async removeUserById({ id }: BaseGetUserByIdRequestDto): Promise<BaseUserDatabaseResponseDto> {
    const user = await prismaOperations.userMutation.removeUserById({ id });
    if (!user) {
      throw new NotFoundException(`User with ID  ${id}  not found`);
    }
    return user as BaseUserDatabaseResponseDto;
  }

  @HandleServiceError('Setting user password')
  async setUserPassword({ id, password }: SetUserPasswordRequestDto): Promise<BaseUserDatabaseResponseDto> {
    return await prismaOperations.userMutation.setUserPassword({ where: { id }, password }) as BaseUserDatabaseResponseDto;
  }

  @HandleServiceError('Setting last logged-in time for user')
  async setLastLoggedInNow({ id }: BaseUserByIdRequestDto): Promise<BaseUserDatabaseResponseDto> {
    return await prismaOperations.userMutation.setLastLoggedInNow({ where: { id } }) as BaseUserDatabaseResponseDto;
  }

  @HandleServiceError('Fetching user favorite books')
  async getUserFavoriteBooks({ id }: BaseGetUserByIdRequestDto): Promise<BaseBooksDatabaseResponseDto> {
    const books = await prismaOperations.userQuery.getUserFavoriteBooks({ id });
    if (!books) {
      throw new NotFoundException(`No favorite books found for user with ID  ${id} `);
    }
    return books as BaseBooksDatabaseResponseDto;
  }
}
