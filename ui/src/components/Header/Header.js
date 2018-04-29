import React, {Component, Fragment} from 'react';
import styled, {withTheme} from 'styled-components';
import MediaQuery from 'react-responsive';
import {Link} from 'react-router-dom';
import {Input, Icon, IconButton, Grow} from 'material-ui';

import Logo from '../Logo/Logo';
import MenuSet from '../../UI/Menu/MenuSet/MenuSet';
import MenuItem from '../../UI/Menu/MenuItem/MenuItem';
import Transition from 'react-transition-group/Transition';

const StyledHeader = styled.header `
    display: flex;
    position: relative;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    margin: auto;
    background-color: ${props => props.theme.ternary};
    padding: 1.5rem;

    .logo {
        font-size: 4rem;
        @media only screen and (min-width: ${props => props.theme.tablet}){
            font-size: 6rem;
        }   
    }
    
    .searchbar {
        font-size: 2rem;
        color: ${props => props.theme.contrast};
    }

    .searchbar__icon {
        font-size: 3rem;
        align-self: center;
    }

    .nav__icon {
        font-size: 2.5rem;
        color: ${props => props.theme.primary};

        @media only screen and (min-width: ${props => props.theme.tablet}) {
            font-size: 3rem;
        }

        @media only screen and (min-width: ${props => props.theme.desktop}) {
            font-size: 4rem;
        }
    }

    .nav {
        > ul {
            list-style: none;
            display: flex;
             > li:not(:last-child){
                @media only screen and (min-width: ${props => props.theme.desktop}) {
                    margin-right: 2rem;
                }
            }
        }
    }
`;

class Header extends Component {

    state = {
        searchbarIsOpened: false
    }

    toggleSearchbar = () => {
        this.setState(prevState => ({
            searchbarIsOpened: !prevState.searchbarIsOpened
        }));
    }

    render() {
        const view = (
            <Fragment>
                <Logo className="logo"/>
                <MediaQuery minWidth={this.props.theme.desktop}>
                    <Input
                        placeholder="Chercher un utilisateur"
                        startAdornment={< Icon className = "searchbar__icon" > search < /Icon>}
                        className="searchbar"/>
                </MediaQuery>
                <nav className="nav">
                    <ul>
                        <MediaQuery maxWidth={this.props.theme.desktop}>
                            <li>
                                <IconButton onClick={this.toggleSearchbar}>
                                    <Icon className="nav__icon">search</Icon>
                                </IconButton>
                            </li>
                        </MediaQuery>
                        <li>
                            <MenuSet
                                button={< IconButton > <Icon className="nav__icon">menu</Icon> < /IconButton>}>
                                <MenuItem>
                                    <Link to="/signup">
                                        S'inscrire
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/signin">
                                        Se connecter
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/feed">
                                        Fil d'actualité
                                    </Link>
                                </MenuItem>
                            </MenuSet>
                        </li>
                        <li>
                            <Link to="/profile">
                                <IconButton>
                                    <Icon className="nav__icon">account_circle</Icon>
                                </IconButton>
                            </Link>
                        </li>
                        <li>
                            <MenuSet
                                button={< IconButton > <Icon className="nav__icon">settings</Icon> < /IconButton>}>
                                <MenuItem>
                                    <Link to="/logout">
                                        Se déconnecter
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/settings">
                                        Paramètres
                                    </Link>
                                </MenuItem>
                            </MenuSet>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        );

        const Searchbar = styled((props) => (
            <Transition
                in={props.opened}
                timeout={this.props.theme.animationDuration}
                unmountOnExit>
                <Grow in={props.opened} timeout={this.props.theme.animationDuration}>
                    <div {...props}>
                        <Input
                            placeholder="Chercher un utilisateur"
                            startAdornment={< Icon className = "searchbar__icon" > search < /Icon>}
                            className="searchbar"/>
                        <IconButton onClick={this.toggleSearchbar}>
                            <Icon className="nav__icon">clear</Icon>
                        </IconButton>
                    </div>
                </Grow>
            </Transition>
            ))`
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100vw;
            margin: auto;
            padding: 1.5rem;

            .nav__icon {
                font-size: 2.5rem;
                color: ${props => props.theme.primary};
        
                @media only screen and (min-width: ${props => props.theme.tablet}) {
                    font-size: 3rem;
                }
        
                @media only screen and (min-width: ${props => props.theme.desktop}) {
                    font-size: 4rem;
                }
            }

            .searchbar {
                font-size: 2rem;
                color: ${props => props.theme.contrast};
            }
        
            .searchbar__icon {
                font-size: 3rem;
                align-self: center;
            }
        `;

        return (
            <Fragment>
                <StyledHeader>
                    {view}
                </StyledHeader>
                <MediaQuery maxWidth={this.props.theme.desktop}>
                    <Searchbar opened={this.state.searchbarIsOpened}/>
                </MediaQuery>
            </Fragment>

        );
    }
}

export default withTheme(Header);