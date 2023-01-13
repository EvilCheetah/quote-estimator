import { ID } from "@types";
import { IsID } from "@decorator";


export class PostalCodeInCityDTO
{
    @IsID()
    city_id:            ID;

    @IsID()
    postal_code_id:     ID;
}