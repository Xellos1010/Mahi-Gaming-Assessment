import { BookInterface } from "../book/book.interface";

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    lastLoggedIn: Date | null;
    favoriteBooks?: BookInterface[];
}