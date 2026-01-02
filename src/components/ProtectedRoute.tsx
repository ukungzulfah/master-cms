import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { fetchCurrentUser } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const hasCalledFetch = useRef(false);

  // Fetch current user profile on component mount (only once)
  useEffect(() => {
    if (isAuthenticated && !hasCalledFetch.current) {
      hasCalledFetch.current = true;
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
