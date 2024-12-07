import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@react-monorepo/prisma';

@Injectable()
export class UserService {
  async getAllUsers() {
    return prismaOperations.userQuery.getAllUsers();
  }

  async getUserById(id: number) {
    return prismaOperations.userQuery.getUserById(id);
  }

  async addUser(data: { name: string; email: string; password: string }) {
    return prismaOperations.userMutation.addUser(data);
  }

  async removeUserById(id: number) {
    return prismaOperations.userMutation.removeUserById(id);
  }

  async setUserPassword(id: number, password: string) {
    return prismaOperations.userMutation.setUserPassword(id, password);
  }

  async setLastLoggedIn(id: number, date: Date) {
    return prismaOperations.userMutation.setLastLoggedIn(id, date);
  }

  async getUserFavoriteBooks(id: number) {
    return prismaOperations.userQuery.getUserFavoriteBooks(id);
  }
}