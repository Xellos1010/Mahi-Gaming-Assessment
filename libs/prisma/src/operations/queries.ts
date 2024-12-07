import { prisma } from "../client";

// Get all books
export async function getAllBooks() {
  return await prisma.book.findMany();
}

// Get a specific book by ID
export async function getBook(id: number) {
  return await prisma.book.findUnique({
    where: { id },
  });
}

// Get all users
export async function getAllUsers() {
  return await prisma.user.findMany();
}

// Get a user by ID
export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

// Get a user by email
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

// Get a user's favorite books
export async function getUserFavoriteBooks(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      favoriteBooks: true,
    },
  });
}
