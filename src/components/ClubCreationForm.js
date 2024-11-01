import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClubCreationForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [leadName, setLeadName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/clubs/create', { name, description, leadName })
            .then(response => {
                console.log(response.data);
                // Optionally, you can navigate back to the profile or another page
                navigate('/clubs');
            })
            .catch(error => {
                console.error('There was an error creating the club!', error);
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
            <div className="form-group">
                <label htmlFor="leadName">Your Name (Club Lead):</label>
                <input 
                    type="text" 
                    id="leadName" 
                    className="form-control" 
                    value={leadName} 
                    onChange={(e) => setLeadName(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Create Club</button>
        </form>
    );
}

export default ClubCreationForm;