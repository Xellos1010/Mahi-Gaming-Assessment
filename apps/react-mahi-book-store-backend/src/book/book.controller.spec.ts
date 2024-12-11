import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
    let controller: BookController;
    let service: BookService;
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

            expect(await controller.getBook(mockBook.id)).toEqual(mockBook);
            expect(service.getBook).toHaveBeenCalledWith(mockBook.id);
        });
    });

    describe('addBook', () => {
        it('should add a new book', async () => {
            jest.spyOn(service, 'addBook').mockResolvedValue(mockBook);
            expect(await controller.addBook(mockBook)).toEqual(mockBook);
            expect(service.addBook).toHaveBeenCalledWith(mockBook);
        });
    });

    describe('updateBook', () => {
        it('should update a book by ID', async () => {
            const mockBookResolve = { ...mockBook, title: 'Updated Name' };
            jest.spyOn(service, 'updateBook').mockResolvedValue(mockBook);

            expect(await controller.updateBook(mockBook.id, mockBookResolve)).toEqual(mockBook);
            expect(service.updateBook).toHaveBeenCalledWith(mockBook.id, mockBookResolve);
        });
    });

    describe('removeBook', () => {
        it('should delete a book by ID', async () => {
            jest.spyOn(service, 'removeBookById').mockResolvedValue(mockBook);
            expect(await controller.removeBookById(mockBook.id)).toEqual(mockBook);
            expect(service.removeBookById).toHaveBeenCalledWith(mockBook.id);
        });
    });

    describe('addUserToFavoriteBook', () => {
        it('should add a user to the favorites of a book', async () => {
            const bookId = 1;
            const userId = 2;
            jest.spyOn(service, 'addUserToFavoriteBook').mockResolvedValue(mockBook);

            expect(await controller.addUserToFavoriteBook(bookId, userId)).toEqual(mockBook);
            expect(service.addUserToFavoriteBook).toHaveBeenCalledWith(bookId, userId);
        });
    });

    describe('removeBookFromFavorites', () => {
        it('should remove a user from the favorites of a book', async () => {
            const bookId = 1;
            const userId = 2;
            jest.spyOn(service, 'removeBookFromFavorites').mockResolvedValue(mockBook);

            expect(await controller.removeBookFromFavorites(bookId, userId)).toEqual(mockBook);
            expect(service.removeBookFromFavorites).toHaveBeenCalledWith(bookId, userId);
        });
    });
});
