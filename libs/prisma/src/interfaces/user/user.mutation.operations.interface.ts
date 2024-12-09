import { UserInterface } from "./user.interface";
import { AddUserParams, RemoveUserByIdParams, SetUserPasswordParams, SetLastLoggedInParams } from "../../interfaces/user/user.mutation.parameters.interface";

export interface IPrismaUserMutationOperations {
  addUser(params: AddUserParams): Promise<UserInterface>;
  removeUserById(params: RemoveUserByIdParams): Promise<UserInterface>;
  setUserPassword(params: SetUserPasswordParams): Promise<UserInterface>;
  setLastLoggedIn(params: SetLastLoggedInParams): Promise<UserInterface>;
}