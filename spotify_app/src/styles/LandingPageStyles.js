// LandingPageStyles.js
import styled from 'styled-components';
import { Button, Input } from './GlobalStyles';

export const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #191414;
    color: white;
`;

export const LandingButton = styled(Button)`
    padding: 15px 30px;
    border-radius: 50px;
    font-weight: bold;
`;

export const SelectTypeButton = styled(Button)`
    padding: 15px 30px;
    border-radius: 50px;
    font-weight: bold;
    background-color: ${({ selected }) => (selected ? '#137b39' : '#072911')};
    color: ${({ selected }) => (selected ? 'white' : '#b3b3b3')}; 
    
    
    &:hover {
        transition: all 1000ms ease;
        background-color: #137b39;
        color: white;
        
    }
`;

export const SelectTypeButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;


export const LandingInput = styled(Input)`
    margin-bottom: 20px;
`;
