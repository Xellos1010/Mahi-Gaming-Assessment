import * as bcrypt from 'bcrypt';

/**
 * @fileoverview
 * This file provides utility functions for password hashing and comparison using bcrypt.
 * 
 * The two main functions in this file are:
 * 1. `hashPassword`: Hashes a given password using bcrypt with a salt rounds factor of 10.
 * 2. `comparePasswords`: Compares a password attempt with a stored password hash.
 */

/**
 * @function hashPassword
 * 
 * @description
 * This function takes a plain text password and hashes it using bcrypt with a salt rounds factor of 10.
 * The hashed password is returned as a string. This process helps in securely storing user passwords.
 * 
 * @param {string} password - The plain text password to be hashed.
 * 
 * @returns {Promise<string>} - A promise that resolves to the hashed password string.
 * 
 * @throws {Error} - Throws an error if bcrypt's hashing operation fails.
 */
export async function hashPassword(password: string): Promise<string> {
    // Hash the password with a salt rounds factor of 10
    return await bcrypt.hash(password, 10);
}

/**
 * @function comparePasswords
 * 
 * @description
 * This function compares a plain text password attempt with a stored bcrypt hashed password.
 * It returns a boolean indicating whether the passwords match.
 * 
 * @param {string} passwordAttempt - The plain text password attempt provided by the user.
 * @param {string} passwordStored - The previously stored bcrypt hash of the user's password.
 * 
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, otherwise `false`.
 * 
 * @throws {Error} - Throws an error if bcrypt's comparison operation fails.
 */
export async function comparePasswords(passwordAttempt: string, passwordStored: string): Promise<boolean> {
    // Compare the plain text password attempt with the stored hashed password
    return await bcrypt.compare(passwordAttempt, passwordStored);
}
