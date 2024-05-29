import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import {
  loginRequest,
  logout,
  saveAccessToken,
  getAccessToken,
  getAccessTokenPayload,
  isAuthenticated as checkIsAuthenticated,
  hasAnyRoles,
} from '../service/AuthService';

export interface AuthContextType {
  loginRequest: typeof loginRequest;
  logout: typeof logout;
  saveAccessToken: typeof saveAccessToken;
  getAccessToken: typeof getAccessToken;
  getAccessTokenPayload: typeof getAccessTokenPayload;
  isAuthenticated: boolean;
  hasAnyRoles: typeof hasAnyRoles;
  loading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = checkIsAuthenticated();
      setIsAuthenticated(authStatus);
      setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginRequest,
        logout,
        saveAccessToken,
        getAccessToken,
        getAccessTokenPayload,
        isAuthenticated,
        hasAnyRoles,
        loading,
        setIsAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
