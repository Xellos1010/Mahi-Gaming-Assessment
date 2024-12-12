import React, { createContext, useContext, useState } from "react";
import { Book } from "@prisma/client";
//TODO: implement clearFavorites on backend
// import { addFavoriteBook, removeFavoriteBook, clearFavorites } from "@frontend/api/user";
import { addFavoriteBook, removeFavoriteBook } from "@frontend/api/user";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

interface UserContextValue {
  favoriteBooks: Book[];
  addToFavorites: (bookId: number) => Promise<void>;
  removeFromFavorites: (bookId: number) => Promise<void>;
  clearFavorites: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const { addToast } = useToast();

  const addToFavorites = async (bookId: number) => {
    const { user } = useAuth();
    if (!user) {
      addToast("Must be logged in to add favorites", "error");
      return;
    }
    const updatedFavorites = await addFavoriteBook(user.id, bookId);
    setFavoriteBooks(updatedFavorites);
  };

  const clearFavorites = async () => {
    // TODO: Create backend function to clear all favorites
    setFavoriteBooks([]);
    return;
  };

  const removeFromFavorites = async (bookId: number) => {
    const { user } = useAuth();
    if (!user) {
      addToast("Must be logged in to remove favorites", "error");
      return;
    }
    const updatedFavorites = await removeFavoriteBook(user.id, bookId);
    setFavoriteBooks(updatedFavorites);
  };

  return (
    <UserContext.Provider value={{ favoriteBooks, addToFavorites, removeFromFavorites, clearFavorites }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
