import { IsNonNegative } from "@decorator";
import { IsInt, IsString, Length, ValidateIf } from "class-validator";


export class CreateStateDTO
{
    @ValidateIf( (o) => (o.country_abbreviation == undefined) )
    @IsInt()
    @IsNonNegative()
    country_id: number;

    @ValidateIf( (o) => (o.country_id == undefined) )
    @IsString()
    country_abbreviation: string;
    
    @IsString()
    state_name:         string;
    
    @IsString()
    @Length(2, 2)
    state_abbreviation: string;
}