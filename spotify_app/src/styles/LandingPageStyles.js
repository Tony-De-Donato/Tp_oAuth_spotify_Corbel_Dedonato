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

export const LandingInput = styled(Input)`
    margin-bottom: 20px;
`;
