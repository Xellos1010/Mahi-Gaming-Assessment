// apps/react-mahi-book-store-backend/src/user/user.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserPasswordDto, UpdateUserLastLoggedInDto, BaseGetUserByIdRequestDto, SetUserPasswordRequestDto, AddUserRequestDto, BaseUsersDatabaseResponseDto, BaseUserDatabaseResponseDto } from '../dtos/user.dto';
import { CreateUserRequestDto } from '@dto/auth.dto';
import { HandleControllerError } from '../decorators/errorHandling/controller.error.handler';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { BaseBooksDatabaseResponseDto } from '@dto/book.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  //////@HandleControllerError('Get all users')
  ////@HandleControllerError()
  async getAllUsers(): Promise<BaseApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  //////@HandleControllerError('Get user by ID')
  ////@HandleControllerError()
  async getUserById(@Param('id', ParseIntPipe) params: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.getUserById(params);
  }

  @Post()
  //////@HandleControllerError('Add a new user')
  ////@HandleControllerError()
  async addUser(@Body() data: CreateUserRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.addUser(data as AddUserRequestDto);
  }

  @Patch(':id/password')
  //////@HandleControllerError('Set user password')
  ////@HandleControllerError()
  async setUserPassword(
    @Param('id', ParseIntPipe) { id }: BaseGetUserByIdRequestDto,
    @Body() { password }: UpdateUserPasswordDto,
  ): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.setUserPassword(new SetUserPasswordRequestDto(id, password));
  }

  @Get(':id/favorites')
  //////@HandleControllerError('Get user favorite books')
  getUserFavoriteBooks(@Param('id', ParseIntPipe) params: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseBooksDatabaseResponseDto>> {
    return this.userService.getUserFavoriteBooks(params);
  }

  @Delete(':id')
  //////@HandleControllerError('Remove user by ID')
  ////@HandleControllerError()
  async removeUserById(@Param('id', ParseIntPipe) params: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.removeUserById(params);
  }
}
