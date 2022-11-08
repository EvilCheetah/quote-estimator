import { IsInt, IsString, Length } from "class-validator";


export class CreateStateDTO
{
    @IsInt()
    country_id: number;
    
    @IsString()
    state_name:         string;
    
    @IsString()
    @Length(2, 2)
    state_abbreviation: string;
}