import { BaseApiResponseDto } from "@dto/base.response.dto";
import { ApiError } from "../interfaces/ApiError";


// Utility method to wrap service responses
export function wrapResponseFail<T>(data: T, error? : ApiError, message?: string): BaseApiResponseDto<T> {
  return new BaseApiResponseDto(true, data, error, message);
}
// Utility method to wrap service responses
export function wrapResponseSuccess<T>(data: T, message? : string): BaseApiResponseDto<T> {
    return new BaseApiResponseDto(true, data, null, message);
  }