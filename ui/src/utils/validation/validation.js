import lodash from 'lodash';

// State of the class
let state = {
    mapTypesToHandlers: new Map(),
    mapParametersToHandlers: new Map()
};

const applyParameters = (element, parameters, mapParametersToHandlers) => {
    let parametersResults = [];
    for (let parameter in parameters) {
        const parameterHandlers = mapParametersToHandlers.get(parameter)
            ? mapParametersToHandlers.get(parameter)
            : [];
        const parameterResults = parameterHandlers.map(func => func(element, parameters[parameter]));
        parametersResults = [
            ...parametersResults,
            ...parameterResults
        ];
    }
    return parametersResults.every(valid => valid === true);
}

const applyTypes = (element, types, mapTypesToHandlers) => {
    const typesArray = types
        .trim()
        .split(",");
    let typesResults = [];
    for (let type of typesArray) {
        const typeHandlers = mapTypesToHandlers.get(type)
            ? mapTypesToHandlers.get(type)
            : [];
        const typeResults = typeHandlers.map(func => func(element));
        typesResults = [
            ...typesResults,
            ...typeResults
        ];
    }
    return typesResults.every(valid => valid === true);
}

// Is a singleton class
class Validator {
    constructor() {}

    // The type handler is a function that takes the element to validate and return
    // a boolean

    static addType(name, typeHandler) {
        // It checks whether the name provided already exists, if so returns the array
        // of validating functions associated else just create an empty array
        const existingTypeHandlers = state
            .mapTypesToHandlers
            .get(name)
            ? state
                .mapTypesToHandlers
                .get(name)
            : [];

        state
            .mapTypesToHandlers
            .set(name, [
                ...existingTypeHandlers,
                typeHandler
            ]);

        return;
    }

    static deleteType(name, typeHandler = null) {
        // Warning, you should never check the arguments of a function but, in my case,
        // my function got 2 duties. The first is delete the provided function of the
        // type. The second is delete the type completely if not function is provided.
        // If provided a function to delete, it delete that, in the else case, just
        // deletes the type completely
        if (typeHandler) {
            // Get the existing functions and get rid of the function to delete
            const newTypeHandlers = state
                .mapTypesToHandlers
                .get(name)
                .filter(func => func.toString() !== typeHandler.toString());

            state
                .mapTypesToHandlers
                .set(name, newTypeHandlers);

            return;
        }

        // Get rid of the type completely
        state
            .mapTypesToHandlers
            .delete(name);

        return;
    }

    // Parameter Handler is a function: (element, valueOfParameter) => {  do
    // something...  return true or false; }
    static addParameter(name, parameterHandler) {
        const existingParameterHandlers = state
            .mapParametersToHandlers
            .get(name)
            ? state
                .mapParametersToHandlers
                .get(name)
            : [];

        state
            .mapParametersToHandlers
            .set(name, [
                ...existingParameterHandlers,
                parameterHandler
            ]);
        return;
    }

    static deleteParameter(name, parameterHandler = null) {
        if (parameterHandler) {
            // Get the existing functions and get rid of the function to delete
            const newParameterHandlers = state
                .mapParametersToHandlers
                .get(name)
                .filter(func => func.toString() !== parameterHandler.toString());

            state
                .mapParametersToHandlers
                .set(name, newParameterHandlers);

            return;
        }

        // Get rid of the type completely
        state
            .mapParametersToHandlers
            .delete(name);

        return;
    }

    // Checks if provided element is valid according to the type's validating
    // functions
    validate(element, validationConfig) {
        const typesAreValid = validationConfig.types
            ? applyTypes(element, validationConfig.types, state.mapTypesToHandlers)
            : true;
        const parametersAreValid = applyParameters(element, validationConfig, state.mapParametersToHandlers);
        return typesAreValid && parametersAreValid;
    }
};

Validator.addParameter("min", (element, valueOfParameter) => {
    switch (typeof element) {
        case "string":
            return element.length >= valueOfParameter;
        case "number":
            return element >= valueOfParameter;
        case "object":
            if (Array.isArray(element)) {
                return element.length >= valueOfParameter;
            }
            return lodash.size(element) >= valueOfParameter;
        default:
            return true;
    }
});

Validator.addParameter("max", (element, valueOfParameter) => {
    switch (typeof element) {
        case "string":
            return element.length <= valueOfParameter;
        case "number":
            return element <= valueOfParameter;
        case "object":
            if (Array.isArray(element)) {
                return element.length <= valueOfParameter;
            }
            return lodash.size(element) <= valueOfParameter;
        default:
            return true;
    }
});

Validator.addParameter("equal", (element, valueOfParameter) => element == valueOfParameter);
Validator.addParameter("deepEqual", (element, valueOfParameter) => lodash.isEqual(element, valueOfParameter));

Validator.addType("email", element => {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(element);
});

Validator.addType("phone-fr", element => {
    const phoneRegExp = /^((\+)33|0)[1-9](\d{2}){4}$/g;
    return phoneRegExp.test(element);
});

export default Validator;