import React, {Component} from "react"; 
import {Grow, Paper, MenuList} from "material-ui";
import styled, {withTheme} from "styled-components";
import Transition from "react-transition-group/Transition";

const StyledGrow = styled(Grow)`
    display: block;
    width: 100vw;
    position: absolute !important;
    left: 0;import { ReactDOM } from 'react-dom';

    @media only screen and (min-width: ${props => props.theme.desktop}){
        width: auto;
        left: inherit;
    }
`;

class Menu extends Component {
	render() {
		return (
			<Transition in={this.props.opened} timeout={this.props.theme.animationDuration} ref="menu" unmountOnExit>
				<StyledGrow in={this.props.opened} className={this.props.className} timeout={this.props.theme.animationDuration}>
					<Paper>
						<MenuList>
							{this.props.children}
						</MenuList>
					</Paper>
				</StyledGrow>
			</Transition>
		);
	}
}

export default withTheme(Menu);