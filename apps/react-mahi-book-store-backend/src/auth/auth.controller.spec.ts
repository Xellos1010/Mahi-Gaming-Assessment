import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../dtos/auth.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { UserService } from '@user/user.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });


  const mockUser: User = {
    id: 1,
    name: 'Test user',
    email: 'test@example.com',
    password: 'hashedPassword',
    lastLoggedIn: undefined
  }
  const createUserDto: CreateUserDto = { name: 'Test user', email: 'test@example.com', password: 'password123' };

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should call AuthService.register and return a success message', async () => {

      jest.spyOn(authService, 'register').mockResolvedValue(mockUser);

      const result = await authController.register(createUserDto);
      expect(userService.getUserByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({ message: 'User registered successfully', user: mockUser }); //The mockUser's hashed password 
    });

    it('should throw an error if AuthService.register fails', async () => {

      jest.spyOn(authService, 'register').mockRejectedValue(new BadRequestException('Email is already in use'));
      await expect(authController.register(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should call AuthService.login and return a success message with user and accessToken', async () => {
      const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'password123' };
      const mockResponse = {
        user: mockUser,
        accessToken: expect.any(String)
      };

      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      const result = await authController.login(loginUserDto);

      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
      expect(result).toEqual({ message: 'Login successful', ...mockResponse });
    });

    it('should throw an error if AuthService.login fails', async () => {
      const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'wrongpassword' };

      jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException('Invalid email or password'));

      await expect(authController.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should call AuthService.logout and return a success message', async () => {
      jest.spyOn(authService, 'logout').mockResolvedValue(undefined);

      const result = await authController.logout();

      expect(authService.logout).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Logout successful' });
    });

    it('should throw an error if AuthService.logout fails', async () => {
      jest.spyOn(authService, 'logout').mockRejectedValue(new Error('Logout failed'));

      await expect(authController.logout()).rejects.toThrow('Logout failed');
    });
  });
});