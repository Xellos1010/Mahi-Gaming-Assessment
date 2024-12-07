import { prisma } from "../client";

// Add a new book
export async function addBook(data: { name: string; description?: string; imageId?: string }) {
  return await prisma.book.create({
    data: {
      name: data.name,
      description: data.description,
      imageId: data.imageId,
    },
  });
}

// Remove a book by ID
export async function removeBookById(bookId: number) {
  return await prisma.book.delete({
    where: {
      id: bookId,
    },
  });
}

// Update a book's details
export async function updateBook(bookId: number, data: { name?: string; description?: string; imageId?: string }) {
  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: data,
  });
}

// Add a user to the database
export async function addUser(data: { name: string; email: string; password: string }) {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}

// Remove a user by ID
export async function removeUserById(userId: number) {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

// Set a user's password
export async function setUserPassword(userId: number, password: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
}

// Set the last logged-in time for a user
export async function setLastLoggedIn(userId: number, date: Date) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastLoggedIn: date,
    },
  });
}

// Add a user to their favorite book
export async function addUserToFavoriteBook(userId: number, bookId: number) {
  return await prisma.userFavorites.create({
    data: {
      userId: userId,
      bookId: bookId,
    },
  });
}

// Remove a book from a user's favorites
export async function removeBookFromFavorites(userId: number, bookId: number) {
  return await prisma.userFavorites.delete({
    where: {
      userId_bookId: {
        userId: userId,
        bookId: bookId,
      },
    },
  });
}