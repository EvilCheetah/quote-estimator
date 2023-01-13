import { useContext } from "react";
import { VehicleContext } from "@context";


export function useVehicleContext()
{
    return useContext(VehicleContext);
}