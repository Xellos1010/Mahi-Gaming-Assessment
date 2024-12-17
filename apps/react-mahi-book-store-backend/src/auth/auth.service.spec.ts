import { LoginUserDatabaseResponseDto, LoginUserRequestDto } from "@nestDtos/auth.dto";
import { TestingModule, Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { BaseGetUserByEmailRequestDto, CreateUserRequestDto, UserWithFavoritesDatabaseResponseDto } from "@nestDtos/user.dto";
import { mockUser, mockUserWithBooks } from "../decorators/consts/shared.tests.consts";
import { wrapResponseSuccess } from "../util/api-responses-formatter.util";
import { loginSuccessMessage, registerSuccessMessage } from "../decorators/consts/auth.consts";
import { BaseCreateUserDatabaseResponseDto } from "@prismaDist/dtos";
import { UserService } from "../user/user.service";
const mockAccessToken = 'mockAccessToken';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    getUserByEmailIncludeFavoriteBooks: jest.fn(),
    addUser: jest.fn(),
    setLastLoggedInNow: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    const createUserDto: CreateUserRequestDto = mockUser as CreateUserRequestDto;

    it('should hash the password and call UserService.addUser', async () => {
      const mockUserServiceGetNonExistentUserResolvedValue = wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(
        new UserWithFavoritesDatabaseResponseDto(null)
      );

      jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(mockUserServiceGetNonExistentUserResolvedValue);
      jest.spyOn(userService, 'addUser').mockResolvedValue(
        wrapResponseSuccess<BaseCreateUserDatabaseResponseDto>(
          { user: mockUser, accessToken: mockAccessToken} as BaseCreateUserDatabaseResponseDto,
          registerSuccessMessage
        )
      );
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessToken);

      const result = await authService.register(createUserDto);

      expect(userService.getUserByEmailIncludeFavoriteBooks).toHaveBeenCalledWith(new BaseGetUserByEmailRequestDto(createUserDto.email));
      expect(userService.addUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: undefined,
      });
      expect(result).toEqual(
        wrapResponseSuccess<BaseCreateUserDatabaseResponseDto>(
          { user: mockUser, accessToken: mockAccessToken} as BaseCreateUserDatabaseResponseDto,
          registerSuccessMessage
        )
      );
    });

    // it('should throw BadRequestException if email already exists', async () => {
    //   const mockUserServiceGetExistentUserResolvedValue = wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(
    //     new UserWithFavoritesDatabaseResponseDto(mockUserWithBooks)
    //   );

    //   jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(mockUserServiceGetExistentUserResolvedValue);

    //   await expect(authService.register(createUserDto)).rejects.toThrow(BadRequestException);
    // });
  });

  describe('login', () => {
    const params: LoginUserRequestDto = new LoginUserRequestDto('test@example.com', 'correctPassword');

    it('should validate user credentials and return accessToken', async () => {
      jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(
        wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(
          new UserWithFavoritesDatabaseResponseDto(mockUserWithBooks)
        )
      );
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessToken);
      jest.spyOn(userService, 'setLastLoggedInNow').mockResolvedValue(undefined);

      const result = await authService.login(params);

      expect(userService.getUserByEmailIncludeFavoriteBooks).toHaveBeenCalledWith({ email: params.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(params.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id });
      expect(userService.setLastLoggedInNow).toHaveBeenCalledWith({ id: mockUser.id });
      expect(result).toEqual(
        wrapResponseSuccess<LoginUserDatabaseResponseDto>(
          new LoginUserDatabaseResponseDto(mockUserWithBooks, mockAccessToken),
          loginSuccessMessage
        )
      );
    });

    // it('should throw UnauthorizedException if credentials are invalid', async () => {
    //   jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(
    //     wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(
    //       new UserWithFavoritesDatabaseResponseDto(mockUserWithBooks)
    //     )
    //   );
    //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    //   await expect(authService.login(params)).rejects.toThrow(ApiError);
    // });
  });

  describe('logout', () => {
    it('should complete without error', async () => {
      await expect(authService.logout()).resolves.not.toThrow();
    });
  });
});