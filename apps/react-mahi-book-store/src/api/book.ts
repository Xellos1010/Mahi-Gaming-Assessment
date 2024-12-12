// src/api/book.ts 
import axios from "axios";
import { Book } from "@prisma/client";

const API_BASE_URL = "http://localhost:3000/books";  // Base URL for book endpoints 

// Fetch all books 
export const fetchBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(API_BASE_URL);
    return response.data;
};

// Fetch a book by ID 
export const fetchBookById = async (bookId: number): Promise<Book> => {
    const response = await axios.get<Book>(` ${API_BASE_URL} / ${bookId} `);
    return response.data;
};

// Add a new book 
export const addBook = async (bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.post<Book>(API_BASE_URL, bookData);
    return response.data;
};

// Update a book 
export const updateBook = async (bookId: number, bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.patch<Book>(` ${API_BASE_URL} / ${bookId} `, bookData);
    return response.data;
};

// Remove a book by ID 
export const removeBookById = async (bookId: number): Promise<void> => {
    await axios.delete(` ${API_BASE_URL} / ${bookId} `);
};
