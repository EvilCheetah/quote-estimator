import { buildMessage, matches, ValidateBy, ValidationOptions } from "class-validator";
import { STRONG_PASSWORD } from "@constant";


export const IS_STRONG_PASSWORD = 'isStrongPassword';


export function isStrongPassword(value: unknown): boolean
{
    return (typeof(value) === 'string') && matches(value, STRONG_PASSWORD);
}


export function IsStrongPassword(validationOptions?: ValidationOptions): PropertyDecorator
{
    return ValidateBy(
        {
            name: IS_STRONG_PASSWORD,
            validator: {
                validate: (value, args) => isStrongPassword(value),
                defaultMessage: buildMessage(
                    (each_prefix) => (
                        each_prefix + '$property must be a strong password'
                    ),
                    validationOptions
                )
            },
        },
        validationOptions
    );
}