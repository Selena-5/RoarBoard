import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clubs() {
    const [clubs, setClubs] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const token = localStorage.getItem('authToken');


    useEffect(() => {
        // Fetch all clubs
        axios.get('/api/clubs/all')
            .then(response => setClubs(response.data))
            .catch(error => console.error('Error fetching clubs:', error));

        // Fetch user subscriptions
        axios.get('/api/clubs/subscriptions', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error('Error fetching subscriptions:', error));
    }, []);

    const handleToggle = (clubId) => {
        const isSubscribed = subscriptions.includes(clubId);

        // Toggle subscription
        axios.post('/api/clubs/subscribe', {
            clubId,
            isSubscribed: !isSubscribed
        }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                // Update subscriptions state based on toggle
                setSubscriptions(prev =>
                    isSubscribed ? prev.filter(id => id !== clubId) : [...prev, clubId]
                );
            })
            .catch(error => console.error('Error updating subscription:', error));
    };

    return (
        <div>
            <h3>Toggle which clubs you would like to subscribe to:</h3>
            {clubs.map((club) => (
                <div key={club.id} className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`club-${club.id}`}
                        checked={subscriptions.includes(club.id)}
                        onChange={() => handleToggle(club.id)}
                    />
                    <label className="form-check-label" htmlFor={`club-${club.id}`}>{club.name}</label>
                </div>
            ))}
        </div>
    );
}

export default Clubs;
