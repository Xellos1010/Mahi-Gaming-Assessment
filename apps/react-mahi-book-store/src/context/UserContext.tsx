// apps/react-mahi-book-store/src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Book } from "@prisma/client";

import { useToast } from "./ToastContext";
import { addFavoriteBook, fetchUserFavorites, removeFavoriteBook } from "../api/user-controller";
import { SingleBookResponseDto } from "@prismaDist/dtos";

// Define the shape of dependencies
interface UserContextDependencies {
  getCurrentUserId: () => number | null;
  onUnauthorized?: () => void;
}

// Context value interface
interface UserContextValue {
  favoriteBooks: Book[];
  addToFavorites: (bookId: number) => Promise<void>;
  removeFromFavorites: (bookId: number) => Promise<void>;
  clearFavorites: () => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Provider component with dependency injection
interface UserProviderProps {
  children: React.ReactNode;
  dependencies: UserContextDependencies;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  dependencies: {
    getCurrentUserId,
    onUnauthorized
  }
}) => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const { addToast } = useToast();

  // Fetch favorites (you can keep this if you want to load them on provider mount)
  useEffect(() => {
    const loadFavorites = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        try {
          const { user } = await fetchUserFavorites(userId);
          setFavoriteBooks(user.favoriteBooks);
        } catch (error) {
          addToast("Failed to fetch favorite books", "error");
          console.error(error);
        }
      }
    };
    loadFavorites();
  }, [getCurrentUserId]);

  const getCurrentUserFavoriteBooks = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      return null; // Handle as necessary if user is not logged in
    }
    try {
      const { user } = await fetchUserFavorites(userId);
      return user.favoriteBooks;
    } catch (error) {
      addToast("Failed to fetch favorite books", "error");
      console.error(error);
      return null;
    }
  };

  const addToFavorites = async (bookId: number) => {
    const userId = getCurrentUserId();

    if (!userId) {
      // Call optional onUnauthorized callback
      onUnauthorized?.();
      addToast("User must be logged in to add favorites", "error");
      return;
    }
    try {
      const updatedFavorites: SingleBookResponseDto = await addFavoriteBook(userId, bookId);
      
      if (updatedFavorites && updatedFavorites.book) {
        // Check if the book is already in the favorites array
        const bookExists = favoriteBooks.some(book => book.id === updatedFavorites.book.id);
        if (!bookExists) {
          // Add the new book to the favorites array
          setFavoriteBooks([...favoriteBooks, updatedFavorites.book]);
        } else {
          addToast("Book is already in favorites", "info");
        }
      }
      else {
        throw new Error("Unable to add book to favorite");
      }
    } catch (error) {
      addToast("Failed to add book to favorites", "error");
      console.error(error);
    }
  };

  const removeFromFavorites = async (bookId: number) => {
    const userId = getCurrentUserId();
  
    if (!userId) {
      // Handle unauthorized user
      onUnauthorized?.();
      addToast("Must be logged in to remove favorites", "error");
      return;
    }
  
    try {
      const updatedFavorites = await removeFavoriteBook(userId, bookId);
      if (updatedFavorites && updatedFavorites.book) {
        // Update the `favoriteBooks` state by filtering out the removed book
        setFavoriteBooks((prevFavorites) => prevFavorites.filter((book) => book.id !== bookId));
      } else {
        throw new Error("Unable to remove book from favorites");
      }
    } catch (error) {
      addToast("Failed to remove book from favorites", "error");
      console.error(error);
    }
  };

  const clearFavorites = async () => {
    const userId = getCurrentUserId();

    if (!userId) {
      // Call optional onUnauthorized callback
      onUnauthorized?.();

      addToast("Must be logged in to clear favorites", "error");
      return;
    }

    // TODO: Implement backend clearFavorites function
    setFavoriteBooks([]);
  };

  return (
    <UserContext.Provider
      value={{
        favoriteBooks,
        addToFavorites,
        removeFromFavorites,
        clearFavorites
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};