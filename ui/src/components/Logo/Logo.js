import React from 'react';
import styled from 'styled-components';

import logo from '../../images/logo.png';
import { withRouter, Link } from 'react-router-dom';

const StyledImg = styled.img`
    height: ${props => props.height || '1em'};
    width: ${props => props.width || 'auto'};

    font-size: ${props => props.size || '6rem'};
`;

export default withRouter((props) => (
    <Link to="/"><StyledImg {...props} src={logo} /></Link>
));