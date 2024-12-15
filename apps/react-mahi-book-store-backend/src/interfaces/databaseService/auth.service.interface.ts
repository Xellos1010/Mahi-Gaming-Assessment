import { BaseCreateUserDatabaseResponseDto, CreateUserRequestDto, LoginUserDatabaseResponseDto, LoginUserRequestDto } from "@dto/auth.dto";
import { BaseApiResponseDto } from "@dto/base.response.dto";

export interface IAuthServiceInterface {
    register(createUserDto: CreateUserRequestDto): Promise<BaseApiResponseDto<BaseCreateUserDatabaseResponseDto>>;
    login(loginUserDto: LoginUserRequestDto): Promise<BaseApiResponseDto<LoginUserDatabaseResponseDto>>;
    logout(): Promise<BaseApiResponseDto<void>>; //Nothing is returned from loging out right now.
  }
  