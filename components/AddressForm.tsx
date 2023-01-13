import styles from 'styles/AddressForm.module.css';
import { FormWrapper } from "./FormWrapper";


export function AddressForm()
{
    function fromOnChange()
    {

    }

    return (
        <FormWrapper title="Address">
            <div className={ styles['wrapper'] }>
                <div
                    className={ styles['address-field'] }
                >
                    <label htmlFor='from-location'>Transport From</label>
                    <input
                        id='from-location'
                        className="text-input"
                        type={'text'}
                        autoFocus
                    />
                </div>

                <div
                    className={ styles['address-field'] }
                >
                    <label htmlFor='to-location'>Transport To</label>
                    <input
                        id='to-location'
                        className="text-input"
                        type={'text'}
                    />
                </div>
            </div>
        </FormWrapper>
    );
}


/*
<fieldset>
    <legend>Type of Trailer</legend>
    <div
        className="options"
    >
        <div
            className="option"
        >
            <input
                id='closed-trailer'
                type={'radio'}
                name="trailer-type"
                value='closed'
            />
            <label htmlFor='closed-trailer'>Closed</label>
        </div>

        <div
            className="option"
        >
            <input
                id='open-trailer'
                type={'radio'}
                name="trailer-type"
                value='open'
            />
            <label htmlFor='open-trailer'>Open</label>
        </div>
    </div>
</fieldset>
*/