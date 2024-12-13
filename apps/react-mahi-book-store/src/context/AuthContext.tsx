import React, { createContext, useCallback, useContext, useState } from "react";
import { loginUser, registerUser } from "@frontend/api/auth"; // Implement these API calls
import { User } from "@prisma/client";
import { LoginResponse, RegisterResponse } from "@frontend/api/types/auth";

interface AuthContextValue {
  user: User | null; // User type from Prisma
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (name: string, email: string, password: string) => Promise<RegisterResponse>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>(""); //This will need to be researched with time pending on how to store the jwt client side and validate it on subsequent app loads
  const login = useCallback(async (email: string, password: string): Promise<LoginResponse> => {
    try {
      //errors throw in loginUser
      const loggedInUser = await loginUser(email, password);
      console.log(loggedInUser.message);
      setUser(loggedInUser.user);
      setAccessToken(loggedInUser.accessToken);
      return loggedInUser;
    } catch (error) {
      // Optional: add error handling logic
      throw error;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
      const registeredUser = await registerUser(name, email, password);
      console.log(registeredUser.message);
      setUser(registeredUser.user);
      setAccessToken(registeredUser.accessToken);
      return registeredUser;
    } catch (error) {
      // Optional: add error handling logic
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

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
