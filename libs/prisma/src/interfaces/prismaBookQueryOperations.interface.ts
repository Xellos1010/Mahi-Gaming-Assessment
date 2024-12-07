export interface IPrismaBookQueryOperations {
    getAllBooks(): Promise<any[]>;
    getBook(id: number): Promise<any>;
  }
  