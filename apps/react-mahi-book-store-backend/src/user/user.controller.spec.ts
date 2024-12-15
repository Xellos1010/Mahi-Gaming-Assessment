import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { BaseGetUserByIdRequestDto, BaseUserDatabaseResponseDto, BaseUsersDatabaseResponseDto, SetUserPasswordRequestDto, UpdateUserPasswordDto } from '@dto/user.dto';
import { mockUsers, mockUser, mockBooks } from '../consts/shared.tests.consts';
import { CreateUserRequestDto } from '@dto/auth.dto';
import { BaseBooksDatabaseResponseDto } from '@dto/book.dto';
import { BaseApiResponseDto } from '@dto/base.response.dto';
import { wrapResponseSuccess } from '../util/api-responses-formatter.util';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getAllUsers: jest.fn(),
                        getUserById: jest.fn(),
                        addUser: jest.fn(),
                        removeUserById: jest.fn(),
                        setUserPassword: jest.fn(),
                        setLastLoggedIn: jest.fn(),
                        getUserFavoriteBooks: jest.fn(),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    describe('getAllUsers', () => {
        it('should call UserService.getAllUsers and return all users', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUsersDatabaseResponseDto> = wrapResponseSuccess(new BaseUsersDatabaseResponseDto(
                mockUsers
            ));
            jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockResolvedValue);

            const result = await userController.getAllUsers();

            expect(userService.getAllUsers).toHaveBeenCalled();
            expect(result).toEqual(mockResolvedValue);
        });
        it('should throw an error if UserService.getAllUsers fails', async () => {
            jest.spyOn(userService, 'getAllUsers').mockRejectedValue(new BadRequestException('Get all users failed'));
            await expect(userController.getAllUsers()).rejects.toThrow(BadRequestException);
        });
    });

    describe('getUserById', () => {
        const params: BaseGetUserByIdRequestDto = new BaseGetUserByIdRequestDto(
            mockUser.id
        );
        it('should call UserService.getUserById with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(new BaseUserDatabaseResponseDto(
                mockUser
            ));
            jest.spyOn(userService, 'getUserById').mockResolvedValue(mockResolvedValue);

            const result = await userController.getUserById(params);
            expect(userService.getUserById).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
        it('should throw an error if UserService.getUserById fails', async () => {
            jest.spyOn(userService, 'getUserById').mockRejectedValue(new NotFoundException(`User with ID ${params.id} not found`));
            await expect(userController.getUserById(params)).rejects.toThrow(NotFoundException);
        });
    });

    describe('addUser', () => {
        it('should call UserService.addUser with correct data', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(new BaseUserDatabaseResponseDto(
                mockUser
            ));
            jest.spyOn(userService, 'addUser').mockResolvedValue(mockResolvedValue);

            const params: CreateUserRequestDto = mockUser as CreateUserRequestDto;
            const result = await userController.addUser(params);

            expect(userService.addUser).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
        it('should throw an error if UserService.addUser fails', async () => {
            jest.spyOn(userService, 'addUser').mockRejectedValue(new BadRequestException('Invalid user data'));
            await expect(userController.addUser(mockUser)).rejects.toThrow(BadRequestException);
        });
    });

    describe('removeUser', () => {
        const params: BaseGetUserByIdRequestDto = {
            id: mockUser.id
        };
        it('should call UserService.removeUserById with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(new BaseUserDatabaseResponseDto(
                mockUser
            ));
            jest.spyOn(userService, 'removeUserById').mockResolvedValue(mockResolvedValue);
            const result = await userController.removeUserById(params);

            expect(userService.removeUserById).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
        it('should throw an error if UserService.removeUserById fails', async () => {
            jest.spyOn(userService, 'removeUserById').mockRejectedValue(new Error('Remove user failed'));
            await expect(userController.removeUserById(params)).rejects.toThrow(Error);
        });
    });

    describe('setUserPassword', () => {
        const userWithPasswordData = { password: 'newpassword', ...mockUser };
        const expectedToHaveBeenCalledWith: SetUserPasswordRequestDto = {
            id: mockUser.id,
            password: userWithPasswordData.password
        };
        it('should call UserService.setUserPassword with correct id and password', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseUserDatabaseResponseDto> = wrapResponseSuccess(new BaseUserDatabaseResponseDto(
                userWithPasswordData
            ));
            jest.spyOn(userService, 'setUserPassword').mockResolvedValue(mockResolvedValue);
            const result = await userController.setUserPassword(new BaseGetUserByIdRequestDto(expectedToHaveBeenCalledWith.id), new UpdateUserPasswordDto(expectedToHaveBeenCalledWith.password));

            expect(userService.setUserPassword).toHaveBeenCalledWith(
                expectedToHaveBeenCalledWith
            );
            expect(result).toEqual(mockResolvedValue);
        });
        it('should throw an error if UserService.setUserPassword fails', async () => {
            jest.spyOn(userService, 'setUserPassword').mockRejectedValue(new BadRequestException('Password set failed'));
            await expect(userController.setUserPassword(new BaseGetUserByIdRequestDto(expectedToHaveBeenCalledWith.id), new UpdateUserPasswordDto(expectedToHaveBeenCalledWith.password))).rejects.toThrow(BadRequestException);
        });
    });

    describe('getUserFavoriteBooks', () => {
        const params: BaseGetUserByIdRequestDto = {
            id: mockUser.id
        };
        it('should call UserService.getUserFavoriteBooks with correct id', async () => {
            const mockResolvedValue: BaseApiResponseDto<BaseBooksDatabaseResponseDto> = wrapResponseSuccess(new BaseBooksDatabaseResponseDto(
                mockBooks
            ));
            jest.spyOn(userService, 'getUserFavoriteBooks').mockResolvedValue(mockResolvedValue);
            const result = await userController.getUserFavoriteBooks(params);

            expect(userService.getUserFavoriteBooks).toHaveBeenCalledWith(params);
            expect(result).toEqual(mockResolvedValue);
        });
        it('should throw an error if UserService.getUserFavoriteBooks fails', async () => {
            jest.spyOn(userService, 'getUserFavoriteBooks').mockRejectedValue(new Error('Get favorite books failed'));
            await expect(userController.getUserFavoriteBooks(params)).rejects.toThrow(Error);
        });
    });
});
