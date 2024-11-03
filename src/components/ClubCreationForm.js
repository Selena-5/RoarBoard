import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClubCreationForm( { onClubCreated}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); // Fetch the token from local storage
    
        // Log the token to check if it's being retrieved correctly
        console.log("Retrieved token:", token);
    
        if (!token) {
            alert('No token found. Please log in first.');
            return;
        }
    
        axios.post('/api/clubs/create', { name, description }, { 
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            alert('Form has been submitted successfully');
            onClubCreated(); // Call the callback to update the list
            navigate('/profile');
        })
        .catch(error => {
            console.error('Error creating club:', error);
            alert('Error creating club. Please try again.');
        });
        
    };
    
    
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Club Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea 
                    id="description" 
                    className="form-control" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Create Club</button>
        </form>
    );
}

export default ClubCreationForm;
