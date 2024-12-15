// apps/react-mahi-book-store-backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  CreateUserRequestDto,
  BaseCreateUserDatabaseResponseDto,
  LoginUserRequestDto,
  LoginUserDatabaseResponseDto
} from '../dtos/auth.dto';
import { comparePasswords, hashPassword } from '../util/crypto.util';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { BaseGetUserByEmailRequestDto, UserWithFavoritesDatabaseResponseDto } from '@dto/user.dto';
import { loginSuccessMessage, registerSuccessMessage } from '../consts/auth.consts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  ////@HandleServiceError('Registering a new user')
  //@HandleServiceError()
  async register(createUserDto: CreateUserRequestDto): Promise<BaseApiResponseDto<BaseCreateUserDatabaseResponseDto>> {
    const getUserParams: BaseGetUserByEmailRequestDto = new BaseGetUserByEmailRequestDto(createUserDto.email);
    const existingUserResponse = await this.userService.getUserByEmailIncludeFavoriteBooks(getUserParams) as BaseApiResponseDto<UserWithFavoritesDatabaseResponseDto>;
    if (existingUserResponse.data.user) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const createUserResponse = await this.userService.addUser({
      ...createUserDto,
      password: hashedPassword
    });
    const { user } = createUserResponse.data;
    const accessToken = this.jwtService.sign({ user });
    return wrapResponseSuccess<BaseCreateUserDatabaseResponseDto>(new BaseCreateUserDatabaseResponseDto(user, accessToken), registerSuccessMessage);
  }

  ////@HandleServiceError('Logging in user')
  //@HandleServiceError()
  async login(loginUserDto: LoginUserRequestDto): Promise<BaseApiResponseDto<LoginUserDatabaseResponseDto>> {
    const { user } = (await this.userService.getUserByEmailIncludeFavoriteBooks({ email: loginUserDto.email })).data;
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Can Add further decoupling and enforce SRP by having a separate Database and Security Path invoked here, in an effort to save time combining them and planning to refactor later wime permitting
    const isMatch = await comparePasswords(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({ id: user.id });
    await this.userService.setLastLoggedInNow({ id: user.id });
    return wrapResponseSuccess<LoginUserDatabaseResponseDto>(new LoginUserDatabaseResponseDto(user, accessToken), loginSuccessMessage);
  }

  ////@HandleServiceError('Logging out user')
  //@HandleServiceError()
  async logout(): Promise<BaseApiResponseDto<string>> {
    // Typically handle client-side token clearing or server-side token invalidation here.
    return wrapResponseSuccess<string>('Logout successful');
  }
}
