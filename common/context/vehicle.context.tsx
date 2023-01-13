import { useState, createContext } from "react";

import { VehicleMake } from "../types/vehicle-make.type";
import { VehicleYear } from "../types/vehicle-year.type";
import { VehicleModel } from "../types/vehicle-model.type";
import { ReactChildNode } from "../types/child-node.type";


export interface IVehicleContext
{
    vehicleYear?:  VehicleYear;
    vehicleMake?:  VehicleMake;
    vehicleModel?: VehicleModel;
    isOperable?:   boolean;

    setVehicleYear?:  (year:  VehicleYear)  => void;
    setVehicleMake?:  (make:  VehicleMake)  => void;
    setVehicleModel?: (model: VehicleModel) => void;
    setIsOperable?:   (isOperable: boolean) => void;
}


export const VehicleContext = createContext<IVehicleContext>({});


export function VehicleProvider({ children }: { children: ReactChildNode } )
{
    const [vehicleYear,  setVehicleYear ] = useState<VehicleYear>();
    const [vehicleMake,  setVehicleMake ] = useState<VehicleMake>();
    const [vehicleModel, setVehicleModel] = useState<VehicleModel>();
    const [isOperable,   setIsOperable  ] = useState<boolean>();

    return (
        <VehicleContext.Provider
            value={{
                vehicleYear,  setVehicleYear,
                vehicleMake,  setVehicleMake,
                vehicleModel, setVehicleModel,
                isOperable,   setIsOperable
            }}
        >
            { children }
        </VehicleContext.Provider>
    );
}