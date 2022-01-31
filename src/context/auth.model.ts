import { ReactNode } from "react";

export interface User {
  username: string;
  email: string;
}

export interface AuthUser {
  email: string;
  password: string;
}

export interface AuthContextData {
    user?: User;
    signIn: () => void;
    signOut: () => void;
    isAuthenticated: boolean;
}

export enum AuthMethod {
  AZURE = 'AZURE',
  INTERN = 'INTERN'
}

export interface AuthProviderProps {
  authUser?: AuthUser;
  children: ReactNode;
}