// DashboardStyles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
    background-color: #121212;
    color: white;
    min-height: 100vh;
    padding: 20px;
`;

export const SongListAndPreview = styled.div`
    display: flex;
    margin: 20px 0;
`;

export const Title = styled.h1`
    color: #1db954;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    width: 50%;
`;

export const ListItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
`;

export const SongImagePreview = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

export const SongMainInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SongName = styled.span`
    font-weight: bold;
    font-size: 1.2em;
    color: #bfbfbf;
`;

export const SongArtists = styled.span`
    font-size: 1em;
    color: #b3b3b3;
`;

export const TrackPreviewContainer = styled.div`
    margin-left: 20px;
    width: 50%;
`;
