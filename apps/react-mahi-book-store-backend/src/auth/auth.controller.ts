import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return { message: 'User registered successfully', user };
    } catch (error) {
      throw error; // NestJS will handle the exception and return a proper HTTP response
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const { user, accessToken } = await this.authService.login(loginUserDto);
      return { message: 'Login successful', user, accessToken };
    } catch (error) {
      throw error; // Proper HTTP error response will be sent
    }
  }

  @Post('logout')
  @HttpCode(200)
  async logout() {
    try {
      await this.authService.logout();
      return { message: 'Logout successful' };
    } catch (error) {
      throw error; // Proper error handling
    }
  }
}
