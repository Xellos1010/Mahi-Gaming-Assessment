// apps/react-mahi-book-store-backend/src/auth/auth.controller.ts
import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDatabaseResponseDto,
  LoginUserDatabaseResponseDto,
  LoginUserRequestDto
} from '../dtos/auth.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { CreateUserRequestDto } from '@nestDtos/user.dto';
import { LogAll } from '@shared-decorators';

/**
 * @fileoverview
 * This controller handles the authentication routes for user registration, login, and logout.
 * It delegates the actual logic to the AuthService, which interacts with the UserService
 * and JWT token handling to authenticate and manage users.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user by validating the provided data and passing it to the AuthService.
   * The user is created in the database, and a JWT token is generated upon success.
   * @param {CreateUserRequestDto} createUserDto - The user's data required to register a new account.
   * @returns {Promise<ApiResponseDto<CreateUserDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing the newly created user's data and access token.
   * @throws {BadRequestException} - If the email is already in use.
   */
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED) // Returns a 201 status code (Created)
  @LogAll() // Log the execution for debugging purposes
  async register(@Body() createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<CreateUserDatabaseResponseDto>> {
    return await this.authService.register(createUserDto);
  }

  /**
   * Logs in a user by validating their credentials (email and password).
   * If the credentials are valid, a JWT token is returned for session management.
   * @param {LoginUserRequestDto} loginUserDto - The user's credentials for login.
   * @returns {Promise<ApiResponseDto<LoginUserDatabaseResponseDto>>} - A promise that resolves to an API response
   * containing the user's data and access token.
   * @throws {UnauthorizedException} - If the credentials are invalid.
   */
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.OK) // Returns a 200 status code (OK)
  @LogAll() // Log the execution for debugging purposes
  async login(@Body() loginUserDto: LoginUserRequestDto): Promise<ApiResponseDto<LoginUserDatabaseResponseDto>> {
    return await this.authService.login(loginUserDto);
  }

  /**
   * Logs out the current user by clearing the authentication session or token.
   * The actual implementation of token invalidation should be handled on the client-side
   * or server-side session management.
   * @returns {Promise<ApiResponseDto<string>>} - A promise that resolves to a success message indicating that the user has been logged out.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK) // Returns a 200 status code (OK)
  @LogAll() // Log the execution for debugging purposes
  async logout(): Promise<ApiResponseDto<string>> {
    // Typically handle client-side token clearing or server-side token invalidation here.
    return this.authService.logout();
  }
}
