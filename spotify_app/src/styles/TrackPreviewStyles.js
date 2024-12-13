// TrackPreviewStyles.js
import styled from 'styled-components';

export const PreviewContainer = styled.div`
    background-color: #121212;
    color: white;
    padding: 20px;
    border: 1px solid #333;
    border-radius: 10px;
    margin: 20px auto;
`;

export const Title = styled.h2`
    color: #1db954;
    margin-bottom: 10px;
`;

export const Info = styled.div`
    margin-bottom: 10px;
`;

export const Label = styled.span`
    font-weight: bold;
    color: #bfbfbf;
`;

export const Value = styled.span`
    color: #ffffff;
`;

export const PopularityBar = styled.div`
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;
    height: 20px;
    margin-top: 10px;
    max-width: 200px;
`;

export const PopularityFill = styled.div`
    background-color: #1db954;
    height: 100%;
    width: ${(props) => props.width}%;
`;
