import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserPasswordDto, UpdateUserLastLoggedInDto } from '../dtos/user.dto';
import { CreateUserDto } from '@dto/auth.dto';

// all routes are in this script for expediency

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  @Post()
  async addUser(@Body() data: CreateUserDto) {
    try {
      return await this.userService.addUser(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/password')
  async setUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserPasswordDto,
  ) {
    try {
      return await this.userService.setUserPassword(id, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/lastLoggedIn')
  async setLastLoggedIn(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserLastLoggedInDto,
  ) {
    try {
      return await this.userService.setLastLoggedIn(id, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id/favorites')
  getUserFavoriteBooks(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.userService.getUserFavoriteBooks(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async removeUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.removeUserById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}