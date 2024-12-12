import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "@frontend/api/auth"; // Implement these API calls
import { User } from "@prisma/client";

interface AuthContextValue {
  user: User | null; // User type from Prisma
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const registeredUser = await registerUser(name, email, password);
    setUser(registeredUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
