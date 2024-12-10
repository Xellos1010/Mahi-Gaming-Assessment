import { UserInterface } from "./user.interface";
import { PrismaAddUserParams, PrismaRemoveUserByIdParams, PrismaSetUserPasswordParams, PrismaSetLastLoggedInParams } from "../../interfaces/user/user.mutation.parameters.interface";

export interface IPrismaUserMutationOperations {
  addUser(params: PrismaAddUserParams): Promise<UserInterface>;
  removeUserById(params: PrismaRemoveUserByIdParams): Promise<UserInterface>;
  setUserPassword(params: PrismaSetUserPasswordParams): Promise<UserInterface>;
  setLastLoggedIn(params: PrismaSetLastLoggedInParams): Promise<UserInterface>;
}