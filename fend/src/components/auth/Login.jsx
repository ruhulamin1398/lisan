// src/components/Login.js
import React from 'react';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router';

const Login = () => {

  const token = localStorage.getItem('token'); // Check if a token exists in localStorage

  if (token) {
    // If no token, redirect to the login page
    return <Navigate to="/admin" replace />;
  }
  return (
    <div className="grid items-center justify-center w-full h-[500px] md:h-[700px]" >

      <LoginForm />

    </div>
  );
};

export default Login;