import React from "react";
import { MenuItem } from "material-ui";
import styled from "styled-components";

const StyledItem = styled(MenuItem)`
    color: ${props => props.theme.primary};
    font-size: 2rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    :not(:last-child) {
        border-bottom: solid .1rem ${props => props.theme.secondary};
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default (props) => (
	<StyledItem {...props}>
		{props.children}
	</StyledItem>
);