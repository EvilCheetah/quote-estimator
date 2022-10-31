import { buildMessage, isString, matches, ValidateBy, ValidationOptions } from "class-validator";
import { USERNAME_PATTERN } from "@common/constant";


export const IS_USERNAME = 'isUsername';


export function isUsername(value: unknown): boolean
{
    return isString(value) && matches(value, USERNAME_PATTERN)
}


export function IsUsername(validationOptions?: ValidationOptions)
{
    return ValidateBy({
        name: IS_USERNAME,
        validator: {
            validate: (value, args) => isUsername(value),
            defaultMessage: buildMessage(
                (each_prefix) => (
                    each_prefix + '$property must be a proper username'
                ),
                validationOptions
            )
        }
    });
}