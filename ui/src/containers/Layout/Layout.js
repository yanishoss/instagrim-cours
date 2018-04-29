import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';

const theme = {
    primary: '#212121',
    secondary: '#E0E0E0',
    ternary: '#FAFAFA',
    contrast: '#757575',
    fontSize: '1.7rem',
    mobile: '320px',
    tablet: '800px',
    desktop: '1025px',
    shadow: {
        soft: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        high: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    },
    animationDuration: 500
}

const StyledDiv = styled.div `
    color: ${props => props.theme.primary};
    font-size: ${props => props.theme.fontSize};
`;

class Layout extends Component {
    render() {
        return (
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <StyledDiv>
                        <Header/>
                    </StyledDiv>
                </ThemeProvider>
            </BrowserRouter>
        );
    }
};

export default Layout;