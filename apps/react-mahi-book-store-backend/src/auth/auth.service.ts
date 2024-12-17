// apps/react-mahi-book-store-backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  CreateUserDatabaseResponseDto,
  LoginUserRequestDto,
  LoginUserDatabaseResponseDto
} from '../dtos/auth.dto';
import { comparePasswords, hashPassword } from '../util/crypto.util';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { BaseGetUserByEmailRequestDto, CreateUserRequestDto, UserWithFavoritesDatabaseResponseDto } from '@nestDtos/user.dto';
import { loginSuccessMessage, registerSuccessMessage } from '../decorators/consts/auth.consts';
import { HandleServiceError } from '../decorators/errorHandling/service.error.handler';
import { LogAll } from '@shared-decorators';

/**
 * @fileoverview
 * This service handles user authentication, including registering new users, logging in users, and logging out users.
 * It interacts with the UserService to retrieve user data and the JwtService to manage JWT tokens.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Registers a new user in the system by checking if the email already exists.
   * If the email is already in use, an error will be thrown.
   * Passwords are hashed before being stored.
   * @param {CreateUserRequestDto} createUserDto - The data required to create a new user.
   * @returns {Promise<ApiResponseDto<CreateUserDatabaseResponseDto>>} - A promise that resolves to a response with the user data and access token.
   * @throws {BadRequestException} - If the email is already in use or if there is a database error.
   */
  @HandleServiceError()
  @LogAll()
  async register(createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<CreateUserDatabaseResponseDto>> {
    const getUserParams: BaseGetUserByEmailRequestDto = new BaseGetUserByEmailRequestDto(createUserDto.email);
    let existingUserResponse;
    try {
      // Attempt to find an existing user by email
      existingUserResponse = await this.userService.getUserByEmailIncludeFavoriteBooks(getUserParams) as ApiResponseDto<UserWithFavoritesDatabaseResponseDto>;
    } catch (error) {
      // Handle the case where the user is not found
      if (error instanceof ApiResponseDto && error.error.message.includes("User not found")) {
        console.log(`existingUserResponse: `, existingUserResponse);
        existingUserResponse = null;
      } else {
        // Rethrow if it's another error
        console.log(`error service level: `, error);
        throw new BadRequestException('Email is already in use');
      }
    }
    
    // Hash the password before saving the user
    const hashedPassword = await hashPassword(createUserDto.password);

    // Create the user in the database
    const createUserResponse = await this.userService.addUser({
      ...createUserDto,
      password: hashedPassword
    });
    const { user } = createUserResponse.data;

    // Generate a JWT access token for the user
    const accessToken = this.jwtService.sign({ user });

    // Return the response with the user data and access token
    return wrapResponseSuccess<CreateUserDatabaseResponseDto>(new CreateUserDatabaseResponseDto(user, accessToken), registerSuccessMessage);
  }

  /**
   * Logs in a user by validating the provided credentials (email and password).
   * If the credentials are invalid, an UnauthorizedException is thrown.
   * If successful, an access token is generated and returned.
   * @param {LoginUserRequestDto} loginUserDto - The user's login credentials.
   * @returns {Promise<ApiResponseDto<LoginUserDatabaseResponseDto>>} - A promise that resolves to a response with the user data and access token.
   * @throws {UnauthorizedException} - If the email or password is invalid.
   */
  @HandleServiceError()
  @LogAll()
  async login(loginUserDto: LoginUserRequestDto): Promise<ApiResponseDto<LoginUserDatabaseResponseDto>> {
    console.log("Login request data:", loginUserDto);

    // Retrieve the user by email
    const { user } = (await this.userService.getUserByEmailIncludeFavoriteBooks({ email: loginUserDto.email })).data;
    
    // Check if the user exists
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await comparePasswords(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT access token
    const accessToken = this.jwtService.sign({ id: user.id });

    // Update the user's last login time
    await this.userService.setLastLoggedInNow({ id: user.id });

    // Return the response with the user data and access token
    return wrapResponseSuccess<LoginUserDatabaseResponseDto>(new LoginUserDatabaseResponseDto(user, accessToken), loginSuccessMessage);
  }

  /**
   * Logs out the current user by invalidating the session or token on the client-side.
   * @returns {Promise<ApiResponseDto<string>>} - A promise that resolves to a success message indicating logout completion.
   */
  @HandleServiceError()
  @LogAll()
  async logout(): Promise<ApiResponseDto<string>> {
    // Typically handle client-side token clearing or server-side token invalidation here.
    return wrapResponseSuccess<string>('Logout successful');
  }
}
