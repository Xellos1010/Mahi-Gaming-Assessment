import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';


export class BaseApiService {
  protected baseUrl: string;

  constructor(endpoint: string) {
    // Use environment variable or fallback to default
    this.baseUrl = `/api${endpoint}`;
  }

  protected async handleRequest<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const fullUrl = `${this.baseUrl}/${endpoint}`;
      let response: AxiosResponse;

      switch (method) {
        case 'get':
          response = await axios.get(fullUrl, config);
          break;
        case 'post':
          response = await axios.post(fullUrl, data, config);
          break;
        case 'patch':
          response = await axios.patch(fullUrl, data, config);
          break;
        case 'delete':
          response = await axios.delete(fullUrl, { ...config, data });
          break;
        default:
          throw new Error('Invalid HTTP method');
      }

      const apiResponse = response.data as ApiResponseDto<T>;
      console.log(`api response: ${apiResponse}`);
      if (!apiResponse.success) {
        throw new Error(apiResponse.message || 'An unknown error occurred');
      }

      return apiResponse.data as T;
    } catch (error) {
      console.log(error);
      return this.handleError(error);
    }
  }

  protected handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
      throw new Error(errorMessage);
    }
    throw error;
  }
}