// src/api/auth.ts 
import axios from "axios";
import { User } from "@prisma/client";

const API_BASE_URL = "http://localhost:3000/api/auth";  // Base URL for authentication endpoints 

// User login function 
export const loginUser = async (email: string, password: string): Promise<User> => {
    const response = await axios.post<User>(`${API_BASE_URL}/login`, { email, password });
    return response.data;
};

// User registration function 
export const registerUser = async (email: string, password: string): Promise<User> => {
    const response = await axios.post<User>(`${API_BASE_URL}/register`, { email, password });
    return response.data;
};

// Optional: Function to logout the user (if you need it on the API side) 
export const logoutUser = async (): Promise<void> => {
    // If you handle session/cookie-based authentication, you can implement backend logic for logout 
    // Currently, trivially returning a resolved promise, or you may implement an API call if needed 
    return Promise.resolve();
};

