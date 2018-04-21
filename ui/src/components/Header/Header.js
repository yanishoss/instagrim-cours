import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Input, InputAdornment, Button, MenuList, MenuItem, Paper, Grow } from 'material-ui';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import Logo from './Logo/Logo';

const StyledHeader = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
background-color: ${props => props.theme.primary};
width: 100%;
border-radius: 30px 30px 0 0;
padding: 10px;

box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);

.material-icons.secondary {
    color: ${props => props.theme.secondary};
}
.material-icons.primary {
    color: ${props => props.theme.primary};
}
`;

const StyledInput = styled(Input)`
input {
    color: ${props => props.theme.secondary};
    font-weight: 300;
}

::before {
    background-color: ${props => props.theme.secondary} !important;
}

:hover::before {
    background-color: #E0E0E0 !important;
}

::after {
    background-color: #03A9F4 !important;
}

@media only screen and (max-width: 600px) {
    display: inline-block; 

    width: calc(100% - 32px);
    margin: 0 16px;
   
    input {
        color: ${props => props.theme.ternary};
        font-weight: 300;
    }

    ::before {
        background-color: ${props => props.theme.primary} !important;
    }

    :hover::before {
        background-color: ${props => props.theme.primary} !important;
    }
}
`;

const StyledGrow = styled(Grow)`
position: absolute;
top: 78px;
right: 10px;

li {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-size: 2.5rem;
    }
}

@media only screen and (max-width: 600px) {
    width: calc(100vw - 20px);
}
`;

class Header extends Component {

    componentWillUpdate(_, nextState){
        if (nextState.menuIsOpen) {
            document.addEventListener('keydown', this.handleEscapePressed);
            document.addEventListener('click', this.handleOutsideClick);
        }
    }

    componentDidUpdate() {
        if (!this.state.menuIsOpen) {
            document.removeEventListener('keydown', this.handleEscapePressed);
            document.removeEventListener('click', this.handleOutsideClick);
        }
    }

    handleOutsideClick = (e) => {
        const domMenu = ReactDOM.findDOMNode(this.refs.menu)
        if (domMenu.contains(e.target)) {
            return;
        }

        this.closeMenu();
    }

    handleEscapePressed = (e) => {
        if (e.key === 'Escape') {
            this.closeMenu();
        }
    }

    state = {
        menuIsOpen: false
    }

    toggleMenu = () => this.setState(prevState => ({
        menuIsOpen: !prevState.menuIsOpen
    }))

    closeMenu = () => this.setState({
        menuIsOpen: false
    })  


    render() {
        return (
            <Fragment>
                <StyledHeader>
                    <Logo color="white" height="3rem" />
                    <MediaQuery minWidth={600}>
                        <StyledInput placeholder="Chercher un utilisateur" startAdornment={ <InputAdornment position="start"><Icon className="secondary">group</Icon></InputAdornment>} />
                    </MediaQuery>
                    <Button onClick={this.toggleMenu}>
                        <Icon className="secondary">{this.state.menuIsOpen ? 'clear' : 'menu'}</Icon>
                    </Button>
                    <StyledGrow in={this.state.menuIsOpen} ref="menu">
                    <Paper>
                    <MenuList>
                        <MenuItem><Icon className="primary">home</Icon></MenuItem>
                        <MenuItem><Icon className="primary">account_circle</Icon></MenuItem>
                        <MenuItem><Icon className="primary">subscriptions</Icon></MenuItem>
                        <MenuItem><Icon className="primary">power_settings_new</Icon></MenuItem>
                        <MediaQuery maxWidth={600}>
                            <StyledInput placeholder="Chercher un utilisateur" startAdornment={ <InputAdornment position="start"><Icon className="primary">group</Icon></InputAdornment>} />
                        </MediaQuery>
                    </MenuList>
                    </Paper>
                </StyledGrow>
                </StyledHeader>
              </Fragment>
        );
    }
}

export default Header;