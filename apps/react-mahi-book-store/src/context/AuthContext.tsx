import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

import { AuthService } from "../api/services/authentication-service";
import { BaseLoginUserRequestDto } from "@prismaDist/dtos/lib/auth.dto";
import { LoginResponse, RegisterResponse } from "../api/services/types/auth";
import { BaseCreateUserRequestDto } from "@prismaDist/dtos";
import { PrismaUserWithFavoriteBooks } from "@prismaDist/dtos/lib/types/user.types";

// Secure token storage and management
const TOKEN_KEY = 'book_store_access_token';
const USER_KEY = 'book_store_user';

interface AuthContextValue {
  user: PrismaUserWithFavoriteBooks | null;
  isAuthenticated: boolean;
  login: (credentials: BaseLoginUserRequestDto) => Promise<LoginResponse>;
  register: (userData: BaseCreateUserRequestDto) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const authService = new AuthService();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PrismaUserWithFavoriteBooks | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user and token from local storage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Clear invalid storage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const login = useCallback(async (credentials: BaseLoginUserRequestDto): Promise<LoginResponse> => {
    try {
      const loginResponse: LoginResponse = await authService.login(credentials);
      const { user, accessToken } = loginResponse;
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        //TODO: Setup Local Storage for session persistance
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      else{
        console.log("user from login response was not able to be parsed", user);
      }
      return loginResponse;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: BaseCreateUserRequestDto): Promise<RegisterResponse> => {
    try {
      const registerResponse = await authService.register(userData);

      const { user, accessToken } = registerResponse;
      if (user) {
        setUser(user as PrismaUserWithFavoriteBooks);
        setIsAuthenticated(true);
        //TODO: Setup Local Storage for session persistance
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      else{
        console.log("user from register response was not able to be parsed", user);
      }
      return registerResponse;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user data and tokens
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};