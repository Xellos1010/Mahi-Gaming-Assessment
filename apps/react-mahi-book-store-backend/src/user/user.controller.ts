// apps/react-mahi-book-store-backend/src/user/user.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { BasePasswordDto, GetUserByIdRequestDto, SetUserPasswordRequestDto, BaseUsersDatabaseResponseDto, BaseUserDatabaseResponseDto, UserWithFavoritesDatabaseResponseDto, CreateUserRequestDto, BaseGetUserByEmailRequestDto, BaseUserEmailDto } from '../dtos/user.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { LogAll } from '@shared-decorators';
import { SingleUserResponseWithFavoriteBooksDto } from '@prismaDist/dtos/lib/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * @fileoverview
   * This controller defines the API endpoints for managing users in the system.
   * It supports operations like retrieving, adding, updating, deleting users,
   * and handling user favorites. Each method calls the corresponding service method
   * to interact with the database.
   */
  
  /**
   * Retrieves all users from the system.
   * @returns {Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>>} - A promise that resolves to an API response containing all users' data.
   */
  @Get()
  @HttpCode(HttpStatus.OK)  // Status code for successful GET request.
  @LogAll()
  async getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>> {
    return await this.userService.getAllUsers();
  }

  /**
   * Retrieves a user by their ID.
   * @param {GetUserByIdRequestDto} params - The request DTO containing the user ID to retrieve.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the user's data.
   * @throws {NotFoundException} - If no user is found with the given ID.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)  // Status code for successful GET request.
  @LogAll()
  async getUserById(@Param('id', ParseIntPipe) params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.getUserById(params);
  }

  /**
   * Adds a new user to the system.
   * @param {CreateUserRequestDto} data - The data required to create a new user.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the newly created user's data.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)  // Status code for successful POST request (resource created).
  @LogAll()
  async addUser(@Body() data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.addUser(data as CreateUserRequestDto);
  }

  /**
   * Updates the password for an existing user.
   * @param {number} id - The ID of the user whose password is being updated.
   * @param {BasePasswordDto} passwordDto - The password data to update.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the updated user's data.
   */
  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)  // Status code for successful PATCH request.
  @LogAll()
  async setUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() { password }: BasePasswordDto,
  ): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.setUserPassword(new SetUserPasswordRequestDto(id, password));
  }

  /**
   * Retrieves the favorite books of a user by their ID.
   * @param {number} id - The ID of the user whose favorite books are being retrieved.
   * @returns {Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>} - A promise that resolves to an API response containing the user's favorite books.
   * @throws {NotFoundException} - If no favorite books are found for the user.
   */
  @Get(':id/favorites')
  @HttpCode(HttpStatus.OK)  // Status code for successful GET request.
  @LogAll()
  getUserFavoriteBooks(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>> {
    return this.userService.getUserFavoriteBooks(new GetUserByIdRequestDto(id));
  }

  /**
   * Removes a user from the system by their ID.
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response containing the deleted user's data.
   * @throws {NotFoundException} - If no user is found with the given ID.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)  // Status code for successful DELETE request.
  @LogAll()
  async removeUserById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>> {
    return await this.userService.removeUserById(new GetUserByIdRequestDto(id));
  }

  /**
   * Retrieves a user by their email, including their favorite books.
   * @param {BaseUserEmailDto} query - The query parameters containing the user's email.
   * @returns {Promise<ApiResponseDto<SingleUserResponseWithFavoriteBooksDto>>} - A promise that resolves to an API response containing the user's data with their favorite books.
   * @throws {NotFoundException} - If no user is found with the given email.
   */
  @Get('email')
  @HttpCode(HttpStatus.OK)  // Status code for successful GET request.
  @LogAll()
  async getUserByEmailIncludeFavoriteBooks(@Query() query: BaseUserEmailDto): Promise<ApiResponseDto<SingleUserResponseWithFavoriteBooksDto>> {
    return await this.userService.getUserByEmailIncludeFavoriteBooks(query);
  }
}
