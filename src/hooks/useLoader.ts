import { LoadingContext } from './../context/LoadingContext';
import { useContext } from 'react';

export const useLoader = () => useContext(LoadingContext);
