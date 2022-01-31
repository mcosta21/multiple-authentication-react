import { AuthContext } from '../context/AuthAzureContext';
import { useContext } from 'react';
import { AuthMethodContext } from '../context/AuthMethodContext';

export const useAuth = () => useContext(AuthContext);
export const useAuthMethod = () => useContext(AuthMethodContext);
