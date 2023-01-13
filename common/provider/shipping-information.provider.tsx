import { ReactChildNode } from "../types/child-node.type"
import { VehicleProvider } from "../context/vehicle.context"
import { LocationProvider } from "../context/location.context"
import { ContactInformationProvider } from "../context/contact-information.context"


export function ShippingInformationProvider({ children }: { children: ReactChildNode })
{
    return (
        <VehicleProvider>
            <LocationProvider>
                <ContactInformationProvider>
                    { children }
                </ContactInformationProvider>
            </LocationProvider>
        </VehicleProvider>
    );
}