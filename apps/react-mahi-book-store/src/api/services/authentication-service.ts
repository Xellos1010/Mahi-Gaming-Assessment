import { BaseApiService } from './base-api-service';
import { LoginResponse, RegisterResponse } from './types/auth';
import { LogAll } from '../decorators/log-decorators';
import { BaseCreateUserRequestDto } from '@prismaDist/dtos/lib/user.dto';
import { BaseLoginUserRequestDto } from '@prismaDist/dtos/lib/auth.dto';

export class AuthService extends BaseApiService {
  constructor() {
    super('http://localhost:3000/api/auth');
  }

  @LogAll()
  async login(credentials: BaseLoginUserRequestDto): Promise<LoginResponse> {
    console.log(`Logging in with" `, credentials);
    return this.handleRequest<LoginResponse>('post', 'login', credentials);
  }

  @LogAll()
  async register(userData: BaseCreateUserRequestDto): Promise<RegisterResponse> {
    return this.handleRequest<RegisterResponse>('post', 'register', userData);
  }

  async logout(): Promise<void> {
    return this.handleRequest<void>('post', 'logout');
  }
}