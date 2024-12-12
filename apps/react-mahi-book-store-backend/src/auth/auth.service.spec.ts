import { CreateUserDto, LoginUserDto } from "@dto/auth.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import * as bcrypt from 'bcrypt';
import { UserService } from "@user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";


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
        { provide: 'UserService', useValue: mockUserService },
        JwtService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  const userData: User = {
    id: 1,
    name: 'Test user',
    email: 'test@example.com',
    password: 'hashedPassword',
    lastLoggedIn: undefined
  }

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  const createUserDto: CreateUserDto = { name: 'Test Name', email: 'test@example.com', password: 'password123' };

  describe('register', () => {
    it('should hash the password and call UserService.addUser', async () => {
      const hashedPassword = 'hashedPassword';
      const mockUser = { ...userData, email: createUserDto.email };

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(userService, 'addUser').mockResolvedValue(mockUser);

      const result = await authService.register(createUserDto);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(userService.addUser).toHaveBeenCalledWith({ ...createUserDto, password: hashedPassword });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if email is already in use', async () => {
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(userData);
      await expect(authService.register(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should validate user credentials and return accessToken', async () => {
      const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'password123' };
      const mockUser = { id: 1, email: loginUserDto.email, password: 'hashedPassword' };
      const mockToken = 'mockAccessToken';

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(userData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await authService.login(loginUserDto);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(loginUserDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginUserDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id });
      expect(result).toEqual({ user: mockUser, accessToken: mockToken });
    });

    it('should throw an error if credentials are invalid', async () => {
      const loginUserDto: LoginUserDto = { email: 'test@example.com', password: 'wrongPassword' };
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(userData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(authService.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should complete without error', async () => {
      await expect(authService.logout()).resolves.not.toThrow();
    });
  });
});
