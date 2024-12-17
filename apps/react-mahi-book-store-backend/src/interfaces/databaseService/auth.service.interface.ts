import { CreateUserDatabaseResponseDto, LoginUserDatabaseResponseDto, LoginUserRequestDto } from "@nestDtos/auth.dto";
import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { CreateUserRequestDto } from "@nestDtos/user.dto";

/**
 * @fileoverview
 * This file contains the definition of the `IAuthServiceInterface`, which outlines the methods for handling authentication-related operations.
 * - `register`: Registers a new user using the provided data.
 * - `login`: Logs a user in using the provided credentials.
 * - `logout`: Logs out the current user and invalidates the session.
 * 
 * The methods return `ApiResponseDto` objects, which include success status, data, and potential errors.
 */

/**
 * Interface for authentication-related services.
 * This interface defines the methods for user registration, login, and logout.
 */
export interface IAuthServiceInterface {

  /**
   * Registers a new user with the provided data.
   * @param {CreateUserRequestDto} createUserDto - The data required to create a new user (e.g., name, email, and password).
   * @returns {Promise<ApiResponseDto<CreateUserDatabaseResponseDto>>} - A promise that resolves to the response data of the registration process,
   * including the success status and any relevant response data or errors.
   * 
   * @throws {Error} - If the user creation fails due to invalid data or other issues.
   */
  register(createUserDto: CreateUserRequestDto): Promise<ApiResponseDto<CreateUserDatabaseResponseDto>>;

  /**
   * Logs a user in using the provided credentials.
   * @param {LoginUserRequestDto} loginUserDto - The credentials required for login (e.g., email and password).
   * @returns {Promise<ApiResponseDto<LoginUserDatabaseResponseDto>>} - A promise that resolves to the response data of the login process,
   * including the success status and any relevant response data or errors.
   * 
   * @throws {Error} - If login fails due to incorrect credentials or other issues.
   */
  login(loginUserDto: LoginUserRequestDto): Promise<ApiResponseDto<LoginUserDatabaseResponseDto>>;

  /**
   * Logs out the currently logged-in user.
   * @returns {Promise<ApiResponseDto<void>>} - A promise that resolves to the response data of the logout process,
   * indicating success but does not return any additional data.
   * 
   * @throws {Error} - If an error occurs while logging out, such as session termination issues.
   */
  logout(): Promise<ApiResponseDto<void>>; // Nothing is returned from logging out right now.
}
