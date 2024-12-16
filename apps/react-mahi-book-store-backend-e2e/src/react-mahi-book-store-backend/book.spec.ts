import axios from 'axios';
import { CreateBookDto } from '@nestDtos/book.dto';
const BASE_URL = 'http://localhost:3000/api/books';

describe('BookController E2E Tests', () => {
    let bookId: number; // To keep track of the created book for later tests
    let bookId2: number;
    let userId: number = 1; // Assuming user with ID 1 exists, you can mock this if needed

    // Create a book before running the tests
    beforeAll(async () => {
        const newBook: CreateBookDto = {
            title: 'Test Book',
            author: 'Author Name',
            description: 'Test Description',
        };

        const response = await axios.post(BASE_URL, newBook);
        bookId = response.data.id; // Save the id of the created book for later tests
    });

    afterAll(async () => {
        // Cleanup: Remove the created book after the tests
        if (bookId) {
            await axios.delete(`${BASE_URL}/${bookId}`);
        }
    });

    it('should retrieve all books', async () => {
        const res = await axios.get(BASE_URL);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    it('should retrieve a book by id', async () => {
        const res = await axios.get(`${BASE_URL}/${bookId}`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id', bookId);
        expect(res.data).toHaveProperty('title', 'Test Book');
    });

    it('should return 404 for a non-existent book', async () => {
        const res = await axios.get(`${BASE_URL}/99999`).catch(err => err.response);
        expect(res.status).toBe(404);
    });

    it('should create a new book', async () => {
        const newBook: CreateBookDto = {
            title: 'New Test Book',
            author: 'New Author',
            description: 'New Description',
        };

        const res = await axios.post(BASE_URL, newBook);
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('title', newBook.title);

        // Cleanup: Remove the created book
        bookId2 = res.data.id; // Save the id for deletion later
    });

    it('should update an existing book', async () => {
        const updatedBook = {
            title: 'Updated Test Book',
            author: 'Updated Author',
            description: 'Updated Description',
        };

        const res = await axios.patch(`${BASE_URL}/${bookId}`, updatedBook);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('title', updatedBook.title);
    });

    it('should delete a book by id', async () => {
        const res = await axios.delete(`${BASE_URL}/${bookId2}`);
        expect(res.status).toBe(200); // No content

        // Verify deletion
        const getResponse = await axios.get(`${BASE_URL}/${bookId2}`).catch(err => err.response);
        expect(getResponse.status).toBe(404);
    });

    // Add user to favorite book
    it('should add a user to favorite books', async () => {
        const res = await axios.post(`${BASE_URL}/${bookId}/favorites`, { userId });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id', bookId);
    });

    // Remove user from favorite book
    it('should remove a user from favorite books', async () => {
        const res = await axios.delete(`${BASE_URL}/${bookId}/favorites`, { data: { userId } });
        expect(res.status).toBe(200); // No content
    });

    // Error handling tests

    it('should return 500 when trying to add a user to non-existent book favorites', async () => {
        const res = await axios.post(`${BASE_URL}/99999/favorites`, { userId }).catch(err => err.response);
        expect(res.status).toBe(500);
    });

    it('should return 500 when missing userId in request to add to favorites', async () => {
        const res = await axios.post(`${BASE_URL}/${bookId}/favorites`, {}).catch(err => err.response);
        expect(res.status).toBe(500);
    });

    it('should return 500 when trying to remove a user from non-existent book favorites', async () => {
        const res = await axios.delete(`${BASE_URL}/99999/favorites`, { data: { userId } }).catch(err => err.response);
        expect(res.status).toBe(500);
    });
});
