import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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

    const mockUserWithBooks = {
        favoriteBooks: [
            {
                id: 1,
                name: 'The Great Gatsby',
                description: 'A classic novel.',
                imageId: 'image123',
            },
        ],
    };


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
    });

    describe('getUserById', () => {
        it('should call UserService.getUserById with correct id', async () => {
            jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

            const result = await userController.getUserById(1);

            expect(userService.getUserById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockUser);
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
    });

    describe('removeUser', () => {
        it('should call UserService.removeUserById with correct id', async () => {
            const mockResponse = mockUser;
            jest.spyOn(userService, 'removeUserById').mockResolvedValue(mockUser);

            const result = await userController.removeUser(1);

            expect(userService.removeUserById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('setUserPassword', () => {
        it('should call UserService.setUserPassword with correct id and password', async () => {
            const passwordData = { password: 'newpassword', ...mockUser };
            const mockResponse = passwordData;
            jest.spyOn(userService, 'setUserPassword').mockResolvedValue(mockResponse);

            const result = await userController.setUserPassword(1, passwordData);

            expect(userService.setUserPassword).toHaveBeenCalledWith(1, passwordData.password);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('setLastLoggedIn', () => {
        it('should call UserService.setLastLoggedIn with correct id and date', async () => {
            const dateData = { lastLoggedIn: new Date() }; // Ensure it matches the expected shape
            const mockResponse = { ...mockUser, lastLoggedIn: dateData.lastLoggedIn }; // Updated mock response
            jest.spyOn(userService, 'setLastLoggedIn').mockResolvedValue(mockResponse);

            const result = await userController.setLastLoggedIn(1, dateData);

            expect(userService.setLastLoggedIn).toHaveBeenCalledWith(1, dateData.lastLoggedIn);
            expect(result).toEqual(mockResponse);
        });
    });


    describe('getUserFavoriteBooks', () => {
        it('should call UserService.getUserFavoriteBooks with correct id', async () => {

            jest.spyOn(userService, 'getUserFavoriteBooks').mockResolvedValue(mockUserWithBooks);

            const result = await userController.getUserFavoriteBooks(1);

            expect(userService.getUserFavoriteBooks).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockUserWithBooks);
        });
    });
});
