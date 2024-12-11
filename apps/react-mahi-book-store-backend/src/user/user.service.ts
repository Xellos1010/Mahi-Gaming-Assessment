import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import { UpdateUserLastLoggedInDto, UpdateUserPasswordDto, UserCreateDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  async getAllUsers() {
    return prismaOperations.userQuery.getAllUsers();
  }

  async getUserById(userId: number) {
    return prismaOperations.userQuery.getUserById({ id: userId });
  }

  async addUser(data: UserCreateDto) {
    return prismaOperations.userMutation.addUser(data);
  }

  async removeUserById(userId: number) {
    return prismaOperations.userMutation.removeUserById({ id: userId });
  }

  async setUserPassword(id: number, data: UpdateUserPasswordDto) {
    return prismaOperations.userMutation.setUserPassword({ where: { id }, password: data as string}); //I want to follow the same implementation pattern as other DTO's so since the picked field as a string and in the future I don't expect password to change from a string then I will cast the data as a string
  }

  async setLastLoggedIn(id: number, data: UpdateUserLastLoggedInDto) {
    return prismaOperations.userMutation.setLastLoggedIn({ where: {id}, lastLoggedIn: data as Date }); //Here there is a specific requirement whereby we need to ensure the Date is formatted a specific way which we will determine the requiements for validation at a later date @ 12/10/2024 8:00pm
  }

  async getUserFavoriteBooks(userId: number) {
    return prismaOperations.userQuery.getUserFavoriteBooks({ id: userId });
  }
}