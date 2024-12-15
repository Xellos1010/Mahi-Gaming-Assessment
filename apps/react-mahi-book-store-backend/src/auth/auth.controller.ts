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
import { BaseApiResponseDto } from '@dto/base.response.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(201)
  ////@HandleControllerError('Registering a new user')
  // @WrapApiResponse()
  //@HandleControllerError()
  async register(@Body() createUserDto: CreateUserRequestDto): Promise<BaseApiResponseDto<BaseCreateUserDatabaseResponseDto>> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(200)
  ////@HandleControllerError('Logging in a user')
  // @WrapApiResponse()
  //@HandleControllerError()
  async login(@Body() loginUserDto: LoginUserRequestDto): Promise<BaseApiResponseDto<LoginUserDatabaseResponseDto>> {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  @HttpCode(200)
  ////@HandleControllerError('Logging out a user')
  // @WrapApiResponse()
  //@HandleControllerError()
  async logout(): Promise<BaseApiResponseDto<string>> {
    // Typically handle client-side token clearing or server-side token invalidation.
    return this.authService.logout();
  }
}
