import { buildMessage, isNumber, registerDecorator, ValidateBy, ValidationOptions } from "class-validator";


export function isNonNegative(value): boolean
{
    return isNumber(value) && value >= 0;
}


export function IsNonNegative(validationOptions?: ValidationOptions)
{
    return ValidateBy({
        name:         'isNonNegative',
        validator: {
            validate: (value, args) => isNonNegative(value),
            defaultMessage: buildMessage(
                (each_prefix) => (
                    each_prefix + '$property must be non-negative'
                ),
                validationOptions
            )
        }
    })
}