import { IsLatitude, IsLongitude, IsPostalCode } from "class-validator";
import { IsID } from "@decorator";


export class CreatePostalCodeDTO
{
    @IsID()
    city_id: number;

    @IsPostalCode('any')
    postal_code_value: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}