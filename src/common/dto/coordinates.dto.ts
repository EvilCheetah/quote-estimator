import { Coordinates } from "@interface/coordinates.interface";
import { Type } from "class-transformer";
import { IsLatitude, IsLongitude } from "class-validator";


export class CoordinatesDTO
    implements Coordinates
{
    @IsLatitude()
    @Type( () => Number )
    latitude:  number;

    @IsLongitude()
    @Type( () => Number )
    longitude: number;
}