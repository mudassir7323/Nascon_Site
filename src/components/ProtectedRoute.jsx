import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/authUtils';

/**
 * A component that protects routes requiring authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {boolean} props.requireAdmin - Whether the route requires admin privileges
 * @returns {React.ReactNode} The protected route
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  // Check if user is authenticated
  const authenticated = isAuthenticated();
  
  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // If route requires admin privileges, check if user is admin
  if (requireAdmin && !isAdmin()) {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated and has required privileges
  return children;
};

export default ProtectedRoute;
