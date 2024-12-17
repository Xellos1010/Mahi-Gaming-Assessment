import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { CreateUserRequestDto, BaseUserDatabaseResponseDto, BaseUsersDatabaseResponseDto, BaseGetUserByEmailRequestDto, UserWithFavoritesDatabaseResponseDto, SetUserPasswordRequestDto, GetUserByIdRequestDto } from "@nestDtos/user.dto";

/**
 * @fileoverview
 * This file defines the `IUserServiceInterface`, which outlines the methods required to interact with the user data.
 * The interface includes operations for adding, removing, and updating user information, setting the user's password,
 * managing the last logged-in status, and retrieving user data, including favorite books.
 */

/**
 * Interface for user-related services.
 * This interface defines methods to manage user-related functionality such as user creation, removal, password management,
 * last login updates, and retrieving user details with or without their favorite books.
 */
export interface IUserServiceInterface {

  /**
   * Adds a new user to the system.
   * @param {CreateUserRequestDto} data - The data required to create a new user, including name, email, and password.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response,
   * which includes the success status, user data, or any relevant error messages.
   * 
   * @throws {Error} - If the user creation fails due to invalid data, email conflicts, or other database issues.
   */
  addUser(data: CreateUserRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;

  /**
   * Removes a user from the system by their ID.
   * @param {GetUserByIdRequestDto} params - The ID of the user to be removed.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response,
   * indicating whether the user removal was successful or if any errors occurred.
   * 
   * @throws {Error} - If the user removal fails, such as when the user ID does not exist or due to database issues.
   */
  removeUserById(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;

  /**
   * Updates a user's password.
   * @param {SetUserPasswordRequestDto} params - The data required to update a user's password, including user ID and the new password.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response,
   * which includes the success status and updated user data, or any relevant error messages.
   * 
   * @throws {Error} - If the password update fails due to invalid user ID, weak password, or other issues.
   */
  setUserPassword(params: SetUserPasswordRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;

  /**
   * Updates the 'last logged in' timestamp for a user.
   * @param {GetUserByIdRequestDto} params - The ID of the user whose 'last logged in' timestamp needs to be updated.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response,
   * indicating the success of the operation, along with the updated user data.
   * 
   * @throws {Error} - If the update fails due to issues with the user ID or database errors.
   */
  setLastLoggedInNow(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;

  /**
   * Retrieves a list of all users in the system.
   * @returns {Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>>} - A promise that resolves to an API response,
   * which includes the success status and a list of all users.
   * 
   * @throws {Error} - If there is an issue retrieving the list of users, such as database failures.
   */
  getAllUsers(): Promise<ApiResponseDto<BaseUsersDatabaseResponseDto>>;

  /**
   * Retrieves a specific user by their ID.
   * @param {GetUserByIdRequestDto} params - The ID of the user to be retrieved.
   * @returns {Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>} - A promise that resolves to an API response,
   * containing the requested user's data or any relevant error messages.
   * 
   * @throws {Error} - If the user retrieval fails due to an invalid user ID or database issues.
   */
  getUserById(params: GetUserByIdRequestDto): Promise<ApiResponseDto<BaseUserDatabaseResponseDto>>;

  /**
   * Retrieves a user by their email, including their favorite books.
   * @param {BaseGetUserByEmailRequestDto} params - The email address of the user to be retrieved.
   * @returns {Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>} - A promise that resolves to an API response,
   * which includes the user data along with their list of favorite books, if applicable.
   * 
   * @throws {Error} - If the user retrieval fails due to invalid email or database issues.
   */
  getUserByEmailIncludeFavoriteBooks(params: BaseGetUserByEmailRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>;

  /**
   * Retrieves a user's favorite books by their ID.
   * @param {GetUserByIdRequestDto} params - The ID of the user whose favorite books are to be retrieved.
   * @returns {Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>} - A promise that resolves to an API response,
   * which includes the user’s favorite books data or relevant error messages.
   * 
   * @throws {Error} - If the retrieval of favorite books fails due to issues with the user ID or database errors.
   */
  getUserFavoriteBooks(params: GetUserByIdRequestDto): Promise<ApiResponseDto<UserWithFavoritesDatabaseResponseDto>>;
}