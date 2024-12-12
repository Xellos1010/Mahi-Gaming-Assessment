// src/api/auth.ts 
import axios from "axios";
import { User } from "@prisma/client";
import { handleError } from "./handleError";

const API_BASE_URL = "http://localhost:3000/api/auth";  // Base URL for authentication endpoints 

// User login function 
export const loginUser = async (email: string, password: string): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
    try {
        // Log the values and types of the parameters
        console.log('Parameters:', { 
            name: { value: name, type: typeof name }, 
            email: { value: email, type: typeof email }, 
            password: { value: password, type: typeof password } 
        });
        const response = await axios.post<User>(`${API_BASE_URL}/register`, {name, email, password });
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        return await axios.post(`${API_BASE_URL}/logout`);
    } catch (error) {
        throw handleError(error);
    }
};
