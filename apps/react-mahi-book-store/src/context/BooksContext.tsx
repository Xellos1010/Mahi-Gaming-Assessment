import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../api/fetchBooks";
import { Book } from "@prisma/client";

interface BooksContextValue {
    books: Book[];
    isLoading: boolean;
}

const BooksContext = createContext<BooksContextValue | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data = [], isLoading } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });
    return (
        <BooksContext.Provider value={{ books: data, isLoading }}>
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
