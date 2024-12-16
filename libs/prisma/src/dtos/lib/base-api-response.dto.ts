
export interface BaseApiResponseDto<T> {
  success: boolean;
  data?: T;
  error?: Error; //As long as CustomerError's extend from Error then you can set the object here due to polymorphism
  message?: string;
}
