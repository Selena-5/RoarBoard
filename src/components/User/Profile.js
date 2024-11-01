// src/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [createdClubs, setCreatedClubs] = useState([]);
  const navigate = useNavigate();
  //const [followedClubs, setFollowedClubs] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/clubs/created', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => setCreatedClubs(response.data))
    .catch(error => console.error('Error fetching created clubs', error));
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
        <button onClick={() => navigate('/create-club')} className="btn btn-primary">Create a Club</button>
            <h3>Created Clubs:</h3>
            <ul>
                {createdClubs.map(club => (
                    <li key={club.id}>{club.name}: {club.description}</li>
                ))}
            </ul>
      </div>
    </div>
  );
};

export default Profile;
