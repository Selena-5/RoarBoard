import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [createdClubs, setCreatedClubs] = useState([]);
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [eventName, setEventName] = useState(''); // New state for event name
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/users/protected', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();
                setUser(data.user);

                // Fetch user's created clubs
                fetchCreatedClubs(data.user.id);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const fetchCreatedClubs = async (userId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`/api/clubs/created/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCreatedClubs(response.data);
        } catch (error) {
            setError('Error fetching created clubs: ' + error.message);
        }
    };

    // const handleCreateClub = async (e) => {
    //     e.preventDefault();
    //     const token = localStorage.getItem('token');
    //
    //     try {
    //         const response = await axios.post(
    //             '/api/clubs/create',
    //             {
    //                 name: clubName,
    //                 description: clubDescription,
    //                 meetingTime,
    //                 eventName // Include event name in the request
    //             },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );
    //
    //         alert('Club created successfully!');
    //         setClubName('');
    //         setClubDescription('');
    //         setMeetingTime('');
    //         setEventName(''); // Reset event name field
    //         fetchCreatedClubs(user.id); // Refresh created clubs
    //     } catch (error) {
    //         alert('Error creating club: ' + error.message);
    //     }
    // };
    const handleCreateClub = async (e) => {
        e.preventDefault();

        // Validation: Check if all fields are filled
        if (!clubName || !clubDescription || !meetingTime || !eventName) {
            alert('Please fill in all fields before creating the club.');
            return; // Stop further execution if validation fails
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                '/api/clubs/create',
                {
                    name: clubName,
                    description: clubDescription,
                    meetingTime,
                    eventName // Include event name in the request
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Club created successfully!');
            setClubName('');
            setClubDescription('');
            setMeetingTime('');
            setEventName(''); // Reset event name field
            fetchCreatedClubs(user.id); // Refresh created clubs
        } catch (error) {
            alert('Error creating club: ' + error.message);
        }
    };

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

                <h3>Create a Club:</h3>
                <form onSubmit={handleCreateClub}>
                    <div className="form-group">
                        <label>Club Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={clubName}
                            onChange={(e) => setClubName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Club Description:</label>
                        <textarea
                            className="form-control"
                            value={clubDescription}
                            onChange={(e) => setClubDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Meeting Time:</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={meetingTime}
                            onChange={(e) => setMeetingTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Event Name:</label> {/* New input for event name */}
                        <input
                            type="text"
                            className="form-control"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Create Club
                    </button>
                </form>

                <h3>Created Clubs:</h3>
                <ul>
                    {createdClubs.map((club) => (
                        <li key={club.id}>{club.name}: {club.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
