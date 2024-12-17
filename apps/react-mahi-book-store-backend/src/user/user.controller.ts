// apps/react-mahi-book-store-backend/src/user/user.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { BasePasswordDto, GetUserByIdRequestDto, SetUserPasswordRequestDto, BaseUsersDatabaseResponseDto, BaseUserDatabaseResponseDto, UserWithFavoritesDatabaseResponseDto, CreateUserRequestDto, BaseGetUserByEmailRequestDto, BaseUserEmailDto } from '../dtos/user.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { LogAll } from '@shared-decorators';
import { SingleUserResponseWithFavoriteBooksDto } from '@prismaDist/dtos/lib/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @LogAll()
  async getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @LogAll()
  async getUserById(@Param('id', ParseIntPipe) params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.getUserById(params);
  }

  @Post()
  @LogAll()
  async addUser(@Body() data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.addUser(data as CreateUserRequestDto);
  }

  @Patch(':id/password')
  @LogAll()
  async setUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() { password }: BasePasswordDto,
  ): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.setUserPassword(new SetUserPasswordRequestDto(id, password));
  }

  @Get(':id/favorites')
  @LogAll()
  getUserFavoriteBooks(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    return this.userService.getUserFavoriteBooks(new GetUserByIdRequestDto(id));
  }

  @Delete(':id')
  @LogAll()
  async removeUserById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.removeUserById(new GetUserByIdRequestDto(id));
  }

  @Get('email')
  @LogAll()
  async getUserByEmailIncludeFavoriteBooks(@Query() query: BaseUserEmailDto): Promise<ApiResponseDto<SingleUserResponseWithFavoriteBooksDto>> {
    return await this.userService.getUserByEmailIncludeFavoriteBooks(query);
  }
}
