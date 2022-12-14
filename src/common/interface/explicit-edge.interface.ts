import { ID } from "@types";


export interface ExplicitEdge
{
    origin:         ID;
    
    destination:    ID;

    land_distance:  number;

    water_distance: number;
}