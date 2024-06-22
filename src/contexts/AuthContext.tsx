import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import {
  loginRequest,
  logout,
  saveAccessToken,
  getAccessToken,
  getAccessTokenPayload as fetchAccessTokenPayload,
  isAuthenticated as checkIsAuthenticated,
  hasAnyRoles,
} from '../service/AuthService';

export interface AccessTokenPayloadDTO {
  exp: number;
  user_name: string;
  authorities: string[]; // Estrutura real das autoridades pode variar
}

export interface AuthContextType {
  loginRequest: typeof loginRequest;
  logout: typeof logout;
  saveAccessToken: typeof saveAccessToken;
  getAccessToken: typeof getAccessToken;
  getAccessTokenPayload: () => Promise<AccessTokenPayloadDTO | null | undefined>; // Permitindo null no retorno
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
      setIsAuthenticated(await authStatus);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const getAccessTokenPayload = async (): Promise<AccessTokenPayloadDTO | null | undefined> => {
    const token = await getAccessToken();
    if (token) {
      try {
        return await fetchAccessTokenPayload();
      } catch (error) {
        console.error('Error decoding token payload:', error);
        return null; // Retornar null em caso de erro de decodificação
      }
    }
    return undefined; // Retornar undefined se não houver token
  };

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
