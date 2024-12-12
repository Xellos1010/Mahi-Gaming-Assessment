import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'securepassword',
        lastLoggedIn: new Date(),
    };

    const mockUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'securepassword',
            lastLoggedIn: new Date(),
        },
    ];

    const mockUserWithBooks = [
        {
            id: 1,
            title: 'The Great Gatsby',
            author: "Author 1",
            description: 'A classic novel.',
            imageId: 'image123',
        },
    ];


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
            jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers);

            const result = await userController.getAllUsers();

            expect(userService.getAllUsers).toHaveBeenCalled();
            expect(result).toEqual(mockUsers);
        });
        it('should throw an error if UserService.getAllUsers fails', async () => {
            jest.spyOn(userService, 'getAllUsers').mockRejectedValue(new BadRequestException('Get all users failed'));
            await expect(userController.getAllUsers()).rejects.toThrow(BadRequestException);
        });
    });

    describe('getUserById', () => {
        it('should call UserService.getUserById with correct id', async () => {
            jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

            const result = await userController.getUserById(mockUser.id);

            expect(userService.getUserById).toHaveBeenCalledWith(mockUser.id);
            expect(result).toEqual(mockUser);
        });
        it('should throw an error if UserService.getUserById fails', async () => {
            const mockId = 1;
            jest.spyOn(userService, 'getUserById').mockRejectedValue(new NotFoundException(`User with ID ${mockId} not found`));
            await expect(userController.getUserById(mockId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('addUser', () => {
        it('should call UserService.addUser with correct data', async () => {
            const mockResponse = mockUser;
            jest.spyOn(userService, 'addUser').mockResolvedValue(mockResponse);

            const result = await userController.addUser(mockUser);

            expect(userService.addUser).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockResponse);
        });
        it('should throw an error if UserService.addUser fails', async () => {
            jest.spyOn(userService, 'addUser').mockRejectedValue(new BadRequestException('Invalid user data'));
            await expect(userController.addUser(mockUser)).rejects.toThrow(BadRequestException);
        });
    });

    describe('removeUser', () => {
        it('should call UserService.removeUserById with correct id', async () => {
            const mockResponse = mockUser;
            jest.spyOn(userService, 'removeUserById').mockResolvedValue(mockUser);

            const result = await userController.removeUserById(mockUser.id);

            expect(userService.removeUserById).toHaveBeenCalledWith(mockUser.id);
            expect(result).toEqual(mockResponse);
        });
        it('should throw an error if UserService.removeUserById fails', async () => {
            const mockId = 1;
            jest.spyOn(userService, 'removeUserById').mockRejectedValue(new Error('Remove user failed'));
            await expect(userController.removeUserById(mockId)).rejects.toThrow(Error);
        });
    });

    describe('setUserPassword', () => {
        it('should call UserService.setUserPassword with correct id and password', async () => {
            const userWithPasswordData = { password: 'newpassword', ...mockUser };
            jest.spyOn(userService, 'setUserPassword').mockResolvedValue(userWithPasswordData);

            const result = await userController.setUserPassword(mockUser.id, { password: userWithPasswordData.password });

            expect(userService.setUserPassword).toHaveBeenCalledWith(
                mockUser.id, // This is the 'where' condition
                { password: userWithPasswordData.password } // This is the password
            );
            expect(result).toEqual(userWithPasswordData);
        });
        it('should throw an error if UserService.setUserPassword fails', async () => {
            const mockId = 1;
            jest.spyOn(userService, 'setUserPassword').mockRejectedValue(new BadRequestException('Password set failed'));
            await expect(userController.setUserPassword(mockId, { password: 'newpassword' })).rejects.toThrow(BadRequestException);
        });
    });

    describe('setLastLoggedIn', () => {
        it('should call UserService.setLastLoggedIn with correct id and date', async () => {
            const lastLoggedIn: Date = new Date(); // Ensure it matches the expected shape
            const mockResponse = { ...mockUser, lastLoggedIn }; // Updated mock response
            jest.spyOn(userService, 'setLastLoggedIn').mockResolvedValue(mockResponse);

            const result = await userController.setLastLoggedIn(mockUser.id, { lastLoggedIn });

            expect(userService.setLastLoggedIn).toHaveBeenCalledWith(
                mockUser.id, // The 'where' clause for the id
                { lastLoggedIn: lastLoggedIn } // The actual data being updated
            );
            expect(result).toEqual(mockResponse);
        });
        it('should throw an error if UserService.setLastLoggedIn fails', async () => {
            const mockId = 1;
            jest.spyOn(userService, 'setLastLoggedIn').mockRejectedValue(new Error('Set last logged in failed'));
            await expect(userController.setLastLoggedIn(mockId, { lastLoggedIn: new Date() })).rejects.toThrow(Error);
        });
    });


    describe('getUserFavoriteBooks', () => {
        it('should call UserService.getUserFavoriteBooks with correct id', async () => {

            jest.spyOn(userService, 'getUserFavoriteBooks').mockResolvedValue(mockUserWithBooks);

            const result = await userController.getUserFavoriteBooks(mockUser.id);

            expect(userService.getUserFavoriteBooks).toHaveBeenCalledWith(mockUser.id);
            expect(result).toEqual(mockUserWithBooks);
        });
        it('should throw an error if UserService.getUserFavoriteBooks fails', async () => {
            const mockId = 1;
            jest.spyOn(userService, 'getUserFavoriteBooks').mockRejectedValue(new Error('Get favorite books failed'));
            await expect(userController.getUserFavoriteBooks(mockId)).rejects.toThrow(Error);
        });
    });
});
