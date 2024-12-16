import { BaseApiService } from './base-api-service';
import { BaseBookIdDto, BaseCreateBookDto, BaseUpdateBookDto, SingleBookResponseDto } from '@prismaDist/dtos/lib/book.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { LogAll } from '@shared-decorators';
import { ReactBooksListResponseDto } from '../../dtos/books.dtos';
export class BookService extends BaseApiService {
  constructor() {
    super('http://localhost:3000/api/books');
  }

  @LogAll()
  async fetchAll(params?: Record<string, any>): Promise<ReactBooksListResponseDto> {
    return this.handleRequest<ReactBooksListResponseDto>('get', '', undefined, { params });
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
