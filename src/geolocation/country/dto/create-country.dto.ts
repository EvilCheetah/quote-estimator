import { IsString } from "class-validator";


export class CreateCountryDTO
{
    @IsString()
    country_name: string;
}