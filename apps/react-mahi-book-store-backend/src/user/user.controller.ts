// apps/react-mahi-book-store-backend/src/user/user.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserPasswordDto, UpdateUserLastLoggedInDto } from '../dtos/user.dto';
import { CreateUserRequestDto } from '@dto/auth.dto';
import { HandleControllerError } from '../decorators/errorHandling/controller.error.handler';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @HandleControllerError('Get all users')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @HandleControllerError('Get user by ID')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @HandleControllerError('Add a new user')
  async addUser(@Body() data: CreateUserRequestDto) {
    return await this.userService.addUser(data);
  }

  @Patch(':id/password')
  @HandleControllerError('Set user password')
  async setUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserPasswordDto,
  ) {
    return await this.userService.setUserPassword(id, data);
  }

  @Patch(':id/lastLoggedIn')
  @HandleControllerError('Set last logged in')
  async setLastLoggedIn(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserLastLoggedInDto,
  ) {
    return await this.userService.setLastLoggedIn(id, data);
  }

  @Get(':id/favorites')
  @HandleControllerError('Get user favorite books')
  getUserFavoriteBooks(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserFavoriteBooks(id);
  }

  @Delete(':id')
  @HandleControllerError('Remove user by ID')
  async removeUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.removeUserById(id);
  }
}
