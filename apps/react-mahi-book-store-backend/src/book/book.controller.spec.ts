import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import {
    BaseBookDatabaseResponseDto,
    BaseBooksDatabaseResponseDto,
    BaseGetBookByIdRequestDto,
    BaseUserFavoriteBookDto,
    CreateBookDto,
    UpdateBookApiRequestDto
} from '@dto/book.dto';
import { mockBooks, mockBook } from '../consts/shared.tests.consts';
import { BaseGetUserByIdRequestDto } from '@dto/user.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';

describe('BookController', () => {
    let controller: BookController;
    let service: BookService;

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
            const mockServiceResolvedValue: BaseApiResponseDto<BaseBooksDatabaseResponseDto> = wrapResponseSuccess(new BaseBooksDatabaseResponseDto(mockBooks));
            jest.spyOn(service, 'getAllBooks').mockResolvedValue(mockServiceResolvedValue);

            expect(await controller.getAllBooks()).toEqual(mockServiceResolvedValue);
            expect(service.getAllBooks).toHaveBeenCalled();
        });

        it('should throw an error if BookService.getAllBooks fails', async () => {
            jest.spyOn(service, 'getAllBooks').mockRejectedValue(new Error('Error fetching books'));
            await expect(controller.getAllBooks()).rejects.toThrow('Error fetching books');
        });
    });

    describe('getBook', () => {
        const params: BaseGetBookByIdRequestDto = new BaseGetBookByIdRequestDto(mockBook.id);
        it('should return a book by ID', async () => {
            const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(new BaseBookDatabaseResponseDto(mockBook));

            jest.spyOn(service, 'getBook').mockResolvedValue(mockServiceResolvedValue);

            expect(await controller.getBook(params)).toEqual(mockServiceResolvedValue);
            expect(service.getBook).toHaveBeenCalledWith(params);
        });
        it('should throw an error if BookService.getBook fails', async () => {
            jest.spyOn(service, 'getBook').mockRejectedValue(new NotFoundException(`Book with ID ${mockBook.id} not found`));

            await expect(controller.getBook(params)).rejects.toThrow(NotFoundException);
        });
    });

    describe('addBook', () => {
        it('should add a new book', async () => {
            const bookData: CreateBookDto = new CreateBookDto({
                title: mockBook.title,
                author: mockBook.author,
                description: mockBook.description,
                imageId: mockBook.imageId
            });

            const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(new BaseBookDatabaseResponseDto(mockBook));

            jest.spyOn(service, 'addBook').mockResolvedValue(mockServiceResolvedValue);

            expect(await controller.addBook(bookData)).toEqual(mockServiceResolvedValue);
            expect(service.addBook).toHaveBeenCalledWith(bookData);
        });

        it('should throw an error if BookService.addBook fails', async () => {
            const bookData: CreateBookDto = new CreateBookDto({
                title: mockBook.title,
                author: mockBook.author
            });

            jest.spyOn(service, 'addBook').mockRejectedValue(new BadRequestException('Invalid book data'));

            await expect(controller.addBook(bookData)).rejects.toThrow(BadRequestException);
        });
    });

    describe('updateBook', () => {
        const updateParams: UpdateBookApiRequestDto = new UpdateBookApiRequestDto(
            mockBook.id,
            { title: 'Updated Name' }
        );
        it('should update a book by ID', async () => {
            const mockBookUpdate = { ...mockBook, title: 'Updated Name' };
            const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(new BaseBookDatabaseResponseDto(mockBookUpdate));

            jest.spyOn(service, 'updateBook').mockResolvedValue(mockServiceResolvedValue);

            expect(await controller.updateBook(updateParams.id, updateParams.data)).toEqual(mockServiceResolvedValue);
            expect(service.updateBook).toHaveBeenCalledWith(updateParams);
        });

        it('should throw an error if BookService.updateBook fails', async () => {
            jest.spyOn(service, 'updateBook').mockRejectedValue(new BadRequestException('Update failed'));

            await expect(controller.updateBook(updateParams.id, updateParams.data)).rejects.toThrow(BadRequestException);
        });
    });

    describe('removeBook', () => {
        const params: BaseGetBookByIdRequestDto = new BaseGetBookByIdRequestDto(mockBook.id);
        it('should delete a book by ID', async () => {
            const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(new BaseBookDatabaseResponseDto(mockBook));

            jest.spyOn(service, 'removeBookById').mockResolvedValue(mockServiceResolvedValue);

            expect(await controller.removeBookById(params.id)).toEqual(mockServiceResolvedValue);
            expect(service.removeBookById).toHaveBeenCalledWith(params);
        });

        it('should throw an error if BookService.removeBookById fails', async () => {
            jest.spyOn(service, 'removeBookById').mockRejectedValue(new Error('Remove failed'));
            await expect(controller.removeBookById(params.id)).rejects.toThrow(Error);
        });
    });

    describe('addUserToFavoriteBook', () => {
        const params: BaseUserFavoriteBookDto = new BaseUserFavoriteBookDto(1, 2);
        it('should add a user to the favorites of a book', async () => {
            const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(new BaseBookDatabaseResponseDto(mockBook));

            jest.spyOn(service, 'addUserToFavoriteBook').mockResolvedValue(mockServiceResolvedValue);
            expect(await controller.addUserToFavoriteBook(
                new BaseGetBookByIdRequestDto(params.bookId),
                new BaseGetUserByIdRequestDto(params.userId)
            )).toEqual(mockServiceResolvedValue);
            expect(service.addUserToFavoriteBook).toHaveBeenCalledWith(params);
        });

        it('should throw an error if BookService.addUserToFavoriteBook fails', async () => {
            jest.spyOn(service, 'addUserToFavoriteBook').mockRejectedValue(new BadRequestException('Adding book to favorites failed'));

            await expect(controller.addUserToFavoriteBook(
                new BaseGetBookByIdRequestDto(params.bookId),
                new BaseGetUserByIdRequestDto(params.userId)
            )).rejects.toThrow(BadRequestException);
        });
    });

    describe('removeBookFromFavorites', () => {
        const params: BaseUserFavoriteBookDto = new BaseUserFavoriteBookDto(1, 2);
        it('should remove a user from the favorites of a book', async () => {
            const mockServiceResolvedValue: BaseApiResponseDto<BaseBookDatabaseResponseDto> = wrapResponseSuccess(new BaseBookDatabaseResponseDto(mockBook));

            jest.spyOn(service, 'removeBookFromFavorites').mockResolvedValue(mockServiceResolvedValue);

            expect(await controller.removeBookFromFavorites(
                new BaseGetBookByIdRequestDto(params.bookId),
                new BaseGetUserByIdRequestDto(params.userId)
            )).toEqual(mockServiceResolvedValue);
            expect(service.removeBookFromFavorites).toHaveBeenCalledWith(params);
        });

        it('should throw an error if BookService.removeBookFromFavorites fails', async () => {
            const bookId = 1;
            const userId = 2;

            jest.spyOn(service, 'removeBookFromFavorites').mockRejectedValue(new BadRequestException('Removing book from favorites failed'));

            await expect(controller.removeBookFromFavorites(
                new BaseGetBookByIdRequestDto(params.bookId),
                new BaseGetUserByIdRequestDto(params.userId)
            )).rejects.toThrow(BadRequestException);
        });
    });
});