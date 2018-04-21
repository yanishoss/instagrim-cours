import React, { Component, Fragment } from 'react';
import { Icon, Input, InputAdornment, Button, MenuList, MenuItem, Paper, Grow } from 'material-ui';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import Logo from './Logo/Logo';

class Header extends Component {

    componentDidMount(){
        document.addEventListener('keydown', (event) => event.key === 'Escape'? this.closeMenu(event) : null)
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

        const StyledHeader = styled.header`
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #E91E63;
            width: 100%;
            border-radius: 30px 30px 0 0;
            padding: 10px;

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
                background-color: #2196F3 !important;
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
                    background-color: ${props => props.theme.secondary} !important;
                }
    
                :hover::before {
                    background-color: #E0E0E0 !important;
                }
    
                ::after {
                    background-color: #2196F3 !important;
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
                    <StyledGrow in={this.state.menuIsOpen}>
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