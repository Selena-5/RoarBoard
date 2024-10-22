import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/protected', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        });

        if (response.ok) {
          setIsAuthenticated(true); // If authorized, allow access
        } else {
          navigate('/login'); // If not authenticated, redirect to login
        }
      } catch (error) {
        navigate('/login'); // Redirect to login on error
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated ? children : null; // Only render if authenticated
};

export default ProtectedRoute;
