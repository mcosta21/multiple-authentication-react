import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { AuthMethodContext } from '../context/AuthMethodContext';

export const useAuth = () => useContext(AuthContext);
export const useAuthMethod = () => useContext(AuthMethodContext);
