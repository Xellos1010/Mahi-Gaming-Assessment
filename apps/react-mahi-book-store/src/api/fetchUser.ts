// apps/react-mahi-book-store/src/api/fetchBooks.ts
import axios from "axios";
import { User } from "@prisma/client";

const API_BASE_URL = "http://localhost:3000"; // Specify the full backend URL

export const fetchUserByEmail = async (email: string): Promise<User> => {
    const response = await axios.get<User>(`${API_BASE_URL}/api/user`); //TODO: Integrate email body
    return response.data;
};