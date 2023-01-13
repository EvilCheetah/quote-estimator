import { useState, createContext } from "react";
import { Coordinates } from "../interface/coordinates.interface";
import { ReactChildNode } from "../types/child-node.type";


export interface ILocationContext
{
    fromLocation?:  Coordinates;
    toLocation?:    Coordinates;
    isEnclosed?:    boolean;

    setFromLocation?:  (from:       Coordinates)  => void;
    setToLocation?:    (to:         Coordinates)  => void;
    setIsEnclosed?:    (isEnclosed: boolean)      => void;
}


export const LocationContext = createContext<ILocationContext>({});


export function LocationProvider({ children }: { children: ReactChildNode } )
{
    const [fromLocation,  setFromLocation]  = useState<Coordinates>();
    const [toLocation,    setToLocation  ]  = useState<Coordinates>();
    const [isEnclosed,    setIsEnclosed  ]  = useState<boolean>();

    return (
        <LocationContext.Provider
            value={{
                fromLocation, setFromLocation,
                toLocation,   setToLocation,
                isEnclosed,   setIsEnclosed
            }}
        >
            { children }
        </LocationContext.Provider>
    );
}