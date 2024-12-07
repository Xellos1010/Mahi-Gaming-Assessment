export interface IPrismaUserMutationOperations {
    addUser(data: { name: string; email: string; password: string }): Promise<any>;
    removeUserById(userId: number): Promise<any>;
    setUserPassword(userId: number, password: string): Promise<any>;
    setLastLoggedIn(userId: number, date: Date): Promise<any>;
  }  