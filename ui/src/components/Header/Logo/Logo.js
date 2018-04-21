import React from 'react';
import styled from 'styled-components';

import logo from './logo.png';

export default (props) => {
    const StyledImg = styled.img`
        width: auto;
        height: ${props.height || '6rem'};
        filter: ${props.color === 'white' ? 'invert(100%)' : 'none'};
    `;

    return <StyledImg src={logo} alt="Instagrim Logo"/>
};