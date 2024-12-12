import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto } from '../dtos/auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords, hashPassword } from '../util/crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.userService.addUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ user: User; accessToken: string }> {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await comparePasswords(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({ id: user.id });
    return { user, accessToken };
  }

  async logout(): Promise<void> {
    // Typically, logout involves invalidating the JWT token or clearing client-side storage
    // You could implement token blacklisting or session handling if needed
  }
}
