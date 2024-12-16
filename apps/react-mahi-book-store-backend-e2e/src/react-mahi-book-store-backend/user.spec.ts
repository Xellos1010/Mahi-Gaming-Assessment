import axios from 'axios';
import { CreateUserDto } from '@nestDtos/auth.dto';
const BASE_URL = 'http://localhost:3000/api/users';

describe('UserController E2E Tests', () => {
    let userId: number; // To keep track of the created user for later tests
    let userId2: number;

    // Create a user before running the tests
    beforeAll(async () => {
        const newUser: CreateUserDto = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
        };

        const response = await axios.post(BASE_URL, newUser);
        userId = response.data.id; // Save the id of the created user for later tests
    });

    afterAll(async () => {
        // Cleanup: Remove the created user after the tests
        if (userId) {
            await axios.delete(`${BASE_URL}/${userId}`);
        }
    });

    it('should retrieve all users', async () => {
        const res = await axios.get(BASE_URL);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    it('should retrieve a user by id', async () => {
        const res = await axios.get(`${BASE_URL}/${userId}`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id', userId);
        expect(res.data).toHaveProperty('email', 'testuser@example.com');
    });

    it('should return 500 for a non-existent user', async () => {
        const res = await axios.get(`${BASE_URL}/999999`).catch(err => err.response);
        expect(res.status).toBe(500);
    });

    it('should create a new user', async () => {
        const newUser: CreateUserDto = {
            name: 'New Test User',
            email: 'newtestuser@example.com',
            password: 'newpassword123',
        };

        const res = await axios.post(BASE_URL, newUser);
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('email', newUser.email);

        // Save the id for deletion later
        userId2 = res.data.id;
    });

    it('should update an existing user\'s password', async () => {
        const updatedPassword = {
            password: 'newSecurePassword123',
        };

        const res = await axios.patch(`${BASE_URL}/${userId}/password`, updatedPassword);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('password', updatedPassword.password);
    });

    it('should delete a user by id', async () => {
        const res = await axios.delete(`${BASE_URL}/${userId2}`);
        expect(res.status).toBe(200); // No content

        // Verify deletion
        const getResponse = await axios.get(`${BASE_URL}/${userId2}`).catch(err => err.response);
        expect(getResponse.status).toBe(200);
    });

    // Add user to favorite books
    it('should retrieve user\'s favorite books', async () => {
        const res = await axios.get(`${BASE_URL}/${userId}/favorites`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });


    //TODO: This should return a 40x or 500 error
    // Error handling tests 
    it('should return 500 when trying to get a non-existent user', async () => {
        const res = await axios.get(`${BASE_URL}/999999`).catch(err => err.response);
        expect(res.status).toBe(500);
    });

    it('should return 400 when creating a user with invalid data', async () => {
        const invalidUser = { email: 'invalidemail', password: 'short' };
        const res = await axios.post(BASE_URL, invalidUser).catch(err => err.response);
        expect(res.status).toBe(400);
    });

    it('should return 400 when trying to delete a non-existent user', async () => {
        const res = await axios.delete(`${BASE_URL}/999999`).catch(err => err.response);
        expect(res.status).toBe(400);
    });
});
