import { IsLatitude, IsLongitude, IsString } from "class-validator";
import { IsID } from "@decorator";


export class CreateCityDTO
{
    @IsID()
    state_id:  number;

    @IsString()
    city_name: string;

    @IsLatitude()
    latitude:  number;

    @IsLongitude()
    longitude: number;
}