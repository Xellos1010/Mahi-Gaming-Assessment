import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDatabaseResponseDto,
  LoginUserDatabaseResponseDto,
  LoginUserRequestDto
} from '../dtos/auth.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { CreateUserRequestDto } from '@nestDtos/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<CreateUserDatabaseResponseDto>> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserRequestDto): Promise<ApiResponseDto<LoginUserDatabaseResponseDto>> {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(): Promise<ApiResponseDto<string>> {
    // Typically handle client-side token clearing or server-side token invalidation.
    return this.authService.logout();
  }
}
