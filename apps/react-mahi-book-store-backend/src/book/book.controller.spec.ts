import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';

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
        it('should throw an error if BookService.getAllBooks fails', async () => {
            jest.spyOn(service, 'getAllBooks').mockRejectedValue(new Error('Error fetching books'));
            await expect(controller.getAllBooks()).rejects.toThrow('Error fetching books');
        });
    });

    describe('getBook', () => {
        it('should return a book by ID', async () => {

            jest.spyOn(service, 'getBook').mockResolvedValue(mockBook);

            expect(await controller.getBook(mockBook.id)).toEqual(mockBook);
            expect(service.getBook).toHaveBeenCalledWith(mockBook.id);
        });
        it('should throw an error if BookService.getBook fails', async () => {
            const mockId = 1;
            jest.spyOn(service, 'getBook').mockRejectedValue(new NotFoundException(`Book with ID ${mockId} not found`));
            await expect(controller.getBook(mockId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('addBook', () => {
        it('should add a new book', async () => {
            jest.spyOn(service, 'addBook').mockResolvedValue(mockBook);
            expect(await controller.addBook(mockBook)).toEqual(mockBook);
            expect(service.addBook).toHaveBeenCalledWith(mockBook);
        });
        it('should throw an error if BookService.addBook fails', async () => {
            jest.spyOn(service, 'addBook').mockRejectedValue(new BadRequestException('Invalid book data'));
            await expect(controller.addBook(mockBook)).rejects.toThrow(BadRequestException);
        });
    });

    describe('updateBook', () => {
        it('should update a book by ID', async () => {
            const mockBookResolve = { ...mockBook, title: 'Updated Name' };
            jest.spyOn(service, 'updateBook').mockResolvedValue(mockBook);

            expect(await controller.updateBook(mockBook.id, mockBookResolve)).toEqual(mockBook);
            expect(service.updateBook).toHaveBeenCalledWith(mockBook.id, mockBookResolve);
        });
        it('should throw an error if BookService.updateBook fails', async () => {
            const mockId = 1;
            jest.spyOn(service, 'updateBook').mockRejectedValue(new BadRequestException('Update failed'));
            await expect(controller.updateBook(mockId, mockBook)).rejects.toThrow(BadRequestException);
        });
    });

    describe('removeBook', () => {
        it('should delete a book by ID', async () => {
            jest.spyOn(service, 'removeBookById').mockResolvedValue(mockBook);
            expect(await controller.removeBookById(mockBook.id)).toEqual(mockBook);
            expect(service.removeBookById).toHaveBeenCalledWith(mockBook.id);
        });
        it('should throw an error if BookService.removeBookById fails', async () => {
            const mockId = 1;
            jest.spyOn(service, 'removeBookById').mockRejectedValue(new Error('Remove failed'));
            await expect(controller.removeBookById(mockId)).rejects.toThrow(Error);
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

        it('should throw an error if BookService.addUserToFavoriteBook fails', async () => {
            const bookId = 1;
            const userId = 2;
            jest.spyOn(service, 'addUserToFavoriteBook').mockRejectedValue(new BadRequestException('Adding book to favorites failed'));
            await expect(controller.addUserToFavoriteBook(bookId,userId)).rejects.toThrow(BadRequestException);
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
        it('should throw an error if BookService.removeBookFromFavorites fails', async () => {
            const bookId = 1;
            const userId = 2;
            jest.spyOn(service, 'removeBookFromFavorites').mockRejectedValue(new BadRequestException('Removing book to favorites failed'));
            await expect(controller.removeBookFromFavorites(bookId,userId)).rejects.toThrow(BadRequestException);
        });
    });
});
