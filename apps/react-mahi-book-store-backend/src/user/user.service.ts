import { Injectable } from '@nestjs/common';
import { prismaOperations } from '@prismaDist/index';
import { AddUserParams, RemoveUserByIdParams, SetLastLoggedInParams, SetUserPasswordParams } from '@prismaDist/interfaces/user/user.mutation.parameters.interface';
import { GetUserByIdParams, GetUserFavoriteBooksParams } from '@prismaDist/interfaces/user/user.query.parameters.interface';

@Injectable()
export class UserService {
  async getAllUsers() {
    return prismaOperations.userQuery.getAllUsers();
  }

  async getUserById(params: GetUserByIdParams) {
    return prismaOperations.userQuery.getUserById(params);
  }

  async addUser(params: AddUserParams) {
    return prismaOperations.userMutation.addUser(params);
  }

  async removeUserById(params: RemoveUserByIdParams) {
    return prismaOperations.userMutation.removeUserById(params);
  }

  async setUserPassword(params: SetUserPasswordParams) {
    return prismaOperations.userMutation.setUserPassword(params);
  }

  async setLastLoggedIn(params: SetLastLoggedInParams) {
    return prismaOperations.userMutation.setLastLoggedIn(params);
  }

  async getUserFavoriteBooks(params: GetUserFavoriteBooksParams) {
    return prismaOperations.userQuery.getUserFavoriteBooks(params);
  }
}