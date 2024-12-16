import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { Book } from "@prisma/client";
import { fetchBooks } from "../api/book-controller";
import { ReactBooksListResponseDto } from "../dtos/books.dtos";
interface BooksContextValue {
    books: Book[];
    isLoading: boolean;
}

const BooksContext = createContext<BooksContextValue | undefined>(undefined);


export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, isLoading } = useQuery<ReactBooksListResponseDto>({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    // Verbose logging
    console.log("BooksProvider Rendered");
    console.log("Current Loading State:", isLoading);

    if (isLoading) {
        console.log("Data is currently being fetched...");
    } else if (data) {
        console.log("Data fetched successfully:", data);
        console.log("Number of books fetched:", data.books.length);
    } else {
        console.warn("No data received or data is empty");
    }

    return (
        <BooksContext.Provider value={{ books: data?.books || [], isLoading }}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooks = () => {
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error("useBooks must be used within a BooksProvider");
    }
    return context;
};
