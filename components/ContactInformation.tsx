import styles from 'styles/ContactInformation.module.css';
import { FormWrapper } from "./FormWrapper";


export function ContactInformation()
{
    return (
        <FormWrapper title="Contact Information">
            <div className={`${styles['wrapper']}`}>
                <div
                    className={`${styles['contact-field']}`}
                >
                    <label htmlFor='contact-email'>Email</label>
                    <input
                        id='contact-email'
                        className="text-input"
                        type={'text'}
                    />
                </div>
                <div
                    className={`${styles['contact-field']}`}
                >
                    <label htmlFor='contact-phone-number'>Phone Number</label>
                    <input
                        id='contact-phone-number'
                        className="text-input"
                        type={'text'}
                    />
                </div>
            </div>
        </FormWrapper>
    );
}