import { FormEvent } from "react";

import { useMultiStepForm } from "@hook";
import styles from 'styles/ShippingForm.module.css';
import { ForwardButton } from "./ForwardButton";
import { PreviousButton } from "./PreviousButton";
import { VehicleForm } from "./VehicleForm";
import { AddressForm } from "./AddressForm";
import { ContactInformation } from "./ContactInformation";


export default function ShippingForm()
{
    const { 
        currentForm, is_first, is_last, previous, next
    } = useMultiStepForm([
        <AddressForm />,
        <VehicleForm />,
        <ContactInformation />
    ]);

    function onSubmit(event: FormEvent)
    {
        event.preventDefault();
        
    }
    
    return (
        <div>
            <form
                className={ styles['shipping-form'] }
            >
                {currentForm}
                <div className={ styles['form-navigation'] }>
                    <PreviousButton is_first={is_first} previous={previous} />
                    <ForwardButton  is_last={is_last}   next={next} />
                </div>
            </form>
        </div>
    );
}