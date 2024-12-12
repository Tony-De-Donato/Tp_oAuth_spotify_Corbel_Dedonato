
// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const Container = styled.div`
    background-color: #121212;
    color: white;
    min-height: 100vh;
    padding: 20px;
`;

const Title = styled.h1`
    color: #1db954;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #333;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 25px;
  width: 300px;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #1db954;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

function Dashboard() {
    const [recentTracks, setRecentTracks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('spotifyToken');

    useEffect(() => {
        if (token) {
            fetchRecentTracks();
        }
    }, [token]);

    const fetchRecentTracks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tracks/recently-played`, {
                headers: {
                    Authorization: token,
                },
            });
            setRecentTracks(response.data.items);
        } catch (error) {
            console.error('Error fetching recent tracks:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            alert('Please enter a search query.');
            return;
        }
        try {
            const response = await axios.get(`${API_BASE_URL}/tracks/search?query=${encodeURIComponent(searchQuery)}`, {
                headers: {
                    Authorization: token,
                },
            });
            setSearchResults(response.data.tracks.items);
        } catch (error) {
            console.error('Error searching tracks:', error);
        }
    };

    return (
        <Container>
            <Title>Your Recently Played Tracks</Title>
            <List>
                {recentTracks.map((item) => (
                    <ListItem key={item.track.id}>
                        {item.track.name} - {item.track.artists.map((a) => a.name).join(', ')}
                    </ListItem>
                ))}
            </List>

            <Title>Search Tracks</Title>
            <div>
                <Input
                    type="text"
                    placeholder="Search by track or artist"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <List>
                {searchResults.map((track) => (
                    <ListItem key={track.id}>
                        {track.name} - {track.artists.map((a) => a.name).join(', ')}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Dashboard;
