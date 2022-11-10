import { buildMessage, isInt, ValidateBy, ValidationOptions } from "class-validator";
import { isNonNegative } from "./is-non-negative.decorator";


export const IS_ID = 'isId';


export function isID(value: unknown): boolean
{
    return isInt(value) && isNonNegative(value);
}


export function IsID(validationOptions?: ValidationOptions)
{
    return ValidateBy({
        name:         IS_ID,
        validator: {
            validate: (value, args) => isID(value),
            defaultMessage: buildMessage(
                (each_prefix) => (
                    each_prefix + '$property must be valid id-format property'
                ),
                validationOptions
            )
        }
    });
}