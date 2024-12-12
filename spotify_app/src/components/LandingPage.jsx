import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #191414;
    color: white;
`;

const Button = styled.a`
  background-color: #1db954;
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  text-decoration: none;
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

    const handleSubmit = () => {
        localStorage.setItem('spotifyToken', token);
        navigate('/dashboard');
    };

    return (
        <Container>
            <h1>Spotify API Frontend</h1>
            <Button href="https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-private">
                Connect to Spotify
            </Button>
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
