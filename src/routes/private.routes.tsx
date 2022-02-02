import { ReactNode, useEffect } from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({
  children
}: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('private route', isAuthenticated)
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/" />;
}
