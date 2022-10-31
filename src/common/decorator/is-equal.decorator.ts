import { isString, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";


export function IsEqualTo(property: string, validation_options?: ValidationOptions)
{
    return function (object: Object, property_name: string)
    {
        registerDecorator({
            name: 'IsEqualTo',
            target: object.constructor,
            propertyName: property_name,
            constraints: [property],
            options: validation_options,
            validator: {
                validate(value: any, args: ValidationArguments): boolean
                {
                    const [relatedPropertyName] = args.constraints;
                    const  related_value        = (args.object as any)[relatedPropertyName];

                    return isString(value)         &&
                           isString(related_value) &&
                           value === related_value;
                }
            }
        })
    }
}