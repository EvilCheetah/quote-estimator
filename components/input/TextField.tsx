import { TextFieldProps } from "../../common/interface/props/text-field-props.interface";


export function TextField({ label }: TextFieldProps)
{
    return (
        <div
                className="address"
        >
            <label htmlFor='from-location'>{ label }</label>
            <input
                id='from-location'
                className="text-input"
                type={'text'}
                autoFocus
            />
        </div>
    );
}