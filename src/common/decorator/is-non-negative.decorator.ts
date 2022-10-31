import { buildMessage, isNumber, ValidateBy, ValidationOptions } from "class-validator";


export const IS_NON_NEGATIVE = 'isNonNegative';


export function isNonNegative(value): boolean
{
    return isNumber(value) && value >= 0;
}


export function IsNonNegative(validationOptions?: ValidationOptions)
{
    return ValidateBy({
        name:         IS_NON_NEGATIVE,
        validator: {
            validate: (value, args) => isNonNegative(value),
            defaultMessage: buildMessage(
                (each_prefix) => (
                    each_prefix + '$property must be non-negative'
                ),
                validationOptions
            )
        }
    });
}