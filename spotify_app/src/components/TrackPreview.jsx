import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const PreviewContainer = styled.div`
    background-color: #121212;
    color: white;
    padding: 20px;
    border: 1px solid #333;
    border-radius: 10px;
    margin: 20px auto;
`;

const Title = styled.h2`
    color: #1db954;
    margin-bottom: 10px;
`;

const Info = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.span`
    font-weight: bold;
    color: #bfbfbf;
`;

const Value = styled.span`
    color: #ffffff;
`;

const PopularityBar = styled.div`
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;
    height: 20px;
    margin-top: 10px;
    max-width: 200px;
`;

const PopularityFill = styled.div`
    background-color: #1db954;
    height: 100%;
    width: ${(props) => props.width}%;
`;

const TrackPreview = ({ trackId }) => {
    const [trackDetails, setTrackDetails] = useState(null);

    useEffect(() => {
        const fetchTrackDetails = async () => {
            if (!trackId) return;

            try {
                const response = await axios.get(`${API_BASE_URL}/tracks/preview?track_id=${trackId}`);
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