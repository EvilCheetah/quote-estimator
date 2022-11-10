import { IsString, Length } from "class-validator";
import { IsID } from "@decorator";


export class CreateStateDTO
{
    @IsID()
    country_id:         number;
    
    @IsString()
    state_name:         string;
    
    @IsString()
    @Length(2, 2)
    state_abbreviation: string;
}