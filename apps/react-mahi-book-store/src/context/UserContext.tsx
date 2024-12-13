// apps/react-mahi-book-store/src/context/UserContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Book } from "@prisma/client";
import { addFavoriteBook, removeFavoriteBook } from "@frontend/api/user";
import { useToast } from "./ToastContext";

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

  const addToFavorites = async (bookId: number) => {
    const userId = getCurrentUserId();
    
    if (!userId) {
      // Call optional onUnauthorized callback
      onUnauthorized?.();
      
      addToast("Must be logged in to add favorites", "error");
      return;
    }

    try {
      const updatedFavorites = await addFavoriteBook(userId, bookId);
      setFavoriteBooks(updatedFavorites);
    } catch (error) {
      addToast("Failed to add book to favorites", "error");
      console.error(error);
    }
  };

  const removeFromFavorites = async (bookId: number) => {
    const userId = getCurrentUserId();
    
    if (!userId) {
      // Call optional onUnauthorized callback
      onUnauthorized?.();
      
      addToast("Must be logged in to remove favorites", "error");
      return;
    }

    try {
      const updatedFavorites = await removeFavoriteBook(userId, bookId);
      setFavoriteBooks(updatedFavorites);
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