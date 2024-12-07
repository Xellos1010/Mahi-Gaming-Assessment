export interface IPrismaBookMutationOperations {
    addBook(data: { name: string; description?: string; imageId?: string }): Promise<any>;
    removeBookById(bookId: number): Promise<any>;
    updateBook(bookId: number, data: { name?: string; description?: string; imageId?: string }): Promise<any>;
    addUserToFavoriteBook(userId: number, bookId: number): Promise<any>;
    removeBookFromFavorites(userId: number, bookId: number): Promise<any>;
  }  