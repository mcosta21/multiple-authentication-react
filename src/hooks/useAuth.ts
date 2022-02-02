import { AuthContext } from '../context/Auth/AuthContext';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
