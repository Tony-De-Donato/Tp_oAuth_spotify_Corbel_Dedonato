import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { LandingButton, LandingContainer, LandingInput } from '../styles/LandingPageStyles';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const AUTH_URL_ROUTE = process.env.AUTH_URL_ROUTE || '/auth/login';


function LandingPage() {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleConnect = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${AUTH_URL_ROUTE}`);
            const data = await response.json();
            if (data.url) {
                window.open(data.url, '_blank');
            } else {
                console.error('Login URL not found');
            }
        } catch (error) {
            console.error('Error fetching login URL:', error);
        }
    };

    const handleSubmit = () => {
        if (!token) {
            alert('Please enter your Spotify token!');
            return;
        }
        localStorage.setItem('spotifyToken', token);
        alert('Token saved successfully!');
        navigate('/dashboard');
    };

    return (
        <LandingContainer>
            <h1>Spotify API Frontend</h1>
            <LandingButton onClick={handleConnect}>Connect to Spotify</LandingButton>
            <LandingInput
                type="text"
                placeholder="Enter your Spotify token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <LandingButton onClick={handleSubmit}>Submit</LandingButton>
        </LandingContainer>
    );
}

export default LandingPage;
