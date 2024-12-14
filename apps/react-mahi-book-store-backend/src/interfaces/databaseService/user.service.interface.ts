import { BaseBooksDatabaseResponseDto } from "@dto/book.dto";
import { AddUserRequestDto, BaseUserDatabaseResponseDto, BaseUsersApiResponseDto, BaseGetUserByIdRequestDto, BaseGetUserByEmailRequestDto, UserWithFavoritesDatabaseResponseDto, SetUserPasswordRequestDto, BaseUserByIdRequestDto } from "@dto/user.dto";



export interface IUserServiceInterface {
    addUser(data: AddUserRequestDto): Promise<BaseUserDatabaseResponseDto>;
    removeUserById(params: BaseGetUserByIdRequestDto): Promise<BaseUserDatabaseResponseDto>;
    setUserPassword(params: SetUserPasswordRequestDto): Promise<BaseUserDatabaseResponseDto>;
    setLastLoggedInNow(params: BaseUserByIdRequestDto): Promise<BaseUserDatabaseResponseDto>;
    getAllUsers(): Promise<BaseUsersApiResponseDto>;
    getUserById(params: BaseGetUserByIdRequestDto): Promise<BaseUserDatabaseResponseDto>;
    getUserByEmailIncludeFavoriteBooks(params: BaseGetUserByEmailRequestDto): Promise<UserWithFavoritesDatabaseResponseDto>;
    getUserFavoriteBooks(params: BaseGetUserByIdRequestDto): Promise<BaseBooksDatabaseResponseDto>;
  }
  