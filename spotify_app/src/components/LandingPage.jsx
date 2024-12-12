import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const API_BASE_URL = 'http://localhost:3000';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #191414;
    color: white;
`;

const Button = styled.button`
    background-color: #1db954;
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    font-weight: bold;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
`;

const Input = styled.input`
    padding: 10px;
    border: none;
    border-radius: 25px;
    width: 300px;
    margin-bottom: 20px;
`;

const SubmitButton = styled.button`
background-color: #1db954;
color: white;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

function LandingPage() {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleConnect = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`);
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
        <Container>
            <h1>Spotify API Frontend</h1>
            <Button onClick={handleConnect}>Connect to Spotify</Button>
            <Input
                type="text"
                placeholder="Enter your Spotify token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </Container>
    );
}

export default LandingPage;
