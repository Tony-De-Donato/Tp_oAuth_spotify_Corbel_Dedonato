import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

function Dashboard() {
    const [playlists, setPlaylists] = useState([]);
    const token = localStorage.getItem('spotifyToken');

    useEffect(() => {
        if (token) {
            axios
                .get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => setPlaylists(response.data.items))
                .catch((error) => console.error(error));
        }
    }, [token]);

    return (
        <Container>
            <Title>Your Playlists</Title>
            <List>
                {playlists.map((playlist) => (
                    <ListItem key={playlist.id}>{playlist.name}</ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Dashboard;
