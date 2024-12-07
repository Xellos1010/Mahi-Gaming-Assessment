export interface IPrismaUserQueryOperations {
    getAllUsers(): Promise<any[]>;
    getUserById(id: number): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    getUserFavoriteBooks(userId: number): Promise<any>;
  }  