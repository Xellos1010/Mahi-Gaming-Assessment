/**
 * @fileoverview
 * Defines the IUserMutationOperations interface, which includes mutation operations
 * for managing user data. Operations include adding, removing, updating users,
 * setting user passwords, and updating last login information.
 */

import { 
  BaseCreateUserRequestDto, 
  SingleUserResponseDto, 
  BaseUserIdDto, 
  BaseSetUserPasswordRequestDto 
} from "../../dtos";
import type { 
  PrismaDatabaseSetUserPasswordParams, 
  PrismaDatabaseUpdateUserParams 
} from "../../types/user.types";

/**
 * Interface representing user mutation operations.
 * These operations manage user records, including creating, updating, and removing users,
 * as well as managing user authentication data and login states.
 */
export interface IUserMutationOperations {
  /**
   * Adds a new user to the system.
   *
   * @param {BaseCreateUserRequestDto} params - The user creation data, including
   * user details such as name, email, and password.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the details
   * of the newly created user.
   * @throws {Error} If the user creation process fails (e.g., validation errors or database issues).
   */
  addUser(params: BaseCreateUserRequestDto): Promise<SingleUserResponseDto>;

  /**
   * Removes an existing user by their unique identifier.
   *
   * @param {BaseUserIdDto} params - The unique identifier of the user to be removed.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the details of the removed user.
   * @throws {Error} If the user does not exist or there is an issue during deletion.
   */
  removeUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto>;

  /**
   * Updates the details of an existing user.
   *
   * @param {PrismaDatabaseUpdateUserParams} params - The updated user details, such as name,
   * email, or other relevant fields.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the updated user details.
   * @throws {Error} If the update operation fails due to invalid input or database errors.
   */
  updateUser(params: PrismaDatabaseUpdateUserParams): Promise<SingleUserResponseDto>;

  /**
   * Updates the password for a specific user.
   *
   * @param {PrismaDatabaseSetUserPasswordParams} params - The data required to set the user password,
   * including the user ID and the new password.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the updated user details.
   * @throws {Error} If the password update process fails due to invalid input or security issues.
   */
  setUserPassword(params: PrismaDatabaseSetUserPasswordParams): Promise<SingleUserResponseDto>;

  /**
   * Updates the 'lastLoggedIn' timestamp for a specific user to a provided value.
   *
   * @param {BaseUserIdDto} params - The unique identifier of the user whose 'lastLoggedIn'
   * timestamp is to be updated.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the updated user details.
   * @throws {Error} If the update fails due to invalid user ID or database errors.
   */
  setLastLoggedIn(params: BaseUserIdDto): Promise<SingleUserResponseDto>;

  /**
   * Updates the 'lastLoggedIn' timestamp for a specific user to the current date and time.
   *
   * @param {BaseUserIdDto} params - The unique identifier of the user whose 'lastLoggedIn'
   * timestamp is to be set to the current date and time.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves to the updated user details.
   * @throws {Error} If the update fails due to invalid user ID or database issues.
   */
  setLastLoggedInNow(params: BaseUserIdDto): Promise<SingleUserResponseDto>;
}
