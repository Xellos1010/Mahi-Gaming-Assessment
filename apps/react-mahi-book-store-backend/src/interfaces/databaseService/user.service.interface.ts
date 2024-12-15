import { BaseApiResponseDto } from "@dto/base.response.dto";
import { BaseBooksDatabaseResponseDto } from "@dto/book.dto";
import { AddUserRequestDto, BaseUserDatabaseResponseDto, BaseUsersDatabaseResponseDto, BaseGetUserByIdRequestDto, BaseGetUserByEmailRequestDto, UserWithFavoritesDatabaseResponseDto, SetUserPasswordRequestDto, BaseUserByIdRequestDto } from "@dto/user.dto";



export interface IUserServiceInterface {
    addUser(data: AddUserRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>>;
    removeUserById(params: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>>;
    setUserPassword(params: SetUserPasswordRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>>;
    setLastLoggedInNow(params: BaseUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>>;
    getAllUsers(): Promise<BaseApiResponseDto<BaseUsersDatabaseResponseDto>>;
    getUserById(params: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseUserDatabaseResponseDto>>;
    getUserByEmailIncludeFavoriteBooks(params: BaseGetUserByEmailRequestDto): Promise<BaseApiResponseDto<UserWithFavoritesDatabaseResponseDto>>;
    getUserFavoriteBooks(params: BaseGetUserByIdRequestDto): Promise<BaseApiResponseDto<BaseBooksDatabaseResponseDto>>;
  }
  