import { prisma } from "../../client";
import { IUserQueryOperations } from "../../interfaces/user/user.query.operations.interface";
import {
  SingleUserResponseDto,
  BaseUserIdDto,
  BaseEmailDto,
  PrismaUserWithFavoriteBooksResponse,
  UsersListResponseDto
} from "../../dtos";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";

export class PrismaUserQueryOperationsImpl implements IUserQueryOperations {
  @HandleDatabaseError('Get All Users')
  async getAllUsers(): Promise<UsersListResponseDto> {
    const users = await prisma.user.findMany();
    return { users };
  }

  @HandleDatabaseError('Get User By ID')
  async getUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!user) {
      throw new Error(`User not found with ID: ${params.id}`);
    }

    return { user };
  }

  @HandleDatabaseError('Get User By Email')
  async getUserByEmail(params: BaseEmailDto): Promise<SingleUserResponseDto> {
    const user = await prisma.user.findUnique({
      where: { email: params.email }
    });

    if (!user) {
      throw new Error(`User not found with email: ${params.email}`);
    }

    return { user };
  }

  @HandleDatabaseError('Get User Favorite Books')
  async getUserFavoriteBooks(params: BaseUserIdDto): Promise<PrismaUserWithFavoriteBooksResponse> {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { favoriteBooks: true },
    });

    if (!user) {
      throw new Error(`User not found with ID: ${params.id}`);
    }

    return {
      user
    } as PrismaUserWithFavoriteBooksResponse;
  }

  @HandleDatabaseError('Get User By Email with Favorite Books')
  async getUserByEmailIncludeFavoriteBooks(
    params: BaseEmailDto
  ): Promise<PrismaUserWithFavoriteBooksResponse> {
    const user = await prisma.user.findUnique({
      where: { email: params.email },
      include: { favoriteBooks: true }
    });

    if (!user) {
      throw new Error(`User not found with email: ${params.email}`);
    }

    return { user };
  }
}

export const prismaUserQueryOperations = new PrismaUserQueryOperationsImpl();