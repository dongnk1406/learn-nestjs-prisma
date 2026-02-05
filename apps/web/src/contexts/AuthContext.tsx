import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { userService } from '../services/userService';
import type { User, LoginDto } from '../types/user';
import { AuthContext, type AuthContextType } from './AuthContextType';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const userData = await userService.getMyProfile();
          setUser(userData.data);
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      setIsLoading(true); // Set loading during login process
      const response = await userService.login(credentials);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      const userData = await userService.getMyProfile();
      setUser(userData.data);
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
