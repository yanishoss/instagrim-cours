// State of the class
let state = {
    typeToValidatingFunctions: new Map()
};

// Is a singleton class
export default class Validator {
    constructor() {}

    // The validating function is a function that takes the element to validate and
    // return a boolean

    static addValidationType(name, validatingFunction) {
        // It checks whether the name provided already exists, if so returns the array
        // of validating functions associated else just create an empty array
        const existingValidatingFunctions = state
            .typeToValidatingFunctions
            .get(name)
            ? state
                .typeToValidatingFunctions
                .get(name)
            : [];

        state
            .typeToValidatingFunctions
            .set(name, [
                ...existingValidatingFunctions,
                validatingFunction
            ]);

        return;
    }

    static deleteValidationType(name, validatingFunction = null) {
        // Warning, you should never check the arguments of a function but, in my case,
        // my function got 2 duties. The first is delete the provided function of the
        // type. The second is delete the type completely if not function is provided.
        // If provided a function to delete, it delete that, in the else case, just
        // deletes the type completely
        if (validatingFunction) {
            // Get the existing functions and get rid of the function to delete
            const newValidatingFunctions = state
                .typeToValidatingFunctions
                .get(name)
                .filter(func => func === validatingFunction);

            state
                .typeToValidatingFunctions
                .set(name, newValidatingFunctions);

            return;
        }

        // Get rid of the type completely
        state
            .typeToValidatingFunctions
            .delete(name);

        return;
    }

    // Checks if provided element is valid according to the type's validating
    // functions
    validate(name, element) {
        const validatingFunctions = state
            .typeToValidatingFunctions
            .get(name);

        if (!validatingFunctions) {
            return true;
        }

        const isValid = validatingFunctions.every(func => func(element));

        return isValid;
    }
};