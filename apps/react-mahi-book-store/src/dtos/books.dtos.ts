import { Book } from "@prisma/client";
import { BooksListResponseDto } from "@prismaDist/dtos";

export interface ReactBooksListResponseDto extends BooksListResponseDto {
    books: Book[];
}