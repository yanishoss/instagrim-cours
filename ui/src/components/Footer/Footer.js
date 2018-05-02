import React from 'react'
import styled from 'styled-components';

import Logo from '../Logo/Logo';

const StyledFooter = styled.footer`
    display: flex;
    min-width: 100vw;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.ternary};
    padding: 1.5rem;

    *:not(:last-child) {
        margin-top: 1rem;
    }
`;

export default () => (
    <StyledFooter>
        <Logo size="4rem"/>
        <p>Copyright © 2018 by Instagrim, Inc.</p>
    </StyledFooter>
);
