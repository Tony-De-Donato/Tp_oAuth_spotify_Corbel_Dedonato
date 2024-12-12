import React, { useState } from 'react';
import styled from 'styled-components';
import TrackPreview from './TrackPreview';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const Container = styled.div`
    background-color: #121212;
    color: white;
    min-height: 100vh;
    padding: 20px;
`;

const SongListAndPreview = styled.div`
    display: flex;
    //align-items: center;
    margin: 20px 0;
`;

const Title = styled.h1`
    color: #1db954;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    width: 50%;
`;

const ListItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    border: none;
    border-radius: 25px;
    width: 300px;
    margin: 10px;
    padding: 10px;
`;

const Button = styled.button`
    background-color: #1db954;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin-right: 10px;
`;

const SongImagePreview = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const SongMainInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const SongName = styled.span`
    font-weight: bold;
    font-size: 1.2em;
    color: #bfbfbf;
`;

const SongArtists = styled.span`
    font-size: 1em;
    color: #b3b3b3;
`;

const TrackPreviewContainer = styled.div`
    margin-left: 20px;
    width: 50%;
`;




const Dashboard = () => {
    const [tracks, setTracks] = useState([]);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('spotifyToken');

    const fetchRecentTracks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tracks/recently-played`, {
                headers: {
                    Authorization: token,
                },
            });
            setTracks(response.data.items.map((item) => ({
                id: item.track.id,
                name: item.track.name,
                artists: item.track.artists.map((a) => a.name).join(', '),
                image: item.track.album.images[0]?.url,
            })));
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
            setTracks(response.data.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artists: track.artists.map((a) => a.name).join(', '),
                image: track.album.images[0]?.url,
            })));
        } catch (error) {
            console.error('Error searching tracks:', error);
        }
    };

    return (
        <Container>
            <div>
                <Input
                    type="text"
                    placeholder="Search by track or artist"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
                <Button onClick={fetchRecentTracks}>Afficher les titres récemment écoutés</Button>
            </div>

            <SongListAndPreview >
                <List>
                    {tracks.map((track) => (
                        <ListItem key={track.id}>
                            {track.image && <SongImagePreview src={track.image} alt={track.name} />}
                            <SongMainInfo>
                                <SongName>{track.name}</SongName>
                                <SongArtists>{track.artists}</SongArtists>
                            </SongMainInfo>
                            {/*<Button onClick={() => setSelectedTrackId(track.id)}>Select</Button>*/}
                        </ListItem>
                    ))}
                </List>
                <TrackPreviewContainer>
                    <TrackPreview trackId={selectedTrackId}/>
                </TrackPreviewContainer>
            </SongListAndPreview>
        </Container>
    );
};

export default Dashboard;