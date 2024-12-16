import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { prismaOperations } from '@prismaDist/index';

import { favoriteBooks, mockUser, mockUsers } from '../decorators/consts/shared.tests.consts';

import { wrapResponseSuccess } from '../util/api-responses-formatter.util';
import { BaseUsersDatabaseResponseDto, BaseUserDatabaseResponseDto, SetUserPasswordRequestDto, CreateUserRequestDto, GetUserByIdRequestDto } from '@nestDtos/user.dto';
import { BaseApiResponseDto, BaseUserIdDto } from '@prismaDist/dtos';

import { PrismaDatabaseSetUserPasswordParams, PrismaUserResponseWithFavoriteBooks } from 'libs/prisma/src/types/user.types';
import { PrismaUserWithFavoriteBooksResponse } from 'libs/prisma/src/dtos/lib/user.dto';

jest.mock('@prismaDist/index', () => ({
    prismaOperations: {
        userQuery: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            getUserFavoriteBooks: jest.fn(),
        },
        userMutation: {
            addUser: jest.fn(),
            removeUserById: jest.fn(),
            setUserPassword: jest.fn(),
            setLastLoggedIn: jest.fn(),
        },
    },
}));

describe('UserService', () => {
    let userService: UserService;

    const mockUserWithBooks: PrismaUserResponseWithFavoriteBooks = {
        ...mockUser,
        favoriteBooks
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('getAllUsers', () => {
        it('should call prismaOperations.userQuery.getAllUsers and return users', async () => {
            const mockUserServiceResolvedValue: BaseApiResponseDto<BaseUsersDatabaseResponseDto> = wrapResponseSuccess(new BaseUsersDatabaseResponseDto(
                mockUsers
            ));
            jest.spyOn(prismaOperations.userQuery, 'getAllUsers').mockResolvedValue(mockUserServiceResolvedValue.data);

            const result = await userService.getAllUsers();
            expect(prismaOperations.userQuery.getAllUsers).toHaveBeenCalled();
            expect(result).toEqual(mockUserServiceResolvedValue);
        });
    });

    describe('getUserById', () => {
        it('should call prismaOperations.userQuery.getUserById with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(new BaseUserDatabaseResponseDto(
                mockUser
            ));
            jest.spyOn(prismaOperations.userQuery, 'getUserById').mockResolvedValue(mockResolvedValue.data);
            const params: GetUserByIdRequestDto = {
                id: mockUser.id
            };
            const result = await userService.getUserById(params);

            expect(prismaOperations.userQuery.getUserById).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
    });

    describe('addUser', () => {
        it('should call prismaOperations.userMutation.addUser with correct data', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(
                new BaseUserDatabaseResponseDto(
                    mockUser
                )
            );
            jest.spyOn(prismaOperations.userMutation, 'addUser').mockResolvedValue(mockResolvedValue.data);
            const params: CreateUserRequestDto =
            {
                ...mockUser
            };
            const result = await userService.addUser(params);

            expect(prismaOperations.userMutation.addUser).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
    });

    describe('removeUserById', () => {
        it('should call prismaOperations.userMutation.removeUserById with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(
                new BaseUserDatabaseResponseDto(
                    mockUser
                )
            );
            jest.spyOn(prismaOperations.userMutation, 'removeUserById').mockResolvedValue(mockResolvedValue.data);
            const params: GetUserByIdRequestDto = {
                id: mockUser.id
            };
            const result = await userService.removeUserById(params);

            expect(prismaOperations.userMutation.removeUserById).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
    });

    describe('setUserPassword', () => {
        it('should call prismaOperations.userMutation.setUserPassword with correct id and password', async () => {
            const userPassword: string = 'newpassword';

            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(
                new BaseUserDatabaseResponseDto(
                    mockUser
                )
            );

            jest.spyOn(prismaOperations.userMutation, 'setUserPassword').mockResolvedValue(mockResolvedValue.data);

            const params: SetUserPasswordRequestDto = {
                id: mockUser.id,
                password: userPassword
            };
            const result = await userService.setUserPassword(params);

            const expectedToHaveBeenCalledWith: PrismaDatabaseSetUserPasswordParams = {
                where: { id: mockUser.id },
                password: userPassword
            }
            expect(prismaOperations.userMutation.setUserPassword).toHaveBeenCalledWith(expectedToHaveBeenCalledWith);
            expect(result).toEqual(mockResolvedValue);
        });
    });

    describe('setLastLoggedInNow', () => {
        it('should call prismaOperations.userMutation.setLastLoggedIn with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(new BaseUserDatabaseResponseDto(
                mockUser
            ));
            jest.spyOn(prismaOperations.userMutation, 'setLastLoggedIn').mockResolvedValue(mockResolvedValue.data);

            const params: GetUserByIdRequestDto = new GetUserByIdRequestDto(mockUser.id);
            const result = await userService.setLastLoggedInNow(params);;

            const expectedToHaveBeenCalledWith: BaseUserIdDto  = { id: mockUser.id }; 
            expect(prismaOperations.userMutation.setLastLoggedIn).toHaveBeenCalledWith(expectedToHaveBeenCalledWith);
            expect(result).toEqual(mockResolvedValue);
        });
    });

    describe('getUserFavoriteBooks', () => {
        it('should call prismaOperations.userQuery.getUserFavoriteBooks with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<PrismaUserWithFavoriteBooksResponse> = wrapResponseSuccess({ user: { ...mockUser, favoriteBooks } } as PrismaUserWithFavoriteBooksResponse);
            jest.spyOn(prismaOperations.userQuery, 'getUserFavoriteBooks').mockResolvedValue(mockResolvedValue.data);

            const params: GetUserByIdRequestDto = { id: mockUser.id };
            const result = await userService.getUserFavoriteBooks(params);

            expect(prismaOperations.userQuery.getUserFavoriteBooks).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
    });
});
