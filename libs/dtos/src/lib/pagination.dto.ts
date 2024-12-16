import { BooksListResponseDto } from "./book.dto";
import { UsersListResponseDto } from "./user.dto";
import { BaseApiResponseDto } from './base-api-response.dto';

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface PaginatedResponse<T> extends BaseApiResponseDto<T> {
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
  
  export interface PaginatedBooksResponse extends PaginatedResponse<BooksListResponseDto[]> {}
  export interface PaginatedUsersResponse extends PaginatedResponse<UsersListResponseDto[]> {}