import { CreateUserDatabaseResponseDto, LoginUserDatabaseResponseDto, LoginUserRequestDto } from "@nestDtos/auth.dto";
import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { CreateUserRequestDto } from "@nestDtos/user.dto";

export interface IAuthServiceInterface {
    register(createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<CreateUserDatabaseResponseDto>>;
    login(loginUserDto: LoginUserRequestDto): Promise<ApiResponseDto<LoginUserDatabaseResponseDto>>;
    logout(): Promise<ApiResponseDto<void>>; //Nothing is returned from loging out right now.
  }
  