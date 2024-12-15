import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { prismaOperations } from '@prismaDist/index';
import { mockBooks, mockBook } from '../consts/shared.tests.consts';
import { BaseBookDatabaseResponseDto, BaseBooksDatabaseResponseDto, BaseGetBookByIdRequestDto } from '@dto/book.dto';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';

jest.mock('@prismaDist/index', () => ({
  prismaOperations: {
    bookQuery: {
      getAllBooks: jest.fn(),
      getBook: jest.fn(),
    },
    bookMutation: {
      addBook: jest.fn(),
      updateBook: jest.fn(),
      removeBookById: jest.fn(),
      addUserToFavoriteBook: jest.fn(),
      removeBookFromFavorites: jest.fn(),
    },
  },
}));

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should call prisma to fetch all books', async () => {
      const mockServiceResolvedValue: BaseApiResponseDto<BaseBooksDatabaseResponseDto> = wrapResponseSuccess(
        new BaseBooksDatabaseResponseDto(mockBooks)
      );
      jest.spyOn(prismaOperations.bookQuery, 'getAllBooks').mockResolvedValue(mockServiceResolvedValue.data);

      expect(await service.getAllBooks()).toEqual(mockServiceResolvedValue);
      expect(prismaOperations.bookQuery.getAllBooks).toHaveBeenCalled();
    });
  });

  describe('getBook', () => {
    it('should call prisma to fetch a book by ID', async () => {
      const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(
        new BaseBookDatabaseResponseDto(
          mockBook
        )
      );
      jest.spyOn(prismaOperations.bookQuery, 'getBook').mockResolvedValue(mockServiceResolvedValue.data);

      const params: BaseGetBookByIdRequestDto = {
        id: mockBook.id
      }
      expect(await service.getBook(params)).toEqual(mockServiceResolvedValue);
      expect(prismaOperations.bookQuery.getBook).toHaveBeenCalledWith(params);
    });
  });
});
