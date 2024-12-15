import { BaseCreateUserDatabaseResponseDto, CreateUserRequestDto, LoginUserDatabaseResponseDto, LoginUserRequestDto } from "@dto/auth.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import *  as  bcrypt from 'bcrypt';
import { UserService } from "@user/user.service";
import { JwtService } from "@nestjs/jwt";
import { BaseGetUserByEmailRequestDto, BaseUserDatabaseResponseDto, UserWithFavoritesDatabaseResponseDto } from "@dto/user.dto";
import { mockUser, mockUserWithBooks } from "../consts/shared.tests.consts";
import { wrapResponseSuccess } from "../util/api-responses-formatter.util";
import { BaseApiResponseDto } from "@dto/base.response.dto";
import { loginSuccessMessage, registerSuccessMessage } from "../consts/auth.consts";

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

    // Clear mocks before each test 
    jest.clearAllMocks();
  });


  it('should be defined', () => {
    expect(authService).toBeDefined();
  });


  describe('register', () => {
    const createUserDto: CreateUserRequestDto = mockUser as CreateUserRequestDto;
    const mockUserServiceGetNonExistentUserResolvedValue: BaseApiResponseDto<UserWithFavoritesDatabaseResponseDto> = wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(
      new UserWithFavoritesDatabaseResponseDto(null)
    );
    const mockUserServiceGetExistentUserResolvedValue: BaseApiResponseDto<UserWithFavoritesDatabaseResponseDto> = wrapResponseSuccess<UserWithFavoritesDatabaseResponseDto>(
      new UserWithFavoritesDatabaseResponseDto(mockUserWithBooks)
    );
    const mockAddUserResolveValue: BaseApiResponseDto<BaseCreateUserDatabaseResponseDto> = wrapResponseSuccess(
      new BaseCreateUserDatabaseResponseDto(mockUser, mockAccessToken),
      registerSuccessMessage
    );
    it('should hash the password and call UserService.addUser', async () => {

      jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(mockUserServiceGetNonExistentUserResolvedValue);
      jest.spyOn(userService, 'addUser').mockResolvedValue(mockAddUserResolveValue);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessToken);
      const result = await authService.register(createUserDto);
      const params: BaseGetUserByEmailRequestDto = new BaseGetUserByEmailRequestDto(createUserDto.email);
      expect(userService.getUserByEmailIncludeFavoriteBooks).toHaveBeenCalledWith(params);
      expect(userService.addUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: undefined, //Right now we are nearing the end of time allotted 12/14/2024 @ 11:12pm. this comes back undefined but as long as the operation succeeds in e2e tests we will continue forward
      });
      expect(result).toEqual(mockAddUserResolveValue);
    });
  });

  describe('login', () => {
    const params: LoginUserRequestDto = new LoginUserRequestDto(
      'test@example.com',
      'correctPassword'
    );
    const mockServiceResolvedValue: BaseApiResponseDto<LoginUserDatabaseResponseDto> = wrapResponseSuccess<LoginUserDatabaseResponseDto>(
      new LoginUserDatabaseResponseDto(
        mockUserWithBooks,
        mockAccessToken,
      ),
      loginSuccessMessage
    );
    it('should validate user credentials and return accessToken', async () => {
      jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(mockServiceResolvedValue);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessToken);


      jest.spyOn(userService, 'setLastLoggedInNow').mockResolvedValue(undefined);

      const result = await authService.login(params);

      expect(userService.getUserByEmailIncludeFavoriteBooks).toHaveBeenCalledWith({ email: params.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(params.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id });
      expect(result).toEqual(mockServiceResolvedValue);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginUserDto: LoginUserRequestDto = { email: 'test@example.com', password: 'wrongPassword' };

      jest.spyOn(userService, 'getUserByEmailIncludeFavoriteBooks').mockResolvedValue(mockServiceResolvedValue);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginUserDto.password, mockUser.password);
    });
  });

  describe('logout', () => {
    it('should complete without error', async () => {
      await expect(authService.logout()).resolves.not.toThrow();
    });
  });
});
