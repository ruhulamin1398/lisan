// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import { API_URL } from '../utils/constants';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/profile`, { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        navigate('/admin/login');
      });
  }, [navigate]);

  return (
    <div>

      <Login />
      {user ? (
        <div>
          <h1 className='text-black text-2xl' >Welcome {user.displayName}</h1>
          <a className='text-black text-2xl' href={`${API_URL}/logout`}>Logout</a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;