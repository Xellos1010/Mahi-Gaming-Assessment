import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UpdateUserPasswordDto, UpdateUserLastLoggedInDto } from '../dtos/user.dto';

// all routes are in this script for expediency

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  addUser(@Body() data: UserCreateDto) {
    return this.userService.addUser(data);
  }

  @Delete(':id')
  removeUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUserById(id);
  }

  @Patch(':id/password')
  setUserPassword(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserPasswordDto) {
    return this.userService.setUserPassword(id, data);
  }

  @Patch(':id/lastLoggedIn')
  setLastLoggedIn(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserLastLoggedInDto) {
    return this.userService.setLastLoggedIn(id, data);
  }

  @Get(':id/favorites')
  getUserFavoriteBooks(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserFavoriteBooks(id);
  }
}