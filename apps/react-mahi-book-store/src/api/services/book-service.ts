import { BaseApiService } from './base-api-service';
import { LogAll } from '../decorators/log-decorators';
import { BaseBookIdDto, BaseCreateBookDto, BaseUpdateBookDto, BooksListResponseDto, SingleBookResponseDto } from '@prismaDist/dtos/lib/book.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
export class BookService extends BaseApiService {
  constructor() {
    super('http://localhost:3000/api/books');
  }

  @LogAll()
  async fetchAll(params?: Record<string, any>): Promise<ApiResponseDto<BooksListResponseDto>> {
    return this.handleRequest<ApiResponseDto<BooksListResponseDto>>('get', '', undefined, { params });
  }

  @LogAll()
  async fetchById(bookId: number): Promise<ApiResponseDto<SingleBookResponseDto>> {
    return this.handleRequest<ApiResponseDto<SingleBookResponseDto>>('get', `${bookId}`);
  }

  async create(bookData: BaseCreateBookDto): Promise<ApiResponseDto<SingleBookResponseDto>> {
    return this.handleRequest<ApiResponseDto<SingleBookResponseDto>>('post', '', bookData);
  }

  async update(bookId: BaseBookIdDto, bookData: BaseUpdateBookDto): Promise<ApiResponseDto<SingleBookResponseDto>> {
    return this.handleRequest<ApiResponseDto<SingleBookResponseDto>>('patch', `${bookId}`, bookData);
  }

  async remove(bookId: number): Promise<void> {
    return this.handleRequest<void>('delete', `${bookId}`);
  }

  @LogAll()
  async addToFavorites(userId: number, bookId: number): Promise<ApiResponseDto<SingleBookResponseDto>> {
    return this.handleRequest<ApiResponseDto<SingleBookResponseDto>>('post', `${bookId}/favorites`, { userId });
  }

  @LogAll()
  async removeFromFavorites(userId: number, bookId: number): Promise<ApiResponseDto<SingleBookResponseDto>> {
    return this.handleRequest<ApiResponseDto<SingleBookResponseDto>>('delete', `${bookId}/favorites`, { userId });
  }
}
