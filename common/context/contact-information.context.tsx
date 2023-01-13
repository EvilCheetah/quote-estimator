import { useState, createContext } from "react";

import { ReactChildNode } from "../types/child-node.type";


export interface IContactInformation
{
    email?:         string;
    phoneNumber?:   string;
    when?:          Date;

    setEmail?:         (email:        string)  => void;
    setPhoneNumber?:   (phone_number: string)  => void;
    setWhen?:          (when:         Date)    => void;
}


export const ContactInformationContext = createContext<IContactInformation>({});


export function ContactInformationProvider({ children }: { children: ReactChildNode } )
{
    const [email,       setEmail]        = useState<string>();
    const [phoneNumber, setPhoneNumber]  = useState<string>();
    const [when,        setWhen]         = useState<Date>();

    return (
        <ContactInformationContext.Provider 
            value={{
                email,       setEmail,
                phoneNumber, setPhoneNumber,
                when,        setWhen
            }}
        >
            { children }
        </ContactInformationContext.Provider>
    );
}