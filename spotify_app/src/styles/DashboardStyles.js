
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
    padding: 15px;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    cursor: pointer; 
    background-color: ${(props) => (props.$isSelected==='false' ? '#282828' : 'transparent')};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #1a1a1a; 
    }
`;

export const SongImagePreview = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 5px;
`;

export const SongName = styled.span`
    font-weight: bold;
    font-size: 1.2em;
    color: ${(props) => (props.$isSelected==='false' ? '#ffffff' : '#bfbfbf')};
`;

export const SongArtists = styled.span`
    font-size: 1em;
    color: ${(props) => (props.$isSelected==='false' ? '#cccccc' : '#b3b3b3')};
`;

export const SongMainInfo = styled.div`
    display: flex;
    flex-direction: column;
`;



export const TrackPreviewContainer = styled.div`
    margin-left: 20px;
    width: 50%;
`;


export const ApiErrorBackground = styled.div`
    background-color: rgba(50, 50, 50, 0.75);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ApiErrorContainer = styled.div`
    background-color: #333;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ApiErrorMessage = styled.p`
    color: #cb4747;
`;