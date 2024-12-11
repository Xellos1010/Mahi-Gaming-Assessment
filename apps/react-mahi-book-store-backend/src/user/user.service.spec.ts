import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { prismaOperations } from '@prismaDist/index';

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

    const mockUserWithBooks = [{
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A classic novel.',
        imageId: 'image123',
    }];
    // const mockUserWithBooks = [
    //     {
    //         id: 1,
    //         name: 'The Great Gatsby',
    //         description: 'A classic novel.',
    //         imageId: 'image123',
    //     },
    // ];

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
            jest.spyOn(prismaOperations.userQuery, 'getAllUsers').mockResolvedValue(mockUsers);

            const result = await userService.getAllUsers();

            expect(prismaOperations.userQuery.getAllUsers).toHaveBeenCalled();
            expect(result).toEqual(mockUsers);
        });
    });

    describe('getUserById', () => {
        it('should call prismaOperations.userQuery.getUserById with correct id', async () => {
            jest.spyOn(prismaOperations.userQuery, 'getUserById').mockResolvedValue(mockUser);

            const result = await userService.getUserById(mockUser.id);

            expect(prismaOperations.userQuery.getUserById).toHaveBeenCalledWith({
                id: mockUser.id
            });
            expect(result).toEqual(mockUser);
        });
    });

    describe('addUser', () => {
        it('should call prismaOperations.userMutation.addUser with correct data', async () => {
            const mockResponse = mockUser;
            jest.spyOn(prismaOperations.userMutation, 'addUser').mockResolvedValue(mockResponse);

            const result = await userService.addUser(mockUser);

            expect(prismaOperations.userMutation.addUser).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('removeUserById', () => {
        it('should call prismaOperations.userMutation.removeUserById with correct id', async () => {
            const mockResponse = mockUser;
            jest.spyOn(prismaOperations.userMutation, 'removeUserById').mockResolvedValue(mockResponse);

            const result = await userService.removeUserById(mockUser.id);

            expect(prismaOperations.userMutation.removeUserById).toHaveBeenCalledWith({
                id: mockUser.id
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('setUserPassword', () => {
        it('should call prismaOperations.userMutation.setUserPassword with correct id and password', async () => {
            const mockResponse = mockUser;
            jest.spyOn(prismaOperations.userMutation, 'setUserPassword').mockResolvedValue(mockResponse);

            const result = await userService.setUserPassword(mockUser.id, { password: 'newpassword' });

            expect(prismaOperations.userMutation.setUserPassword).toHaveBeenCalledWith({
                where: {id: mockUser.id}, 
                password: { password: 'newpassword' }
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('setLastLoggedIn', () => {
        it('should call prismaOperations.userMutation.setLastLoggedIn with correct id and date', async () => {
            const date = new Date();
            const mockResponse = { lastLoggedIn: date, ...mockUser };
            jest.spyOn(prismaOperations.userMutation, 'setLastLoggedIn').mockResolvedValue(mockResponse);

            const result = await userService.setLastLoggedIn(mockUser.id, { lastLoggedIn: date });;

            expect(prismaOperations.userMutation.setLastLoggedIn).toHaveBeenCalledWith({
                where: { id:mockUser.id}, 
                lastLoggedIn: { lastLoggedIn: date }
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getUserFavoriteBooks', () => {
        it('should call prismaOperations.userQuery.getUserFavoriteBooks with correct id', async () => {
            jest.spyOn(prismaOperations.userQuery, 'getUserFavoriteBooks').mockResolvedValue(mockUserWithBooks);

            const result = await userService.getUserFavoriteBooks(mockUser.id);

            expect(prismaOperations.userQuery.getUserFavoriteBooks).toHaveBeenCalledWith(
                { id: mockUser.id }
            );
            expect(result).toEqual(mockUserWithBooks);
        });
    });
});
