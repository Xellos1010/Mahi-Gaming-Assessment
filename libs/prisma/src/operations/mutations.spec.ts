import {
    addBook,
    removeBookById,
    updateBook,
    addUser,
    removeUserById,
    setUserPassword,
    setLastLoggedIn,
    addUserToFavoriteBook,
    removeBookFromFavorites,
  } from './mutations';
  import { prisma } from '../client';
  import { vi, Mock } from 'vitest';
  
  // Mocking Prisma client
  vi.mock('../client', () => ({
    prisma: {
      book: {
        create: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
      },
      user: {
        create: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
      },
      userFavorites: {
        create: vi.fn(),
        delete: vi.fn(),
      },
    },
  }));
  
  describe('Prisma Mutations', () => {
    it('should add a new book', async () => {
      const bookData = { name: 'New Book', description: 'A new book' };
      const mockBook = { id: 1, ...bookData };
      
      // Mocking the implementation for the create method
      (prisma.book.create as Mock).mockResolvedValue(mockBook);
  
      const result = await addBook(bookData);
      expect(result).toEqual(mockBook);
      expect(prisma.book.create).toHaveBeenCalledWith({ data: bookData });
    });
  
    it('should remove a book by ID', async () => {
      const mockResponse = { id: 1, name: 'Test Book' };
      
      // Mocking the implementation for the delete method
      (prisma.book.delete as Mock).mockResolvedValue(mockResponse);
  
      const result = await removeBookById(1);
      expect(result).toEqual(mockResponse);
      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should update a book', async () => {
      const bookId = 1;
      const updateData = { name: 'Updated Book' };
      const mockResponse = { id: bookId, ...updateData };
      
      // Mocking the implementation for the update method
      (prisma.book.update as Mock).mockResolvedValue(mockResponse);
  
      const result = await updateBook(bookId, updateData);
      expect(result).toEqual(mockResponse);
      expect(prisma.book.update).toHaveBeenCalledWith({ where: { id: bookId }, data: updateData });
    });
  
    it('should add a new user', async () => {
      const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
      const mockUser = { id: 1, ...userData };
      
      // Mocking the implementation for the create method
      (prisma.user.create as Mock).mockResolvedValue(mockUser);
  
      const result = await addUser(userData);
      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
    });
  
    it('should remove a user by ID', async () => {
      const mockResponse = { id: 1, name: 'John Doe' };
      
      // Mocking the implementation for the delete method
      (prisma.user.delete as Mock).mockResolvedValue(mockResponse);
  
      const result = await removeUserById(1);
      expect(result).toEqual(mockResponse);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  
    it('should update a user password', async () => {
      const userId = 1;
      const newPassword = 'newPassword123';
      const mockResponse = { id: userId, password: newPassword };
      
      // Mocking the implementation for the update method
      (prisma.user.update as Mock).mockResolvedValue(mockResponse);
  
      const result = await setUserPassword(userId, newPassword);
      expect(result).toEqual(mockResponse);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: userId }, data: { password: newPassword } });
    });
  
    it('should set the last logged-in date for a user', async () => {
      const userId = 1;
      const lastLoggedIn = new Date('2024-12-07T12:00:00Z');
      const mockResponse = { id: userId, lastLoggedIn };
      
      // Mocking the implementation for the update method
      (prisma.user.update as Mock).mockResolvedValue(mockResponse);
  
      const result = await setLastLoggedIn(userId, lastLoggedIn);
      expect(result).toEqual(mockResponse);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: userId }, data: { lastLoggedIn } });
    });
  
    it('should add a user to their favorite book', async () => {
      const userId = 1;
      const bookId = 1;
      const mockResponse = { userId, bookId };
      
      // Mocking the implementation for the create method
      (prisma.userFavorites.create as Mock).mockResolvedValue(mockResponse);
  
      const result = await addUserToFavoriteBook(userId, bookId);
      expect(result).toEqual(mockResponse);
      expect(prisma.userFavorites.create).toHaveBeenCalledWith({ data: { userId, bookId } });
    });
  
    it('should remove a book from a user\'s favorites', async () => {
      const userId = 1;
      const bookId = 1;
      const mockResponse = { userId, bookId };
      
      // Mocking the implementation for the delete method
      (prisma.userFavorites.delete as Mock).mockResolvedValue(mockResponse);
  
      const result = await removeBookFromFavorites(userId, bookId);
      expect(result).toEqual(mockResponse);
      expect(prisma.userFavorites.delete).toHaveBeenCalledWith({ where: { userId_bookId: { userId, bookId } } });
    });
  });
  