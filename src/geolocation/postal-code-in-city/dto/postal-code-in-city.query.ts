import { ID } from "@types";
import { IsID } from "@decorator";
import { IsOptional } from "class-validator";


export class PostalCodeInCityQuery
{
    @IsID()
    @IsOptional()
    city_id:        ID;

    @IsID()
    @IsOptional()
    postal_code_id: ID;
}