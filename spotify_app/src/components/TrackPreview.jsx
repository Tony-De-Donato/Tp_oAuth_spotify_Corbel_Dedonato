import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    PreviewContainer,
    Title,
    Info,
    Label,
    Value,
    PopularityBar,
    PopularityFill,
} from '../styles/TrackPreviewStyles';


const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const TRACK_PREVIEW_ROUTE = process.env.TRACK_PREVIEW_ROUTE || '/tracks/preview?track_id=';

const TrackPreview = ({ trackId }) => {
    const [trackDetails, setTrackDetails] = useState(null);

    useEffect(() => {
        const fetchTrackDetails = async () => {
            if (!trackId) return;

            try {
                const response = await axios.get(`${API_BASE_URL}${TRACK_PREVIEW_ROUTE}${trackId}`);
                setTrackDetails(response.data);
            } catch (error) {
                console.error('Error fetching track preview:', error);
            }
        };

        fetchTrackDetails();
    }, [trackId]);

    if (!trackDetails) {
        return <PreviewContainer>
            <Title>Track Preview</Title>
            <Info>
                <Label>Album:</Label> <Value>Unknown</Value>
            </Info>
            <Info>
                <Label>Release Date:</Label> <Value>Unknown</Value>
            </Info>
            <Info>
                <Label>Artist:</Label> <Value>Unknown</Value>
            </Info>
            <Info>
                <Label>Artist Description:</Label> <Value>Unknown</Value>
            </Info>
            <Info>
                <Label>Popularity:</Label>
                <PopularityBar>
                    <PopularityFill width={50} />
                </PopularityBar>
            </Info>
        </PreviewContainer>
    }

    const { album_name, release_date, artist_name, artist_description, popularity } = trackDetails;

    return (
        <PreviewContainer>
            <Title>Track Preview</Title>
            <Info>
                <Label>Album:</Label> <Value>{album_name ? 'Unknown' : album_name}</Value>
            </Info>
            <Info>
                <Label>Release Date:</Label> <Value>{release_date ? 'Unknown' : release_date}</Value>
            </Info>
            <Info>
                <Label>Artist:</Label> <Value>{artist_name ? 'Unknown' : artist_name}</Value>
            </Info>
            <Info>
                <Label>Artist Description:</Label> <Value>{artist_description ? 'Unknown' : artist_description}</Value>
            </Info>
            <Info>
                <Label>Popularity:</Label>
                <PopularityBar>
                    <PopularityFill width={popularity ? popularity : 50} />
                </PopularityBar>
            </Info>
        </PreviewContainer>
    );
};

export default TrackPreview;