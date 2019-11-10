import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
`;

const Spinner = () => {
    return (
        <SpinnerDiv>
            <FontAwesomeIcon icon="spinner" spin size="7x"/>
        </SpinnerDiv>
    )
}

export default Spinner
