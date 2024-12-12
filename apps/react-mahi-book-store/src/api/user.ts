// src/api/user.ts 
import axios from "axios";
import { Book } from "@prisma/client";

const API_BASE_URL = "http://localhost:3000/users";  // Base URL for user endpoints 

// Fetch user favorites by user ID 
export const fetchUserFavorites = async (userId: number): Promise<Book[]> => {
    const response = await axios.get<Book[]>(` ${API_BASE_URL} / ${userId} /favorites`);
    return response.data;
};

// Add a book to user favorites 
export const addFavoriteBook = async (userId: number, bookId: number): Promise<Book[]> => {
    const response = await axios.post<Book[]>(` ${API_BASE_URL} / ${bookId} /favorites`, { userId });
    return response.data;
};

// Remove a book from user favorites 
export const removeFavoriteBook = async (userId: number, bookId: number): Promise<Book[]> => {
    const response = await axios.delete<Book[]>(` ${API_BASE_URL} / ${bookId} /favorites`, { data: { userId } });
    return response.data;
};

// Fetch all users 
export const fetchAllUsers = async (): Promise<any[]> => {
    const response = await axios.get<any[]>(API_BASE_URL);
    return response.data;
};

// Fetch user by ID 
export const fetchUserById = async (userId: number): Promise<any> => {
    const response = await axios.get<any>(` ${API_BASE_URL} / ${userId} `);
    return response.data;
};

// Add a new user 
export const addUser = async (userData: any): Promise<any> => {
    const response = await axios.post<any>(API_BASE_URL, userData);
    return response.data;
};

// Update user information 
export const updateUser = async (userId: number, userData: any): Promise<any> => {
    const response = await axios.patch<any>(` ${API_BASE_URL} / ${userId} `, userData);
    return response.data;
};

// Remove user by ID 
export const removeUserById = async (userId: number): Promise<void> => {
    await axios.delete(` ${API_BASE_URL} / ${userId} `);
};
