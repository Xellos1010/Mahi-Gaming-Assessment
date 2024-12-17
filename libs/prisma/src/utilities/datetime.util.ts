/**
 * @fileoverview
 * This function converts a JavaScript `Date` object into the ISO 8601 string format,
 * which is commonly used for storing dates in databases.
 * 
 * The function takes a `Date` object and converts it to a string in the format `YYYY-MM-DDTHH:mm:ss.sssZ`.
 * This format is widely accepted by databases such as PostgreSQL, MySQL, and MongoDB.
 * 
 * @param {Date} date - The JavaScript `Date` object to be converted to ISO string format.
 * 
 * @returns {string} - The ISO 8601 string representation of the input date.
 * This string can be directly used for database storage or APIs.
 * 
 * @throws {TypeError} - Throws an error if the input is not a valid `Date` object.
 */
export function convertDateTimeToDatabaseFormat(date: Date): string {
    // Check if the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new TypeError('Invalid date object');
    }

    // Return the date in ISO 8601 string format
    return date.toISOString();
}
