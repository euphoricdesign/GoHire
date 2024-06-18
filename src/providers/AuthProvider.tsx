'use client'
import React, { createContext, useContext, ReactNode } from 'react';
import useAuthSync from '../hooks/useAuthSync';

// Definir el tipo para el contexto (si estás usando TypeScript)
type AuthContextType = {
  user: any; // Reemplaza 'any' con el tipo correcto de tu usuario si lo tienes definido
  isLoading: boolean;
  userDetail: any; // Reemplaza 'any' con el tipo correcto de los detalles del usuario
};

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
  };
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { user, isLoading, userDetail } = useAuthSync();
  
    return (
      <AuthContext.Provider value={{ user, isLoading, userDetail }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;