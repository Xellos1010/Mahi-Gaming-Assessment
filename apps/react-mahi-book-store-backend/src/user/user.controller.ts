// apps/react-mahi-book-store-backend/src/user/user.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { BasePasswordDto, GetUserByIdRequestDto, SetUserPasswordRequestDto, BaseUsersDatabaseResponseDto, BaseUserDatabaseResponseDto, UserWithFavoritesDatabaseResponseDto, CreateUserRequestDto } from '../dtos/user.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  ////@HandleControllerError()
  async getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  ////@HandleControllerError()
  async getUserById(@Param('id', ParseIntPipe) params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.getUserById(params);
  }

  @Post()
  ////@HandleControllerError()
  async addUser(@Body() data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.addUser(data as CreateUserRequestDto);
  }

  @Patch(':id/password')
  ////@HandleControllerError()
  async setUserPassword(
    @Param('id', ParseIntPipe) { id }: GetUserByIdRequestDto,
    @Body() { password }: BasePasswordDto,
  ): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.setUserPassword(new SetUserPasswordRequestDto(id, password));
  }

  @Get(':id/favorites')
  //////@HandleControllerError('Get user favorite books')
  getUserFavoriteBooks(@Param('id', ParseIntPipe) params: GetUserByIdRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    return this.userService.getUserFavoriteBooks(params);
  }

  @Delete(':id')
  ////@HandleControllerError()
  async removeUserById(@Param('id', ParseIntPipe) params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.removeUserById(params);
  }
}
