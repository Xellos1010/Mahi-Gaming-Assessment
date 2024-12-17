/**
 * Sanitizes input to prevent logging sensitive information
 * @param input - Input to sanitize
 * @param sensitiveFieldsParam - Optional array of sensitive fields to sanitize. If not provided, defaults to a predefined list of sensitive fields.
 * @returns Sanitized input
 */
export function sanitizeInput(input: any, sensitiveFieldsParam?: string[]): any {
  if (typeof input === 'object' && input !== null) {
    const sanitizedInput = { ...input };

    // Use provided sensitive fields or fallback to default sensitive fields
    const sensitiveFields = Array.isArray(sensitiveFieldsParam) && sensitiveFieldsParam.length > 0
      ? sensitiveFieldsParam
      : [
        'password', 'token', 'credentials',
        'secretKey', 'accessToken'
      ];

    sensitiveFields.forEach(field => {
      if (field in sanitizedInput) {
        // Mask the entire value with stars
        sanitizedInput[field] = '*'.repeat(4);
      }
    });

    // Truncate large objects if they have more than 10 keys
    return Object.keys(sanitizedInput).length > 10
      ? { ...sanitizedInput, __truncated: true }
      : sanitizedInput;
  }

  // If input is not an object, return it as is
  return input;
}
