import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';


import Header from '../../components/Header/Header';

const theme = {
    primary: '#212121',
    secondary: '#FAFAFA',
    ternary: '#616161'
};

class Layout extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Header />
            </ThemeProvider>
        );
    }
}

export default Layout;