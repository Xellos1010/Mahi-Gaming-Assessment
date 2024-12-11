import { Book } from "@prisma/client";

export interface BookInfoProps {
    book: Book; // Define the props interface with a Book type
}

export interface BooksInfoProps {
    books: Book[]; // Define the props interface with a Book type
}