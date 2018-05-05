/**
 *  Validate meaning is simply to wrap an input (in fact anything that has the onChange props), 
 *  give the input value to the FormValidator component and that's it.
 * 
 *  It's going to give it via the context provided by FormValidator,
 *  by using the sendInputValue(name, value) method from the context (see: ./FormValidator).
 * 
 *  (More on the explanation of the relationship between that component and the FormValidator here: ./FormValidator.js).
 */