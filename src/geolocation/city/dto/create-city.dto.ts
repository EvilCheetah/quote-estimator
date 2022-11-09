import { IsInt, IsString, ValidateIf } from "class-validator";
import { IsNonNegative } from "@decorator";


export class CreateCityDTO
{
    @ValidateIf( (o) => (o.state_abbreviation == undefined) )
    @IsInt()
    @IsNonNegative()
    state_id:  number;

    @ValidateIf( (o) => (o.state_id == undefined) )
    @IsString()
    state_abbreviation: string;

    @IsString()
    city_name: string;
}