// apps/react-mahi-book-store/src/api/fetchBooks.ts
import axios from "axios";
import { Book } from "@prisma/client";

const API_BASE_URL = "http://localhost:3000"; // Specify the full backend URL

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(`${API_BASE_URL}/api/books`);
    return response.data;
};