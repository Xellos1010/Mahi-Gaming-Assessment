import { BaseCreateUserRequestDto, SingleUserResponseDto, BaseUserIdDto, BaseSetUserPasswordRequestDto } from "../../dtos";
import type { PrismaDatabaseSetUserPasswordParams, PrismaDatabaseUpdateUserParams } from "../../types/user.types";

export interface IUserMutationOperations {
  addUser(params: BaseCreateUserRequestDto): Promise<SingleUserResponseDto>;
  removeUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto>;
  updateUser(params: PrismaDatabaseUpdateUserParams): Promise<SingleUserResponseDto>;
  setUserPassword(params: PrismaDatabaseSetUserPasswordParams): Promise<SingleUserResponseDto>;
  setLastLoggedIn(params: BaseUserIdDto): Promise<SingleUserResponseDto>;
  setLastLoggedInNow(params: BaseUserIdDto): Promise<SingleUserResponseDto>;
}

//These have been removed as the response objects have been reduces to Single or BookList responses. I will leave these here in the future so that if requirements change and more specific responses are required then these can be uncommented and implemented.
// Exportable response interfaces for each method
// export interface PrismaAddUserResponse {
//   user: User;
// }

// export interface PrismaRemoveUserByIdResponse {
//   user: User;
// }

// export interface PrismaUpdateUserResponse {
//   user: User;
// }

// export interface PrismaSetUserPasswordResponse {
//   user: User;
// }

// export interface PrismaSetLastLoggedInResponse {
//   user: User;
// }