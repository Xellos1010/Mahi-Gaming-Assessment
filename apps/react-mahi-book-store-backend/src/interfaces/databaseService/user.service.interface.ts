import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { CreateUserRequestDto, BaseUserDatabaseResponseDto, BaseUsersDatabaseResponseDto, BaseGetUserByEmailRequestDto, UserWithFavoritesDatabaseResponseDto, SetUserPasswordRequestDto, GetUserByIdRequestDto } from "@nestDtos/user.dto";



export interface IUserServiceInterface {
    addUser(data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;
    removeUserById(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;
    setUserPassword(params: SetUserPasswordRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;
    setLastLoggedInNow(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;
    getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>>;
    getUserById(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;
    getUserByEmailIncludeFavoriteBooks(params: BaseGetUserByEmailRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>;
    getUserFavoriteBooks(params: GetUserByIdRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>;
  }
  