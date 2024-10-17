// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const isAuthenticated = useSelector(state => state.auth.isLogin)
    console.log(isAuthenticated)
    if (!isAuthenticated) {
        // Redirect to login if user is not authenticated
        return <Navigate to="/login" />;
      }
  return children;
};

export default ProtectedRoute;
