import { Coordinates } from "@interface/coordinates.interface";
import { Distances } from "@interface/distances.interface";
import { IPostalCode } from "@interface/postal-code.interface";
import { PostalCode } from "@prisma/client";
import { ID } from "@types";


export class Node
{
    node_id:     ID;
    value:       string;
    coordinates: Coordinates;
    adjacent:    Map<ID, Distances>;

    constructor(postal_code: IPostalCode | PostalCode)
    {
        const { latitude, longitude } = postal_code;

        this.node_id     = postal_code.postal_code_id;
        this.value       = postal_code.postal_code_value;
        this.coordinates = { latitude, longitude };
        this.adjacent    = new Map();
    }
}