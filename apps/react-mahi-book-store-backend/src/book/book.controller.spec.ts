import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
    let controller: BookController;
    let service: BookService;
    const mockBooks = [
        {
            id: 1,
            name: 'Book 1',
            description: 'Test description',
            imageId: 'img1'
        },
    ];
    const mockBook = {
        id: 1,
        name: 'Book 1',
        description: 'Test description',
        imageId: 'img1',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookController],
            providers: [
                {
                    provide: BookService,
                    useValue: {
                        getAllBooks: jest.fn(),
                        getBook: jest.fn(),
                        addBook: jest.fn(),
                        updateBook: jest.fn(),
                        removeBookById: jest.fn(),
                        addUserToFavoriteBook: jest.fn(),
                        removeBookFromFavorites: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<BookController>(BookController);
        service = module.get<BookService>(BookService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllBooks', () => {
        it('should return a list of books', async () => {

            jest.spyOn(service, 'getAllBooks').mockResolvedValue(mockBooks);

            expect(await controller.getAllBooks()).toEqual(mockBooks);
            expect(service.getAllBooks).toHaveBeenCalled();
        });
    });

    describe('getBook', () => {
        it('should return a book by ID', async () => {

            jest.spyOn(service, 'getBook').mockResolvedValue(mockBook);

            expect(await controller.getBook(1)).toEqual(mockBook);
            expect(service.getBook).toHaveBeenCalledWith(1);
        });
    });

    describe('addBook', () => {
        it('should add a new book', async () => {
            const bookData = { name: 'New Book', description: 'Description', imageId: 'img1'};
            const mockBook = { id: 2, ...bookData };
            jest.spyOn(service, 'addBook').mockResolvedValue(mockBook);

            expect(await controller.addBook(bookData)).toEqual(mockBook);
            expect(service.addBook).toHaveBeenCalledWith(bookData);
        });
    });

    describe('updateBook', () => {
        it('should update a book by ID', async () => {
            const bookData = { name: 'Updated Name' };
            const mockBook = { id: 1, name: 'Updated Name', description: 'Description', imageId: 'img1' };
            jest.spyOn(service, 'updateBook').mockResolvedValue(mockBook);

            expect(await controller.updateBook(1, bookData)).toEqual(mockBook);
            expect(service.updateBook).toHaveBeenCalledWith(1, bookData);
        });
    });

    describe('removeBook', () => {
        it('should delete a book by ID', async () => {
            jest.spyOn(service, 'removeBookById').mockResolvedValue(undefined);

            expect(await controller.removeBook(1)).toBeUndefined();
            expect(service.removeBookById).toHaveBeenCalledWith(1);
        });
    });

    describe('addUserToFavoriteBook', () => {
        it('should add a user to the favorites of a book', async () => {
            const userId = 1;
            const bookId = 2;
            const mockResult = { userId, bookId };
            jest.spyOn(service, 'addUserToFavoriteBook').mockResolvedValue(mockResult);

            expect(await controller.addUserToFavoriteBook({ userId }, bookId)).toEqual(mockResult);
            expect(service.addUserToFavoriteBook).toHaveBeenCalledWith(userId, bookId);
        });
    });

    describe('removeBookFromFavorites', () => {
        it('should remove a user from the favorites of a book', async () => {
            const userId = 1;
            const bookId = 2;
            const mockResult = { userId, bookId };
            jest.spyOn(service, 'removeBookFromFavorites').mockResolvedValue(mockResult);

            expect(await controller.removeBookFromFavorites({ userId }, bookId)).toEqual(mockResult);
            expect(service.removeBookFromFavorites).toHaveBeenCalledWith(userId, bookId);
        });
    });
});
