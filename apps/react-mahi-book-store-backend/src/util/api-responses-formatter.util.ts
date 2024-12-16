import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { ApiError } from "@prismaDist/dtos/lib/interfaces/api-errors";

// Utility method to wrap service responses
export function wrapResponseFail<T>(data: T, error? : ApiError, message?: string): ApiResponseDto<T> {
  return new ApiResponseDto(false, data, error, message);
}
// Utility method to wrap service responses
export function wrapResponseSuccess<T>(data: T, message? : string): ApiResponseDto<T> {
    return new ApiResponseDto(true, data, null, message);
  }