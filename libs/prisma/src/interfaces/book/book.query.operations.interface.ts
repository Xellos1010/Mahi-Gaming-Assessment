import { BaseBookIdDto } from "libs/dtos/src/lib/book.dto";
import { BooksListResponseDto, SingleBookResponseDto } from "../../dtos/lib/book.dto";

export interface IBookQueryOperations {
  getAllBooks(): Promise<BooksListResponseDto>;
  getBook(params: BaseBookIdDto): Promise<SingleBookResponseDto>;
}
