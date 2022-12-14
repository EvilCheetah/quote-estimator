import { IsNumber } from "class-validator";

import { ID } from "@types";
import { IsID } from "@decorator";


export class PostalEdgeDTO
{
    @IsID()
    origin:             ID;

    @IsID()
    destination:        ID;

    @IsNumber()
    land_distance:      number;

    @IsNumber()
    water_distance:     number;
}