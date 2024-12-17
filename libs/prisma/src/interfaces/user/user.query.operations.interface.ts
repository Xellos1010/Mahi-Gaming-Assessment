/**
 * @fileoverview
 * Defines the IUserQueryOperations interface, which contains the query operations
 * related to user data. These operations include fetching user details by ID or email,
 * and retrieving a user's favorite books.
 */

import { 
  SingleUserResponseDto, 
  BaseUserIdDto, 
  BaseEmailDto, 
  PrismaUserWithFavoriteBooksResponse, 
  UsersListResponseDto 
} from "../../dtos";

/**
 * Interface representing user query operations.
 * This interface defines methods to fetch user data by ID or email,
 * as well as retrieving a user's favorite books.
 */
export interface IUserQueryOperations {
  /**
   * Retrieves a list of all users in the system.
   *
   * @returns {Promise<UsersListResponseDto>} A promise that resolves to a list of users,
   * containing user details such as ID, name, email, etc.
   * @throws {Error} If there is an issue fetching the users (e.g., network errors or server issues).
   */
  getAllUsers(): Promise<UsersListResponseDto>;

  /**
   * Retrieves a user based on their unique identifier.
   *
   * @param {BaseUserIdDto} params - The unique identifier of the user to retrieve.
   * The identifier must be a valid user ID.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the details of the specified user.
   * The response includes metadata like name, email, and other user information.
   * @throws {Error} If the user is not found or if there is an issue with the request.
   */
  getUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto>;

  /**
   * Retrieves a user based on their email address.
   *
   * @param {BaseEmailDto} params - The email address of the user to retrieve.
   * The email must be valid and associated with an existing user in the system.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the details of the specified user.
   * The response contains metadata like name, email, and other user information.
   * @throws {Error} If the user is not found or if the email is invalid.
   */
  getUserByEmail(params: BaseEmailDto): Promise<SingleUserResponseDto>;

  /**
   * Retrieves a user's favorite books based on their unique identifier.
   *
   * @param {BaseUserIdDto} params - The unique identifier of the user whose favorite books are to be retrieved.
   * @returns {Promise<PrismaUserWithFavoriteBooksResponse>} A promise that resolves to the list of the user's favorite books,
   * along with any associated metadata (e.g., book titles, authors).
   * @throws {Error} If the user does not exist or there is an issue retrieving their favorite books.
   */
  getUserFavoriteBooks(params: BaseUserIdDto): Promise<PrismaUserWithFavoriteBooksResponse>;

  /**
   * Retrieves a user by email along with their favorite books.
   *
   * @param {BaseEmailDto} params - The email address of the user whose details and favorite books are to be retrieved.
   * @returns {Promise<PrismaUserWithFavoriteBooksResponse>} A promise that resolves to the user's details
   * along with their favorite books, including metadata like book titles, authors, etc.
   * @throws {Error} If the user is not found or the email is invalid.
   */
  getUserByEmailIncludeFavoriteBooks(params: BaseEmailDto): Promise<PrismaUserWithFavoriteBooksResponse>;
}
