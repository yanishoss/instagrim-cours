const jwt = require("jsonwebtoken");
const privateKey = require("../config").SECRET_KEY;
const { userModel } = require("../models");

module.exports = async (tokenAsString) => {
    try {
        const decodedToken = jwt.verify(tokenAsString, privateKey);
        const isValid = (decodedToken.exp - Date.now()) >= 0;
        const user = await userModel.findById(decodedToken.sub);
        if (!user) {
            isValid = false;
        }
        if (!isValid) {
            throw new Error("The token provided is invalid or had expired.");
        }
        return {
            ...decodedToken,
            user,
            isValid
        }
    } catch (err) {
        return {
            isValid: false 
        }
    }
};