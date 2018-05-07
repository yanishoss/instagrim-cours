/**
 *  Validate meaning is simply to wrap an input (in fact anything that has the onChange props), 
 *  give the input value to the FormValidator component and that's it.
 * 
 *  It's going to give it via the context provided by FormValidator,
 *  by using the sendInputValue(name, value) method from the context (see: ./FormValidator).
 * 
 *  (More on the explanation of the relationship between that component and the FormValidator here: ./FormValidator.js).
 */

import React from "react";
import PropTypes from "prop-types";

//  Context through we are going to pass the input value.
import {ValidationContext} from "./ValidationContext";

//  Consumer through we are going to call sendInputValue(name, value).
const {Consumer} = ValidationContext;

/**
 *  It takes as props:
 *      - name: a string giving the name of the field.
 * 
 *  It just appends an onChange method which call sendInputValue(name, value) with the value of the input.
 */
const Validate = ({name, children}) => (
	<Consumer>
		{sendInputValue => React.cloneElement(children, {
			onChange: e => {
				//	If the input already has an onChange method, we call it.
				if (children.onChange){
					children.onChange(e);
				}
				sendInputValue(name, e.target.value);
			}
		})}
	</Consumer>
);

//  Sets statically the types of the props.
Validate.propTypes = {
	//  Name must be a string, it is completely required.
	name: PropTypes.string.isRequired,
	//  Children must be a React node element, namely all element implementing onChange props.
	//  Obviously, it is required.
	children: PropTypes.node.isRequired,
};

export default Validate;