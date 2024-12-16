import { Book } from "@prisma/client";
import { handleError } from "./handleError";
import { BookService } from "../api/services/book-service";
import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { SingleBookResponseDto } from "@prismaDist/dtos/lib/book.dto";

const bookService = new BookService();

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await bookService.fetchAll();
        return response.data?.books || [];
    } catch (error) {
        throw handleError(error); // Handle errors
    }
};

// export const fetchBookById = async (bookId: number): Promise<Book> => {
//     try {
//         const response = await bookService.fetchById(bookId);
//         if(response.data != null)
//             return response.data.book;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const addBook = async (bookData: Partial<Book>): Promise<Book> => {
//     try {
//         const response = await bookService.create();
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const updateBook = async (bookId: number, bookData: Partial<Book>): Promise<Book> => {
//     try {
//         const response = await axios.patch<Book>(`${API_BASE_URL}/${bookId}`, bookData);
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const removeBookById = async (bookId: number): Promise<void> => {
//     try {
//         await axios.delete(`${API_BASE_URL}/${bookId}`);
//     } catch (error) {
//         throw handleError(error);
//     }
// };

export const addFavoriteBook = async (userId: number, bookId: number): Promise<ApiResponseDto<SingleBookResponseDto>> => {
    try {
        // Log the parameters
        console.log(`Adding favorite book: userId = ${userId}, bookId = ${bookId}`);
        const response = await bookService.addToFavorites(userId, bookId);
        return response;
    } catch (error) {
        throw handleError(error);
    }
};

export const removeFavoriteBook = async (userId: number, bookId: number): Promise<ApiResponseDto<SingleBookResponseDto>> => {
    try {
        const response = await bookService.removeFromFavorites(userId, bookId);
        return response;
    } catch (error) {
        throw handleError(error);
    }
};