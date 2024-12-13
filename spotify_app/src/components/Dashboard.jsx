import React, { useState } from 'react';
import TrackPreview from './TrackPreview';
import axios from 'axios';
import {
    TrackPreviewContainer,
    SongListAndPreview,
    List,
    ListItem,
    SongImagePreview,
    SongMainInfo,
    SongName,
    SongArtists,
    DashboardContainer
} from '../styles/DashboardStyles';
import {Button, Input} from '../styles/GlobalStyles';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

const RECENTLY_PLAYED_TRACKS_ROUTE = process.env.RECENTLY_PLAYED_TRACKS_ROUTE || '/tracks/recently-played';
const SEARCH_TRACKS_ROUTE = process.env.SEARCH_TRACKS_ROUTE || '/tracks/search?query=';

const Dashboard = () => {
    const [tracks, setTracks] = useState([]);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('spotifyToken');

    const fetchRecentTracks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${RECENTLY_PLAYED_TRACKS_ROUTE}`, {
                headers: {
                    Authorization: token,
                },
            });

            const uniqueTracks = response.data.items.filter(
                (item, index, self) => index === self.findIndex((t) => t.track.id === item.track.id)
            );

            setTracks([])
            setTracks(uniqueTracks.map((item) => ({
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
            const response = await axios.get(`${API_BASE_URL}${SEARCH_TRACKS_ROUTE}${encodeURIComponent(searchQuery)}`, {
                headers: {
                    Authorization: token,
                },
            });
            setTracks([]);
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
        <DashboardContainer>
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
        </DashboardContainer>
    );
};

export default Dashboard;