import { CreateUserDto, LoginUserDto } from "@dto/auth.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import * as bcrypt from 'bcrypt';
import { UserService } from "@user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    getUserByEmail: jest.fn(),
    addUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: { sign: jest.fn(() => 'mockToken') } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);

    // Clear mocks before each test
    jest.clearAllMocks();
  });

  const userData: User = {
    id: 1,
    name: 'Test user',
    email: 'test@example.com',
    password: 'hashedPassword',
    lastLoggedIn: undefined
  };

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  const createUserDto: CreateUserDto = { name: 'Test Name', email: 'test@example.com', password: 'password123' };

  describe('register', () => {
    it('should hash the password and call UserService.addUser', async () => {
      const mockUser = { ...userData, email: createUserDto.email };
      const mockToken = 'mockAccessToken';
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);
      jest.spyOn(userService, 'addUser').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await authService.register(createUserDto);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(userService.addUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: undefined
      });
      expect(result).toEqual({ user: userData, accessToken: mockToken });
    });

    it('should throw an error if email is already in use', async () => {
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(userData);
      await expect(authService.register(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should validate user credentials and return accessToken', async () => {
      const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'hashedPassword' };
      const mockToken = 'mockAccessToken';
      // Mock bcrypt.compare to return true (password matches)
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(userData);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await authService.login(loginUserDto);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(loginUserDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginUserDto.password, userData.password); // Ensure compare was called with the correct parameters
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userData.id });
      expect(result).toEqual({ user: userData, accessToken: mockToken });
    });

    it('should throw an error if credentials are invalid', async () => {
      const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'wrongPassword' };

      // Mock bcrypt.compare to return true (password matches)
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(userData);

      await expect(authService.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginUserDto.password, userData.password); // Ensure compare was called with the correct parameters
    });
  });

  describe('logout', () => {
    it('should complete without error', async () => {
      await expect(authService.logout()).resolves.not.toThrow();
    });
  });
});
