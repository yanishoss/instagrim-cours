import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Button} from "material-ui";

import hero from "../../images/hero.jpg";

const StyledMain = styled.main`
    min-width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${hero});
    background-size: cover;
    background-position: bottom;
    padding: 2rem;

    @media only screen and (min-width: ${props => props.theme.tablet}) {
        justify-content: flex-start;
    }

    h1 {
        color: ${props => props.theme.ternary};
        font-weight: 400;
        text-align: center;
        font-size: 3rem;
        margin: 0;

        @media only screen and (min-width: ${props => props.theme.tablet}) {
            font-size: 5rem;
            margin-top: 7rem;
        }
        
        @media only screen and (min-width: ${props => props.theme.desktop}) {
            margin-top: 10rem;
            font-size: 6rem;
        }
    }

    p {
        color: ${props => props.theme.ternary};
        font-weight: 300;
        text-align: center;
        @media only screen and (min-width: ${props => props.theme.desktop}) {
            margin-top: 1rem;
            font-size: 2.5rem;
        }
    }

    div {
        display: flex;
        flex-flow: column;
        margin-top: 4rem;
        margin-bottom: 4rem;
        button {
            font-size: 2rem;
            a {
                text-decoration: none;
                color: inherit;
            }
        }

        button.blue {
            background-color: #2196F3;
        }

        button.blue:hover {
            background-color: #1565C0;
        }

        button.pink {
            background-color: #E91E63;
        }

         button.pink:hover {
            background-color: #880E4F;
        }
        
        button {
            margin-top: 1.5rem;
            @media only screen and (min-width: ${props => props.theme.desktop}) {
                margin-top: 3rem;
            }
        }
    }
`;

export default (props) => (
	<StyledMain>
		<h1>Partager vos pires têtes sur Instagrim!</h1>
		<p>Sur Instagrim, nous ne jugeons vos têtes, postez vos pires grimaces, sans gêne.</p>
		<div>
			<Button variant="raised" color="secondary" size="large" className="blue">
				<Link to="/signin">Se connecter</Link>
			</Button>
            
            
			<Button variant="raised" color="primary" size="large" className="pink">
				<Link to="/signup">S'inscrire</Link>
			</Button>
		</div>
	</StyledMain>
);

