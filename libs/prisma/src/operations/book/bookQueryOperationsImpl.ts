import { prisma } from "../../client";
import { IBookQueryOperations } from "../../interfaces/book/book.query.operations.interface";
import { 
  BooksListResponseDto, 
  SingleBookResponseDto, 
  BaseBookIdDto 
} from "../../dtos/lib/book.dto";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";

export class PrismaBookQueryOperationsImpl implements IBookQueryOperations {
  @HandleDatabaseError('Get All Books')
  async getAllBooks(): Promise<BooksListResponseDto> {
    const books = await prisma.book.findMany();
    return { books };
  }

  @HandleDatabaseError('Get Book')
  async getBook(params: BaseBookIdDto): Promise<SingleBookResponseDto> {
    const book = await prisma.book.findUnique({ 
      where: { id: params.id } 
    });

    if (!book) {
      throw new Error(`Book not found with ID: ${params.id}`);
    }

    return { book };
  }
}

export const prismaBookQueryOperations = new PrismaBookQueryOperationsImpl();