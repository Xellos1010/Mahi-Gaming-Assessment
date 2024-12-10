import { AddUserParams, RemoveUserByIdParams, UpdateUserParams, SetUserPasswordParams, SetLastLoggedInParams } from "../../shared/types/user.types";
import type { User } from "@prisma/client"; //We are importing the generated book type and utilizing this for the return.

export interface IUserMutationOperations {
  addUser(params: AddUserParams): Promise<User>;
  removeUserById(params: RemoveUserByIdParams): Promise<User | null>;
  updateUser(params: UpdateUserParams): Promise<User>;
  setUserPassword(params: SetUserPasswordParams): Promise<User>;
  setLastLoggedIn(params: SetLastLoggedInParams): Promise<User>;
}