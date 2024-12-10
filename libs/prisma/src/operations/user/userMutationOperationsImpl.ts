import { prisma } from "../../client";
import { UserInterface } from "../../interfaces/user/user.interface";
import { IPrismaUserMutationOperations } from "../../interfaces/user/user.mutation.operations.interface";
import { PrismaAddUserParams, PrismaRemoveUserByIdParams, PrismaSetUserPasswordParams, PrismaSetLastLoggedInParams, PrismaUpdateUserParams } from "../../interfaces/user/user.mutation.parameters.interface";

class PrismaUserMutationOperationsImpl implements IPrismaUserMutationOperations {
  async addUser(params: PrismaAddUserParams): Promise<UserInterface> {
    return await prisma.user.create({
      data : {
        ...params
      }
    });
  }

  async updateUser({ id: userId, data }: PrismaUpdateUserParams): Promise<UserInterface> {
    return await prisma.book.update({ where: { id: userId }, data });
  }

  //***We are not using the spread operator in the following functions as there are no changes in future functionality of these funcitons requiring additional points of data.*/
  async removeUserById({ id }: PrismaRemoveUserByIdParams): Promise<UserInterface> {
    return await prisma.user.delete({ where: { id } });
  }

  async setUserPassword({ id, password }: PrismaSetUserPasswordParams): Promise<UserInterface> {
    return await prisma.user.update({ where: { id }, data: { password } });
  }

  async setLastLoggedIn({ id, lastLoggedIn }: PrismaSetLastLoggedInParams): Promise<UserInterface> {
    return await prisma.user.update({ where: { id }, data: { lastLoggedIn } });
  }
  //****/
}

export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();
