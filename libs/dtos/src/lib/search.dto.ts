import { PaginationParams } from "./pagination.dto";

export interface SearchParams {
    query?: string;
    filters?: Record<string, string | number | boolean>;
  }
  
  export interface SearchBooksRequest extends PaginationParams, SearchParams {}
  export interface SearchUsersRequest extends PaginationParams, SearchParams {}