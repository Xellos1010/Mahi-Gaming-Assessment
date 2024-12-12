import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import { UpdateUserLastLoggedInDto, UpdateUserPasswordDto,  } from '../dtos/user.dto';
import { CreateUserDto } from '@dto/auth.dto';

@Injectable()
export class UserService {
  async getAllUsers() {
    return prismaOperations.userQuery.getAllUsers();
  }

  async getUserById(id: number) {
    return prismaOperations.userQuery.getUserById({ id });
  }

  async getUserByEmail(email: string) {
    return prismaOperations.userQuery.getUserByEmail({ email });
  }

  async addUser(data: CreateUserDto) {
    return prismaOperations.userMutation.addUser(data);
  }

  async removeUserById(userId: number) {
    return prismaOperations.userMutation.removeUserById({ id: userId });
  }

  async setUserPassword(id: number, data: UpdateUserPasswordDto) {
    return prismaOperations.userMutation.setUserPassword({ where: { id }, password: data.password });
  }

  async setLastLoggedIn(id: number, data: UpdateUserLastLoggedInDto) {
    return prismaOperations.userMutation.setLastLoggedIn({ where: {id}, lastLoggedIn: data as Date }); //Here there is a specific requirement whereby we need to ensure the Date is formatted a specific way which we will determine the requiements for validation at a later date @ 12/10/2024 8:00pm
  }

  async getUserFavoriteBooks(userId: number) {
    return prismaOperations.userQuery.getUserFavoriteBooks({ id: userId });
  }
}