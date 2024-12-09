import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

// all routes are in this script for expediency

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  addUser(@Body() data: { name: string; email: string; password: string }) {
    return this.userService.addUser(data);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.removeUserById(id);
  }

  @Patch(':id/password')
  setUserPassword(@Param('id') id: number, @Body() data: { password: string }) {
    return this.userService.setUserPassword(id, data.password);
  }

  @Patch(':id/lastLoggedIn')
  setLastLoggedIn(@Param('id') id: number, @Body() data: { lastLoggedIn: Date }) {
    return this.userService.setLastLoggedIn(id, data.lastLoggedIn);
  }

  @Get(':id/favorites')
  getUserFavoriteBooks(@Param('id') id: number) {
    return this.userService.getUserFavoriteBooks(id);
  }
}
