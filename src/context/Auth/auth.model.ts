import { AuthIntern } from './AuthIntern';
import { AuthAzure } from './AuthAzure';
import { ReactNode } from "react";
import { AuthGoogle } from './AuthGoogle';

export interface User {
  username: string;
  email: string;
  photo?: string;
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
    getAuthMethodType: () => string;
}

export const AuthMethod = {
  AZURE: new AuthAzure(),
  INTERN: new AuthIntern(),
  GOOGLE: new AuthGoogle(),
}

export type AuthMethodKey = 'AZURE' | 'INTERN' | 'GOOGLE';

export interface AuthProviderProps {
  children: ReactNode;
}