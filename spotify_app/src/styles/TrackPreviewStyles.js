// TrackPreviewStyles.js
import styled from 'styled-components';

export const PreviewContainer = styled.div`
    background-color: #181818; /* Teinte sombre typique de Spotify */
    color: white;
    padding: 30px;
    border-radius: 15px;
    margin: 20px auto;
    max-width: 800px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Ajout d'une ombre douce */
`;

export const Title = styled.h2`
    color: #1db954; /* Vert signature Spotify */
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

export const Info = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;

export const Label = styled.span`
    font-weight: bold;
    color: #b3b3b3; /* Teinte grise pour le contraste */
    margin-right: 10px;
    flex-shrink: 0;
`;

export const Value = styled.span`
    color: #ffffff;
    font-size: 16px;
`;

export const AlbumInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const AlbumImage = styled.img`
    border-radius: 10px;
    height: 80px;
    width: 80px;
    margin-right: 20px;
`;

export const ArtistInfo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px; /* Décalage par rapport au label */
`;

export const ArtistImage = styled.img`
    border-radius: 50%;
    height: 60px;
    width: 60px;
    margin-right: 15px;
`;

export const PopularityBar = styled.div`
    background-color: #333;
    border-radius: 15px;
    overflow: hidden;
    height: 20px;
    margin-top: 10px;
    max-width: 300px;
    width: 100%; /* Remplissage dynamique */
`;

export const PopularityFill = styled.div`
    background-color: ${(props) =>
    `rgb(${255 - props.width * 2.55}, ${props.width * 2.55}, 0)`}; /* Gradient de rouge à vert */
    height: 100%;
    width: ${(props) => props.width}%;
`;
