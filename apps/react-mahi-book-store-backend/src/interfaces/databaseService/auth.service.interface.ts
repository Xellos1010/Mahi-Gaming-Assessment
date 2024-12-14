import { BaseCreateUserDatabaseResponseDto, CreateUserRequestDto, LoginUserDatabaseResponseDto, LoginUserRequestDto } from "@dto/auth.dto";

export interface IAuthServiceInterface {
    register(createUserDto: CreateUserRequestDto): Promise<BaseCreateUserDatabaseResponseDto>;
    login(loginUserDto: LoginUserRequestDto): Promise<LoginUserDatabaseResponseDto>;
    logout(): Promise<void>; //Nothing is returned from loging out right now.
  }
  