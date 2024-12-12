import axios from "axios";
import { Book } from "@prisma/client";
import { handleError } from "./handleError";

const API_BASE_URL = "http://localhost:3000/books";

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw handleError(error); // Handle errors
    }
};

export const fetchBookById = async (bookId: number): Promise<Book> => {
    try {
        const response = await axios.get<Book>(`${API_BASE_URL}/${bookId}`);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const addBook = async (bookData: Partial<Book>): Promise<Book> => {
    try {
        const response = await axios.post<Book>(API_BASE_URL, bookData);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const updateBook = async (bookId: number, bookData: Partial<Book>): Promise<Book> => {
    try {
        const response = await axios.patch<Book>(`${API_BASE_URL}/${bookId}`, bookData);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const removeBookById = async (bookId: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/${bookId}`);
    } catch (error) {
        throw handleError(error);
    }
};