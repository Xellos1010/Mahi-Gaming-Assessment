import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  CreateUserRequestDto,
  BaseCreateUserDatabaseResponseDto,
  LoginUserRequestDto,
  LoginUserDatabaseResponseDto
} from '../dtos/auth.dto';
import { comparePasswords, hashPassword } from '../util/crypto';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  @HandleServiceError('Registering a new user')
  async register(createUserDto: CreateUserRequestDto): Promise<BaseCreateUserDatabaseResponseDto> {
    const existingUser = await this.userService.getUserByEmailIncludeFavoriteBooks({ email: createUserDto.email });
    if (existingUser.user) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const { user } = await this.userService.addUser({
      ...createUserDto,
      password: hashedPassword
    });

    const accessToken = this.jwtService.sign({ id: user.id });
    return new BaseCreateUserDatabaseResponseDto(user, accessToken);
  }

  @HandleServiceError('Logging in user')
  async login(loginUserDto: LoginUserRequestDto): Promise<LoginUserDatabaseResponseDto> {
    const { user } = await this.userService.getUserByEmailIncludeFavoriteBooks({ email: loginUserDto.email });
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
    return new LoginUserDatabaseResponseDto(user, accessToken);
  }

  @HandleServiceError('Logging out user')
  async logout(): Promise<void> {
    // Typically handle client-side token clearing or server-side token invalidation here.
    return Promise.resolve();
  }
}
