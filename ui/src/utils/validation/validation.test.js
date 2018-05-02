import Validator from './validation';

describe("The validator",() => {
    let validator;
    let functionTriggered;
    beforeEach(() => {
       validator = new Validator();
       functionTriggered = "it doesn't work as expected";
    });

    it("should allow us to add validating functions", () => {
        Validator.addValidationType("test", () => {
            functionTriggered = "it works as expected";
        });
        validator.validate("test", null);
        expect(functionTriggered).toEqual("it works as expected");
    });

    it("should allow us to delete validating functions", () => {
        Validator.deleteValidationType("test", () => {
            functionTriggered = "it works as expected";
        });
        expect(functionTriggered).not.toEqual("it works as expected");
    });

    it("should allow us to validate element", () => {
        Validator.addValidationType("isEqualTo1234", element => element === 1234);
        expect(validator.validate("isEqualTo1234", 1234)).toBeTruthy();
        expect(validator.validate("isEqualTo1234", 5415)).not.toBeTruthy();
    });
});