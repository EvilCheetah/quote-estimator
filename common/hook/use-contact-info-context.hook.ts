import { useContext } from "react";
import { ContactInformationContext } from "@context";


export function useContactInformationContext()
{
    return useContext(ContactInformationContext);
}