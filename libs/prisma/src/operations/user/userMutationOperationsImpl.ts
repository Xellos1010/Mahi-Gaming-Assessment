import { prisma } from "../../client";
import { IUserMutationOperations } from "../../interfaces/user/user.mutation.operations.interface";
import {
  BaseCreateUserRequestDto,
  SingleUserResponseDto,
  BaseUserIdDto
} from "../../dtos";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";
import { PrismaDatabaseSetUserPasswordParams, PrismaDatabaseUpdateUserParams } from "../../types";

export class PrismaUserMutationOperationsImpl implements IUserMutationOperations {
  @HandleDatabaseError('Add User')
  async addUser(params: BaseCreateUserRequestDto): Promise<SingleUserResponseDto> {
    const user = await prisma.user.create({
      data: { ...params }
    });
    return { user };
  }

  @HandleDatabaseError('Remove User')
  async removeUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    const user = await prisma.user.delete({
      where: { id: params.id }
    });
    return { user };
  }

  @HandleDatabaseError('Update User')
  async updateUser(params: PrismaDatabaseUpdateUserParams): Promise<SingleUserResponseDto> {
    const user = await prisma.user.update({
      where: params.where,
      data: params.data
    });
    return { user };
  }

  @HandleDatabaseError('Set User Password')
  async setUserPassword(params: PrismaDatabaseSetUserPasswordParams): Promise<SingleUserResponseDto> {
    const user = await prisma.user.update({
      where: params.where,
      data: { password: params.password }
    });
    return { user };
  }

  @HandleDatabaseError('Set Last Logged In')
  async setLastLoggedIn(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { lastLoggedIn: new Date() }
    });
    return { user };
  }

  @HandleDatabaseError('Set Last Logged In Now')
  async setLastLoggedInNow(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    return this.setLastLoggedIn(params);
  }
}

export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();