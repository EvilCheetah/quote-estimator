import { IsString, MaxLength, MinLength } from "class-validator";


export class CreateStateDTO
{
    @IsString()
    state_name:         string;
    
    @IsString()
    @MinLength(2)
    @MaxLength(2)
    state_abbreviation: string;
}