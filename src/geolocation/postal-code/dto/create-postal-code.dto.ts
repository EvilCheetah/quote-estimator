import { IsLatitude, IsLongitude, IsPostalCode } from "class-validator";
import { IsNonNegative } from "@decorator";


export class CreatePostalCodeDTO
{
    @IsNonNegative()
    city_id: number;

    @IsPostalCode()
    postal_code_value: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}