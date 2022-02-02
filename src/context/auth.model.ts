import { AuthIntern } from './AuthIntern';
import { AuthAzure } from './AuthAzure';
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
    signIn: (method: AuthMethodKey, user?: AuthUser) => void;
    signOut: () => void;
    isAuthenticated: boolean;
    isAuthProgress: boolean;
}

export const AuthMethod = {
  AZURE: new AuthAzure(),
  INTERN: new AuthIntern(),
}

export type AuthMethodKey = 'AZURE' | 'INTERN';

export interface AuthProviderProps {
  children: ReactNode;
}