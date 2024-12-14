import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  BaseCreateUserDatabaseResponseDto,
  CreateUserRequestDto,
  LoginUserDatabaseResponseDto,
  LoginUserRequestDto
} from '../dtos/auth.dto';
import { HandleControllerError } from "../decorators/errorHandling/controller.error.handler";
import { WrapApiResponse } from '../decorators/controller.api-response.';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(201)
  @HandleControllerError('Registering a new user')
  @WrapApiResponse()
  async register(@Body() createUserDto: CreateUserRequestDto): Promise<BaseCreateUserDatabaseResponseDto> {
    return await this.authService.register(createUserDto) as BaseCreateUserDatabaseResponseDto;
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(200)
  @HandleControllerError('Logging in a user')
  @WrapApiResponse()
  async login(@Body() loginUserDto: LoginUserRequestDto): Promise<LoginUserDatabaseResponseDto> {
    return await this.authService.login(loginUserDto) as LoginUserDatabaseResponseDto;
  }

  @Post('logout')
  @HttpCode(200)
  @HandleControllerError('Logging out a user')
  @WrapApiResponse()
  async logout() {
    // Typically handle client-side token clearing or server-side token invalidation. 
    return { message: 'Logout successful' };  // This will be wrapped by WrapApiResponse 
  }
}
