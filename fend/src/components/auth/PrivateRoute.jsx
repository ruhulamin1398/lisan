import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if a token exists in localStorage

    if (!token) {
        // If no token, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If token exists, allow access to the protected route
    return children;
};

export default PrivateRoute;
