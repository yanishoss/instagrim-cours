import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, InputAdornment, Button, MenuList, MenuItem, Paper, Grow, Avatar } from 'material-ui';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import Logo from './Logo/Logo';
import Search from './Search/Search';

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

const StyledSearch = styled(Search)`
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
    a {
        color: ${props => props.theme.primary}
        text-decoration: none;
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: 500;
    };
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
                <StyledHeader>
                    <Logo color="white" height="3rem" />
                    <MediaQuery minWidth={600}>
                        <StyledSearch placeholder="Chercher un utilisateur" startAdornment={ <InputAdornment position="start"><Icon className="secondary">group</Icon></InputAdornment>} />
                    </MediaQuery>
                    <Button onClick={this.toggleMenu}>
                        <Icon className="secondary">{this.state.menuIsOpen ? 'clear' : 'menu'}</Icon>
                    </Button>
                    <StyledGrow in={this.state.menuIsOpen} ref="menu">
                        <Paper>
                            <MenuList>
                                <MenuItem><Link to="/"><Icon className="primary">home</Icon></Link></MenuItem>
                                <MenuItem><Link to="/profile">{this.props.avatar ? <Avatar src={this.props.avatar}/>  : <Icon className="primary">account_circle</Icon>}</Link></MenuItem>
                                <MenuItem><Link to="/feed"><Icon className="primary">subscriptions</Icon></Link></MenuItem>
                                {this.props.isAuthenticated ? <MenuItem><Link to="/logout"><Icon className="primary">power_settings_new</Icon></Link></MenuItem> : null}
                                {!this.props.isAuthenticated ? <MenuItem><Link to="/signin">Se connecter</Link></MenuItem> : null}
                                {!this.props.isAuthenticated ? <MenuItem><Link to="/signup">S&acute;inscrire</Link></MenuItem> : null}
                                <MediaQuery maxWidth={600}>
                                    <StyledSearch placeholder="Chercher un utilisateur" startAdornment={ <InputAdornment position="start"><Icon className="primary">group</Icon></InputAdornment>} />
                                </MediaQuery>
                            </MenuList>
                        </Paper>
                    </StyledGrow>
                </StyledHeader>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    avatar: state.user.avatar
});

export default connect(mapStateToProps)(Header);