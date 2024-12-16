import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LandingButton,
    LandingContainer,
    LandingInput,
    SelectTypeButton,
    SelectTypeButtonContainer
} from '../styles/LandingPageStyles';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const AUTH_CODE_URL_ROUTE = process.env.AUTH_CODE_URL_ROUTE || '/auth/authcode';
const AUTH_IMPLICIT_URL_ROUTE = process.env.AUTH_IMPLICIT_URL_ROUTE || '/auth/implicit';

function LandingPage() {
    const [token, setToken] = useState('');
    const [selectedGrant, setSelectedGrant] = useState(null); // Ajout de l'état pour le bouton sélectionné
    const navigate = useNavigate();
    const [authUrl, setAuthUrl] = useState('');

    const handleConnect = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${authUrl}`);
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

    const handleGrantSelection = (grantType) => {
        setSelectedGrant(grantType); // Met à jour l'état du bouton sélectionné
        setAuthUrl(grantType === 'authCode' ? AUTH_CODE_URL_ROUTE : AUTH_IMPLICIT_URL_ROUTE);
    };

    return (
        <LandingContainer>
            <h1>Spotify API Frontend</h1>
            <h2>Choose your authentication method:</h2>
            <SelectTypeButtonContainer>
                <SelectTypeButton
                    selected={selectedGrant === 'authCode'} // Condition pour déterminer si ce bouton est sélectionné
                    onClick={() => handleGrantSelection('authCode')}
                >
                    Authorization Code Grant
                </SelectTypeButton>
                <SelectTypeButton
                    selected={selectedGrant === 'implicit'} // Condition pour déterminer si ce bouton est sélectionné
                    onClick={() => handleGrantSelection('implicit')}
                >
                    Implicit Grant
                </SelectTypeButton>
            </SelectTypeButtonContainer>
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
