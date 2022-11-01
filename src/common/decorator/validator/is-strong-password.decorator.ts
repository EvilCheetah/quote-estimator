import { STRONG_PASSWORD } from "@common/constant";
import { buildMessage, isString, matches, ValidateBy, ValidationOptions } from "class-validator";


export const IS_STRONG_PASSWORD = 'isStrongPassword';


export function isStrongPassword(value: unknown): boolean
{
    return isString(value) && matches(value, STRONG_PASSWORD);
}


export function IsStrongPassword(validationOptions?: ValidationOptions)
{
    return ValidateBy({
        name: IS_STRONG_PASSWORD,
        validator: {
            validate: (value, args) => isStrongPassword(value),
            defaultMessage: buildMessage(
                (each_prefix) => (
                    each_prefix + '$property must be a strong password'
                ),
                validationOptions
            )
        }
    });
}