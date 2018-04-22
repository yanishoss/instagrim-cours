import React, { Component } from 'react';
import { Avatar } from 'material-ui';

import styled from 'styled-components';

const StyledArticle = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    #caption {
        width: fit-content;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        margin-left: 50px;
        height: 20px;
        h2 {
            color: ${props => props.theme.primary};
            font-size: 1.3rem;
            font-weight: 400;
        }
        p {
            color: ${props => props.theme.primary};
            font-size: 1.1rem;
            font-weight: 300;
        }
    }
`;

class User extends Component {
    render() {
        return (
            <StyledArticle {...this.props}>
                <Avatar src={this.props.avatar} />
                <div id="caption">
                    <h2>{this.props.username}</h2>
                    <p>{this.props.bio}</p>
                </div>
            </StyledArticle>
        );
    }
}

export default User;