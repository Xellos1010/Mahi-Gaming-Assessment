import { prisma } from "../../client";
import { UserInterface } from "../../interfaces/user/user.interface";
import { IPrismaUserMutationOperations } from "../../interfaces/user/user.mutation.operations.interface";
import { AddUserParams, RemoveUserByIdParams, SetUserPasswordParams, SetLastLoggedInParams } from "../../interfaces/user/user.mutation.parameters.interface";

class PrismaUserMutationOperationsImpl implements IPrismaUserMutationOperations {
  async addUser(params: AddUserParams): Promise<UserInterface> {
    return await prisma.user.create({
      data: {
        ...params,
        lastLoggedIn: null, // Initialize `lastLoggedIn` with "" empty string as the user is registered but still needs to log in for the first time.
      },
    });
  }

  //***We are not using the spread operator in the following functions as there are no changes in future functionality of these funcitons requiring additional points of data.*/
  async removeUserById({ id }: RemoveUserByIdParams): Promise<UserInterface> {
    return await prisma.user.delete({ where: { id } });
  }

  async setUserPassword({ id, password }: SetUserPasswordParams): Promise<UserInterface> {
    return await prisma.user.update({ where: { id }, data: { password } });
  }

  async setLastLoggedIn({ id, lastLoggedIn }: SetLastLoggedInParams): Promise<UserInterface> {
    return await prisma.user.update({ where: { id }, data: { lastLoggedIn } });
  }
  //****/
}

export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();
