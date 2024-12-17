/**
 * @fileoverview
 * This file contains the implementation of user mutation operations using Prisma.
 * It defines methods for performing operations like adding, removing, updating users, 
 * setting user passwords, and tracking user login times.
 * 
 * All operations are wrapped with a custom `@HandleDatabaseError` decorator for handling 
 * database errors gracefully.
 */

import { prisma } from "../../client";
import { IUserMutationOperations } from "../../interfaces/user/user.mutation.operations.interface";
import {
  BaseCreateUserRequestDto,
  SingleUserResponseDto,
  BaseUserIdDto
} from "../../dtos";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";
import { PrismaDatabaseSetUserPasswordParams, PrismaDatabaseUpdateUserParams } from "../../types";

/**
 * @class PrismaUserMutationOperationsImpl
 * Implementation of the `IUserMutationOperations` interface, which includes methods 
 * for mutating user data in the database such as adding, removing, updating users, 
 * setting user passwords, and updating login timestamps.
 */
export class PrismaUserMutationOperationsImpl implements IUserMutationOperations {

  /**
   * @function addUser
   * Adds a new user to the database.
   * 
   * @param {BaseCreateUserRequestDto} params - The user data to create the new user.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the newly created user.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Add User')
  async addUser(params: BaseCreateUserRequestDto): Promise<SingleUserResponseDto> {
    // Create a new user in the database using the provided data
    const user = await prisma.user.create({
      data: { ...params }
    });
    
    // Return the created user
    return { user };
  }

  /**
   * @function removeUserById
   * Removes a user from the database by their unique ID.
   * 
   * @param {BaseUserIdDto} params - The ID of the user to be removed.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the removed user.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Remove User')
  async removeUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    // Delete the user by ID
    const user = await prisma.user.delete({
      where: { id: params.id }
    });

    // Return the removed user details
    return { user };
  }

  /**
   * @function updateUser
   * Updates the information of an existing user in the database.
   * 
   * @param {PrismaDatabaseUpdateUserParams} params - The parameters containing the user's ID 
   * and the data to update.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the updated user.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Update User')
  async updateUser(params: PrismaDatabaseUpdateUserParams): Promise<SingleUserResponseDto> {
    // Update the user data using the provided parameters
    const user = await prisma.user.update({
      where: params.where,
      data: params.data
    });

    // Return the updated user details
    return { user };
  }

  /**
   * @function setUserPassword
   * Sets a new password for the user in the database.
   * 
   * @param {PrismaDatabaseSetUserPasswordParams} params - The user ID and the new password to set.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the user with the updated password.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Set User Password')
  async setUserPassword(params: PrismaDatabaseSetUserPasswordParams): Promise<SingleUserResponseDto> {
    // Update the user's password in the database
    const user = await prisma.user.update({
      where: params.where,
      data: { password: params.password }
    });

    // Return the user with the updated password
    return { user };
  }

  /**
   * @function setLastLoggedIn
   * Sets the `lastLoggedIn` timestamp for a user, indicating when they last logged in.
   * 
   * @param {BaseUserIdDto} params - The ID of the user whose login timestamp is being updated.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the user with the updated `lastLoggedIn` timestamp.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Set Last Logged In')
  async setLastLoggedIn(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    // Update the user's last login timestamp
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { lastLoggedIn: new Date() }
    });

    // Return the user with the updated last login timestamp
    return { user };
  }

  /**
   * @function setLastLoggedInNow
   * Sets the `lastLoggedIn` timestamp for the user immediately.
   * This method is a convenience wrapper around `setLastLoggedIn`.
   * 
   * @param {BaseUserIdDto} params - The ID of the user whose login timestamp is being updated.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the user with the updated `lastLoggedIn` timestamp.
   * @throws {PrismaOperationError} If the database operation fails, an error is thrown.
   */
  @HandleDatabaseError('Set Last Logged In Now')
  async setLastLoggedInNow(params: BaseUserIdDto): Promise<SingleUserResponseDto> {
    // Delegate to the setLastLoggedIn method
    return this.setLastLoggedIn(params);
  }
}

// Export an instance of the PrismaUserMutationOperationsImpl class
export const prismaUserMutationOperations = new PrismaUserMutationOperationsImpl();
