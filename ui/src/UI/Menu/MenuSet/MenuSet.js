import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Menu from '../Menu';

const StyledDiv = styled.div `
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-end;
    .menu {
        margin-top: 6rem;
    }
`;

class MenuSet extends Component {

    state = {
        opened: false
    }

    toggleMenu = () => {
        return this.setState(prevState => ({
            opened: !prevState.opened
        }));
    }

    handleMenuClose = () => {
        return this.setState({opened: false});  
    }

    UNSAFE_componentWillUpdate = (_, nextState) => {
        if (nextState.opened) {
            document.addEventListener('mousedown', this.handleOutsideClick);
            document.addEventListener('keydown', this.handleEscapeClick);
        } else {
            document.removeEventListener('mousedown', this.handleOutsideClick);
            document.removeEventListener('keydown', this.handleEscapeClick);
        }
    }

    handleOutsideClick = (e) => {
        const menuDOM = ReactDOM.findDOMNode(this.refs.menu);
        if (menuDOM.contains(e.target)) {
            return;
        }
        return this.handleMenuClose();
    }

    handleEscapeClick = (e) => {
        if (!(e.key === 'Escape')) {
            return;
        }
        return this.handleMenuClose();
    }

    render() {
        return (
            <StyledDiv ref="menu">
                {React.cloneElement(this.props.button, {onClick: this.toggleMenu})}
                <Menu
                    className="menu"
                    opened={this.state.opened}
                    {...this.props}>
                    {this.props.children}
                </Menu>
            </StyledDiv>
        );
    }
}

export default MenuSet;