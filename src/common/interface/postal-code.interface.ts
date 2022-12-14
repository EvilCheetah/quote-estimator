import { Coordinates } from "./coordinates.interface";

export interface IPostalCode
{
    postal_code_id:     number;

    postal_code_value:  string;

    latitude:           number;

    longitude:          number;
}