import { BaseApiService } from './base-api-service';
import { BaseBookIdDto, BaseCreateBookDto, BaseUpdateBookDto, SingleBookResponseDto } from '@prismaDist/dtos/lib/book.dto';
import { ApiResponseDto } from '@nestDtos/base.api-response.dto';
import { LogAll } from '@shared-decorators';
import { ReactBooksListResponseDto } from '../../dtos/books.dtos';
export class BookService extends BaseApiService {
  constructor() {
    super('/books');
  }

  @LogAll()
  async fetchAll(params?: Record<string, any>): Promise<ReactBooksListResponseDto> {
    return this.handleRequest<ReactBooksListResponseDto>('get', '', undefined, { params });
  }

  @LogAll()
  async fetchById(bookId: number): Promise<SingleBookResponseDto> {
    return this.handleRequest<SingleBookResponseDto>('get', `${bookId}`);
  }

  async create(bookData: BaseCreateBookDto): Promise<SingleBookResponseDto> {
    return this.handleRequest<SingleBookResponseDto>('post', '', bookData);
  }

  async update(bookId: BaseBookIdDto, bookData: BaseUpdateBookDto): Promise<SingleBookResponseDto> {
    return this.handleRequest<SingleBookResponseDto>('patch', `${bookId}`, bookData);
  }

  async remove(bookId: number): Promise<void> {
    return this.handleRequest<void>('delete', `${bookId}`);
  }

  @LogAll()
  async addToFavorites(userId: number, bookId: number): Promise<SingleBookResponseDto> {
    return this.handleRequest<SingleBookResponseDto>('post', `${bookId}/favorites`, { userId });
  }

  @LogAll()
  async removeFromFavorites(userId: number, bookId: number): Promise<SingleBookResponseDto> {
    return this.handleRequest<SingleBookResponseDto>('delete', `${bookId}/favorites`, { userId });
  }
}
