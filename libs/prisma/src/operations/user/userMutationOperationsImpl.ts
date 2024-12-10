import { prisma } from "../../client";
import type { User } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.
import { IUserMutationOperations } from "../../interfaces/user/user.mutation.operations.interface";
import { AddUserParams, UpdateUserParams, RemoveUserByIdParams, SetUserPasswordParams, SetLastLoggedInParams } from "../../shared/types/user.types";

class PrismaUserMutationOperationsImpl implements IUserMutationOperations {
  async addUser(params: AddUserParams): Promise<User> {
    return await prisma.user.create({
      data : {
        ...params
      }
    });
  }

  async updateUser({where, data}: UpdateUserParams): Promise<User> {
    return await prisma.user.update({where,data});
  }

  //***We are not using the spread operator in the following functions as there are no changes in future functionality of these funcitons requiring additional points of data.*/
  async removeUserById({ id }: RemoveUserByIdParams): Promise<User> {
    return await prisma.user.delete({ where: { id } });
  }

  async setUserPassword({ where, password }: SetUserPasswordParams): Promise<User> {
    return await prisma.user.update({ where, data: { password } });
  }

  async setLastLoggedIn({ where, lastLoggedIn }: SetLastLoggedInParams): Promise<User> {
    return await prisma.user.update({ where, data: { lastLoggedIn } });
  }
  //****/
}

export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();
