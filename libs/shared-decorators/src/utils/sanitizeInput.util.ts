/**
 * Sanitizes input to prevent logging sensitive information
 * @param input - Input to sanitize
 * @returns Sanitized input
 */

export function sanitizeInput(input: any, sensitiveFieldsParam?: []): any {
  if (typeof input === 'object' && input !== null) {
    const sanitizedInput = { ...input };

    // Remove sensitive fields
    const sensitiveFields = Array.isArray(sensitiveFieldsParam) && sensitiveFieldsParam.length > 0
      ? sensitiveFieldsParam
      : [
        'password', 'token', 'credentials',
        'secretKey', 'accessToken'
      ];

    sensitiveFields.forEach(field => {
      if (field in sanitizedInput) {
        // delete sanitizedInput[field];
        // Mask the entire value with stars with standard  length
        sanitizedInput[field] = '*'.repeat(4);
      }
    });

    // Truncate large objects
    return Object.keys(sanitizedInput).length > 10
      ? { ...sanitizedInput, __truncated: true }
      : sanitizedInput;
  }
  return input;
}
