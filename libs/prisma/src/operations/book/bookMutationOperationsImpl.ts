import { prisma } from "../../client";
import { IBookMutationOperations } from "../../interfaces/book/book.mutation.operations.interface";
import {
  BaseCreateBookDto,
  BaseBookIdDto,
  BaseUserFavoriteBookRequestDto,
  SingleBookResponseDto,
  SingleBookResponseWithNullDto
} from "../../dtos/lib/book.dto";
import { HandleDatabaseError } from "../../decorators/handle-database-error.decorator";
import { convertDateTimeToDatabaseFormat } from "../../utilities/datetime.util";
import { PrismaDatabaseUpdateBookParams } from "../../types";

export class PrismaBookMutationOperationsImpl implements IBookMutationOperations {
  @HandleDatabaseError('Add Book')
  async addBook(params: BaseCreateBookDto): Promise<SingleBookResponseDto> {
    const book = await prisma.book.create({
      data: {
        ...params,
        createdAt: convertDateTimeToDatabaseFormat(new Date())
      }
    });
    return { book };
  }

  @HandleDatabaseError('Remove Book')
  async removeBookById(params: BaseBookIdDto): Promise<SingleBookResponseDto> {
    const book = await prisma.book.delete({
      where: { id: params.id }
    });
    return { book };
  }

  @HandleDatabaseError('Update Book')
  async updateBook(params: PrismaDatabaseUpdateBookParams): Promise<SingleBookResponseDto> {
    const book = await prisma.book.update({
      where: params.where,
      data: {
        ...params.data,
        updatedAt: convertDateTimeToDatabaseFormat(new Date())
      }
    });
    return { book };
  }

  @HandleDatabaseError('Add Book to Favorites')
  async addUserToFavoriteBook(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseWithNullDto> {
    // Validate book and user existence
    await this.validateBookAndUserExistence(params.userId, params.bookId);
    await prisma.user.update({
      where: { id: params.userId, },
      data: {
        favoriteBooks: {
          connect: { id: params.bookId }, // Connect the existing book to the user
        },
      },
    });

    console.log(`Book ${params.bookId} has been added to User ${params.userId}'s favorites.`);
    // Return the book details
    const book = await prisma.book.findUnique({
      where: { id: params.bookId }
    });
    console.log("Book added to favorites:", book);

    return { book };
  }

  @HandleDatabaseError('Remove Book from Favorites')
  async removeBookFromFavorites(params: BaseUserFavoriteBookRequestDto): Promise<SingleBookResponseWithNullDto> {
    // Validate book and user existence
    await this.validateBookAndUserExistence(params.userId, params.bookId);

    await prisma.user.update({
      where: { id: params.userId, },
      data: {
        favoriteBooks: {
          disconnect: { id: params.bookId }, // Disconnect the existing book to the user
        },
      },
    });

    // Return the book details
    const book = await prisma.book.findUnique({
      where: { id: params.bookId }
    });

    console.log("Book removed from favorites:", book);
    return { book };
  }

  // Shared validation method to reduce duplication
  private async validateBookAndUserExistence(userId: number, bookId: number): Promise<void> {
    // Validate book existence
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      throw new Error(`Book not found with ID: ${bookId}`);
    }

    // Validate user existence
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }
  }
}

export const prismaBookMutationOperations = new PrismaBookMutationOperationsImpl();