import { handleError } from "./handleError";
import { BookService } from "../api/services/book-service";
import { ApiResponseDto } from "@nestDtos/base.api-response.dto";
import { ReactBooksListResponseDto } from "../dtos/books.dtos";
import { SingleBookResponseDto } from "@prismaDist/dtos";
// import { LogAll } from "@shared-decorators";

const bookService = new BookService();

export const fetchBooks = async (): Promise<ReactBooksListResponseDto> => {
    try {
        const response = await bookService.fetchAll();

        // Log the response data for debugging purposes
        console.log('Fetched books response:', response);
        
        return response;
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching books:', error);
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

export const addFavoriteBook = async (userId: number, bookId: number): Promise<SingleBookResponseDto> => {
    try {
        // Log the parameters
        console.log(`Adding favorite book: userId = ${userId}, bookId = ${bookId}`);
        const response = await bookService.addToFavorites(userId, bookId);
        return response;
    } catch (error) {
        throw handleError(error);
    }
};

export const removeFavoriteBook = async (userId: number, bookId: number): Promise<SingleBookResponseDto> => {
    try {
        const response = await bookService.removeFromFavorites(userId, bookId);
        return response;
    } catch (error) {
        throw handleError(error);
    }
};