import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const AlertBox = styled.div`
    padding: 10px;
    background-color: red
    color: #fff;
    width: 100%;
    margin-bottom: 20px;
`;

const Alert = ({errorTxt}) => {
    return (
        <AlertBox>
            {errorTxt}
        </AlertBox>
    )
}

Alert.propTypes = {
    errorTxt: PropTypes.string.isRequired
}

export default Alert
