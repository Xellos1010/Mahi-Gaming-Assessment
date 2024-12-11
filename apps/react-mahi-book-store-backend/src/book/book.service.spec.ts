import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { prismaOperations } from '@prismaDist/index';

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

const mockBooks = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    description: 'Test description',
    imageId: 'img1'
  },
];
const mockBook = {
  id: 1,
  title: 'Book 1',
  author: 'Author 1',
  description: 'Test description',
  imageId: 'img1',
};

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
      jest.spyOn(prismaOperations.bookQuery, 'getAllBooks').mockResolvedValue(mockBooks);

      expect(await service.getAllBooks()).toEqual(mockBooks);
      expect(prismaOperations.bookQuery.getAllBooks).toHaveBeenCalled();
    });
  });

  describe('getBook', () => {
    it('should call prisma to fetch a book by ID', async () => {
      jest.spyOn(prismaOperations.bookQuery, 'getBook').mockResolvedValue(mockBook);

      expect(await service.getBook(mockBook.id)).toEqual(mockBook);
      expect(prismaOperations.bookQuery.getBook).toHaveBeenCalledWith(
        { id: mockBook.id }
      );
    });
  });
});
