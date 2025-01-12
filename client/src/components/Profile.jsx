// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div>

        <Login/>
      {user ? (
        <div>
          <h1>Welcome {user.displayName}</h1>
          <a href="http://localhost:5000/logout">Logout</a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;