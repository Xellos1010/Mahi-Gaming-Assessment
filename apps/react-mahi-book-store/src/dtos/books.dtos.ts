import { Book } from "@prisma/client";
import { BooksListResponseDto } from "@prismaDist/dtos/lib/book.dto";

export interface ReactBooksListResponseDto extends BooksListResponseDto {
    books: Book[];
}