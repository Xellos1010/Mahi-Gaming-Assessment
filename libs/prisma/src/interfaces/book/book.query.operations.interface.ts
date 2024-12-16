import { BaseBookIdDto, BooksListResponseDto, SingleBookResponseDto } from "../../dtos/lib/book.dto";

export interface IBookQueryOperations {
  getAllBooks(): Promise<BooksListResponseDto>;
  getBook(params: BaseBookIdDto): Promise<SingleBookResponseDto>;
}
