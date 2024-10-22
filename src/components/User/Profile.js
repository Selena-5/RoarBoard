// src/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/protected', {
          method: 'GET',
          credentials: 'include', // Include credentials to send cookies
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
