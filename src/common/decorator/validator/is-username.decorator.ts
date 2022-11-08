import { buildMessage, matches, ValidateBy, ValidationOptions } from "class-validator";
import { USERNAME_PATTERN } from "@constant";


export const IS_USERNAME = 'isUsername';


export function isUsername(value: unknown): boolean
{
    return (typeof(value) === 'string') && matches(value, USERNAME_PATTERN);
}


export function IsUsername(validationOptions?: ValidationOptions): PropertyDecorator
{
    return ValidateBy(
        {
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
        }, 
        validationOptions
    );
}