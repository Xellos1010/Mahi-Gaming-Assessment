import { BaseUserDatabaseResponseDto, GetUserByIdRequestDto, UserWithFavoritesDatabaseResponseDto } from '@nestDtos/user.dto';
import { BaseApiService } from './base-api-service';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { BaseCreateUserRequestDto, BaseUserUpdateDto, UsersListResponseDto } from '@prismaDist/dtos';
import { LogAll } from '@shared-decorators';

export class UserService extends BaseApiService {
  constructor() {
    super('http://localhost:3000/api/users');
  }

  async fetchFavorites(id: number): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    return this.handleRequest<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>('get', `${id}/favorites`);
  }

  async fetchAll(): Promise<ApiResponseDto<UsersListResponseDto>> {
    return this.handleRequest<ApiResponseDto<UsersListResponseDto>>('get', '');
  }

  async fetchById(userId: number): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return this.handleRequest<ApiResponseDto<BaseUserDatabaseResponseDto>>('get', `${userId}`);
  }

  @LogAll()
  async create(userData: BaseCreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return this.handleRequest<ApiResponseDto<BaseUserDatabaseResponseDto>>('post', '', userData);
  }

  async update(userId: number, userData: BaseUserUpdateDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return this.handleRequest<ApiResponseDto<BaseUserDatabaseResponseDto>>('patch', `${userId}`, userData);
  }

  async remove(userId: number): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return this.handleRequest<ApiResponseDto<BaseUserDatabaseResponseDto>>('delete', `${userId}`);
  }
}