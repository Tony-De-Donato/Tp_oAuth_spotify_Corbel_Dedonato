import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    PreviewContainer,
    Title,
    Info,
    Label,
    Value,
    PopularityBar,
    PopularityFill, AlbumImage, ArtistImage, ArtistInfo, AlbumInfo,
} from '../styles/TrackPreviewStyles';


const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const TRACK_PREVIEW_ROUTE = process.env.TRACK_PREVIEW_ROUTE || '/tracks/preview?track_id=';

const TrackPreview = ({ trackId }) => {
    const [trackDetails, setTrackDetails] = useState(null);
    const token = localStorage.getItem('spotifyToken');

    useEffect(() => {
        const fetchTrackDetails = async () => {
            if (!trackId) return;

            try {
                const response = await axios.get(`${API_BASE_URL}${TRACK_PREVIEW_ROUTE}${trackId}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setTrackDetails(response.data);
                console.log(`fetching ${API_BASE_URL}${TRACK_PREVIEW_ROUTE}${trackId}`);
            } catch (error) {
                console.error('Error fetching track preview:', error);
            }
        };

        fetchTrackDetails();
    }, [trackId]);

    if (!trackDetails) {
        return <PreviewContainer>
            <Title>Track Preview</Title>
        </PreviewContainer>
    }

    const {album_img, album_name, release_date, artist_img, artist_name, popularity } = trackDetails;

    return (
        <PreviewContainer>
            <Title>Track Preview</Title>
            <AlbumInfo>
                <AlbumImage src={album_img || '/placeholder-album.png'} alt={album_name || 'Unknown Album'} />
                <div>
                    <Info>
                        <Label>Album:</Label> <Value>{album_name || 'Unknown'}</Value>
                    </Info>
                    <Info>
                        <Label>Release Date:</Label> <Value>{release_date || 'Unknown'}</Value>
                    </Info>
                </div>
            </AlbumInfo>
            <Info>
                <Label>Artist:</Label>
                <ArtistInfo>
                    <ArtistImage src={artist_img || '/placeholder-artist.png'} alt={artist_name || 'Unknown Artist'} />
                    <Value>{artist_name || 'Unknown'}</Value>
                </ArtistInfo>
            </Info>
            <Info>
                <Label>Popularity:</Label>
                <PopularityBar>
                    <PopularityFill width={popularity || 50} />
                </PopularityBar>
            </Info>
        </PreviewContainer>
    );

};

export default TrackPreview;