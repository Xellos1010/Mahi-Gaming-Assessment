import axios from 'axios';
import { CreateUserDto, LoginUserDto } from '@nestDtos/auth.dto';

const BASE_URL = 'http://localhost:3000/api/auth';

describe('AuthController E2E Tests', () => {
  let accessToken: string; // Store the access token after successful login
  let userId: number; // To keep track of the registered user

  // Register a user before running the tests
  beforeAll(async () => {
    const newUser: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const registerResponse = await axios.post(`${BASE_URL}/register`, newUser);
    userId = registerResponse.data.user.id; // Save the user ID

    // Login to get the access token
    const loginDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const loginResponse = await axios.post(`${BASE_URL}/login`, loginDto);
    accessToken = loginResponse.data.accessToken; // Save the access token for further tests
  });

  afterAll(async () => {
    // Cleanup: Logout and delete the created user after tests
    if (accessToken) {
      await axios.post(`${BASE_URL}/logout`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
    }
  });

  it('should register a new user', async () => {
    const newUser: CreateUserDto = {
      name: 'New Test User',
      email: 'newtest@example.com',
      password: 'newpassword123',
    };

    const res = await axios.post(`${BASE_URL}/register`, newUser);
    expect(res.status).toBe(201);
    expect(res.data.message).toBe('User registered successfully');
    expect(res.data.user).toHaveProperty('user');
    expect(res.data.user).toHaveProperty('accessToken');
  });

  it('should login with valid credentials', async () => {
    const loginDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const res = await axios.post(`${BASE_URL}/login`, loginDto);
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('Login successful');
    expect(res.data).toHaveProperty('user');
    expect(res.data).toHaveProperty('accessToken');
  });

  it('should return 401 for invalid login credentials', async () => {
    const loginDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const res = await axios.post(`${BASE_URL}/login`, loginDto).catch(err => err.response);
    expect(res.status).toBe(401);
    expect(res.data.message).toBe('Invalid email or password');
  });

  it('should logout successfully', async () => {
    const res = await axios.post(`${BASE_URL}/logout`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('Logout successful');
  });
});
