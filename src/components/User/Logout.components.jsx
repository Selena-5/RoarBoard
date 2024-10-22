// src/components/User/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('http://localhost:3001/users/logout', {
          method: 'POST',
          credentials: 'include', // Ensure cookies are included
        });
        navigate('/login'); // Redirect to login after logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>; // loading message
};

export default Logout;
